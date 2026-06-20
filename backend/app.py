import json
import logging
import os
import uuid

import magic
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.utils import secure_filename
import mysql.connector

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
CORS(app, origins=ALLOWED_ORIGINS)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[],
    storage_uri="memory://",
)

DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "user":     os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME", "Sistema_zetryx"),
    "charset":  "utf8mb4",
}

UPLOAD_FOLDER = os.getenv(
    "UPLOAD_FOLDER",
    os.path.join(os.path.expanduser("~"), "uploads"),
)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MAX_UPLOAD_SIZE_MB = int(os.getenv("MAX_UPLOAD_MB", "5"))
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_SIZE_MB * 1024 * 1024  

ALLOWED_MIME_TYPES = {
    "pdf":  "application/pdf",
    "jpg":  "image/jpeg",
    "jpeg": "image/jpeg",
    "png":  "image/png",
}


def allowed_file(filename: str) -> bool:
    """Verifica extensão do arquivo."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_MIME_TYPES


def allowed_content(file_stream, extension: str) -> bool:
    header = file_stream.read(2048)
    file_stream.seek(0)  
    detected_mime = magic.from_buffer(header, mime=True)
    expected_mime = ALLOWED_MIME_TYPES.get(extension)
    return detected_mime == expected_mime

def get_db():
    return mysql.connector.connect(**DB_CONFIG)


def _str(value, max_len: int = 255) -> str | None:
    if value is None:
        return None
    return str(value).strip()[:max_len]


def _int_safe(value, default: int = 0) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _float_safe(value, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _bool_form(value: str | None) -> int:
    return 1 if value == "sim" else 0


def _resolver_banco(cursor, codigo, nome_outro=None):
    if not codigo or codigo == "outro":
        nome = _str(nome_outro) or "Outro banco"
        cursor.execute(
            "SELECT id_bancoOf FROM Banco_Oficiais WHERE nome_instituicao = %s", (nome,)
        )
        row = cursor.fetchone()
        if row:
            return row[0]
        cursor.execute(
            "INSERT INTO Banco_Oficiais (codigo_bacen, nome_instituicao) VALUES (%s, %s)",
            ("000", nome),
        )
        return cursor.lastrowid

    cursor.execute(
        "SELECT id_bancoOf FROM Banco_Oficiais WHERE codigo_bacen = %s", (codigo,)
    )
    row = cursor.fetchone()
    return row[0] if row else 1


def _mapear_qtd_disciplinas(valor: str) -> int:
    mapa = {"uma": 1, "duas": 2, "mais_duas": 3, "tcc": 0, "estagio": 0}
    return mapa.get(valor, 1)

@app.route("/api/inscricao", methods=["POST"])
@limiter.limit("10 per minute")
def inscricao():
    conn = None
    cursor = None
    try:
        # ── Validação mínima dos campos obrigatórios 
        required_fields = ["matricula", "nome", "cpf", "email"]
        missing = [f for f in required_fields if not request.form.get(f)]
        if missing:
            return jsonify({"success": False, "error": f"Campos obrigatórios ausentes: {missing}"}), 400

        conn   = get_db()
        cursor = conn.cursor()

        # 1. PARTICIPANTE
        modalidade = _str(request.form.get("auxilio", "permanencia"))

        cursor.execute("""
            INSERT INTO Participante
              (matricula, nome_completo, cpf, data_nascimento,
               email, telefone, estado_civil, modalidade_auxilio)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            _str(request.form.get("matricula"), 20),
            _str(request.form.get("nome"), 150),
            _str(request.form.get("cpf", "").replace(".", "").replace("-", ""), 11),
            request.form.get("dataNascimento") or None,
            _str(request.form.get("email"), 150),
            _str(request.form.get("telefone"), 20),
            _str(request.form.get("estadoCivil"), 30),
            modalidade,
        ))
        id_participante = cursor.lastrowid

        # 2. ENDEREÇO
        cursor.execute("""
            INSERT INTO Endereco_participante
              (id_participante, rua, numero, bairro, cidade,
               ponto_referencia, cep, complemento)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            id_participante,
            _str(request.form.get("rua")),
            _str(request.form.get("numero"), 10),
            _str(request.form.get("bairro")),
            _str(request.form.get("cidade")),
            _str(request.form.get("pontoReferencia")),
            _str(request.form.get("cep", "").replace("-", ""), 8),
            _str(request.form.get("complemento")),
        ))

        # 3. PERFIL / DECLARAÇÃO
        cursor.execute("""
            INSERT INTO perfil_declaracao
              (id_participante, lei_cotas, possui_deficiencia,
               origem_quilombola, estrangeiro)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_participante,
            _bool_form(request.form.get("leiCotas")),
            _bool_form(request.form.get("pcd")),
            _bool_form(request.form.get("origemTradicional")),
            _bool_form(request.form.get("estrangeiroRefugiado")),
        ))

        # 4. PERFIL REQUISITOS
        renda_bruta = _float_safe(request.form.get("rendaBruta"))
        qtd_pessoas = max(1, _int_safe(request.form.get("qtdPessoas"), 1))  # mínimo 1
        renda_pc    = round(renda_bruta / qtd_pessoas, 2)

        cursor.execute("""
            INSERT INTO Perfil_requisitos (id_participante, escolaridade, renda_per_capita)
            VALUES (%s, %s, %s)
        """, (id_participante, _str(request.form.get("tipoEscola"), 50), renda_pc))

        # 5. DADOS SOCIOECONÔMICOS
        cursor.execute("""
            INSERT INTO Dados_Socioeconomicos
              (id_participante, tipo_moradia, mora_em,
               renda_bruta_total_familiar, quantidade_pessoas_casa)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_participante,
            _str(request.form.get("tipoMoradia"), 50),
            _str(request.form.get("zonaResidencia"), 50),
            renda_bruta,
            qtd_pessoas,
        ))
        id_socio = cursor.lastrowid

        # 6. BENEFÍCIOS
        tipos_bolsa = _str(request.form.get("tipoBolsa", ""))
        recebe = _bool_form(request.form.get("recebeAuxilio"))

        cursor.execute("""
            INSERT INTO Participante_Beneficios
              (id_socio, recebe_auxilio_bolsa, nome_beneficio,
               beneficiario_bolsa_familia_cadunico, recebe_bpc)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_socio,
            recebe,
            tipos_bolsa if recebe else None,
            _bool_form(request.form.get("bolsaFamilia")),
            _bool_form(request.form.get("beneficioBpc")),
        ))

        # 7. DADOS BANCÁRIOS
        banco_codigo = request.form.get("nomeBanco")
        id_banco_of  = _resolver_banco(cursor, banco_codigo, request.form.get("bancoOutro"))

        cursor.execute("""
            INSERT INTO Dados_Bancarios
              (id_participante, id_bancoOf, possui_conta,
               tipo_conta, variacao_poupanca, numero_conta, agencia)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            id_participante,
            id_banco_of,
            _bool_form(request.form.get("possuiConta")),
            _str(request.form.get("tipoConta"), 30),
            _str(request.form.get("variacaoPoupanca"), 10),
            _str(request.form.get("numeroConta"), 20),
            _str(request.form.get("numeroAgencia"), 10),
        ))

        # 8. CURSO
        nome_curso = _str(request.form.get("cursoSuperior", ""))
        if nome_curso == "outro":
            nome_curso = _str(request.form.get("cursoSuperiorOutro", "Outro"))

        cursor.execute("""
            INSERT INTO Curso (id_participante, nome_curso, tipo_curso)
            VALUES (%s, %s, %s)
        """, (id_participante, nome_curso, "Superior"))
        id_curso = cursor.lastrowid

        # 9. MATRÍCULA
        qtd_disciplinas = _mapear_qtd_disciplinas(request.form.get("qtdDisciplinas", ""))

        cursor.execute("""
            INSERT INTO Matricula
              (id_participante, id_curso, data_matricula, qtd_disciplinas_matriculadas)
            VALUES (%s, %s, CURDATE(), %s)
        """, (id_participante, id_curso, qtd_disciplinas))

        # 10. MEMBROS DA FAMÍLIA
        membros_raw = request.form.get("membros", "[]")
        try:
            membros = json.loads(membros_raw)
            if not isinstance(membros, list):
                raise ValueError("membros deve ser uma lista")
        except (json.JSONDecodeError, ValueError):
            return jsonify({"success": False, "error": "Campo 'membros' inválido"}), 400

        for m in membros:
            cursor.execute("""
                INSERT INTO Membros_Familia
                  (id_participante, nome, parentesco, data_nascimento)
                VALUES (%s, %s, %s, %s)
            """, (
                id_participante,
                _str(m.get("nome"), 150),
                _str(m.get("parentesco"), 50),
                m.get("dataNascimento") or None,
            ))
            id_membro = cursor.lastrowid

            cursor.execute("""
                INSERT INTO Membro_Profissional (id_membro, profissao, vinculo_empregaticio)
                VALUES (%s, %s, %s)
            """, (id_membro, _str(m.get("profissao")), _str(m.get("vinculo"), 50)))

            cursor.execute("""
                INSERT INTO Membro_Renda (id_membro, renda_mensal)
                VALUES (%s, %s)
            """, (id_membro, _float_safe(m.get("renda"))))

            cursor.execute("""
                INSERT INTO Membro_Saude (id_membro, possui_deficiencia, possui_doenca_cronica)
                VALUES (%s, %s, %s)
            """, (
                id_membro,
                1 if m.get("possuiDeficiencia") else 0,
                1 if m.get("possuiDoencaCronica") else 0,
            ))

        # 11. DOCUMENTOS — dupla verificação: extensão + conteúdo real
        arquivos = request.files.getlist("documentos")
        for arquivo in arquivos:
            if not arquivo or not arquivo.filename:
                continue
            ext = arquivo.filename.rsplit(".", 1)[-1].lower() if "." in arquivo.filename else ""
            if not allowed_file(arquivo.filename):
                logger.warning("Upload recusado (extensão): %s", arquivo.filename)
                continue
            if not allowed_content(arquivo.stream, ext):
                logger.warning("Upload recusado (conteúdo): %s", arquivo.filename)
                continue

            filename = f"{id_participante}_{uuid.uuid4().hex}.{ext}"
            filepath = os.path.join(UPLOAD_FOLDER, secure_filename(filename))
            arquivo.save(filepath)

            cursor.execute("""
                INSERT INTO Pdf_Participante
                  (id_participante, url_imagemDocumento, titulo_do_pdf)
                VALUES (%s, %s, %s)
            """, (id_participante, filepath, secure_filename(arquivo.filename)))

        conn.commit()
        return jsonify({"success": True, "id_participante": id_participante}), 201

    except mysql.connector.IntegrityError as e:
        if conn:
            conn.rollback()
        if e.errno == 1062:
            return jsonify({"success": False, "error": "Matrícula já cadastrada."}), 409
        logger.error("Erro de integridade: %s", e, exc_info=True)
        return jsonify({"success": False, "error": "Erro de integridade nos dados."}), 400

    except Exception as e:
        if conn:
            conn.rollback()
        logger.error("Erro na inscrição: %s", e, exc_info=True)
        return jsonify({"success": False, "error": "Erro interno. Tente novamente."}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@app.route("/api/health", methods=["GET"])
def health():
    try:
        conn = get_db()
        conn.close()
        return jsonify({"status": "ok", "db": "conectado"}), 200
    except Exception as e:
        logger.error("Health check falhou: %s", e)
        return jsonify({"status": "erro", "db": "falha na conexão"}), 500


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode, port=int(os.getenv("PORT", 5000)))