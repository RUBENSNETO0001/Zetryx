
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import uuid
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permite o React (localhost:3000) falar com esta API

DB_CONFIG = {
    "host":     "localhost",
    "user":     "root",         
    "password": "",             
    "database": "Sistema_zetryx",
    "charset":  "utf8mb4",
}

# PASTA PARA SALVAR OS DOCUMENTOS ENVIADOS
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"pdf", "jpg", "jpeg", "png"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db():
    return mysql.connector.connect(**DB_CONFIG)


@app.route("/api/inscricao", methods=["POST"])
def inscricao():
    conn = None
    cursor = None
    try:
        conn   = get_db()
        cursor = conn.cursor()

        # 1. PARTICIPANTE
        modalidade = request.form.get("auxilio", "permanencia")  # permanencia | transporte | ambos

        cursor.execute("""
            INSERT INTO Participante
              (matricula, nome_completo, cpf, data_nascimento,
               email, telefone, estado_civil, modalidade_auxilio)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            request.form.get("matricula"),
            request.form.get("nome"),
            request.form.get("cpf", "").replace(".", "").replace("-", ""),
            request.form.get("dataNascimento"),
            request.form.get("email"),
            request.form.get("telefone"),
            request.form.get("estadoCivil"),
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
            request.form.get("rua"),
            request.form.get("numero"),
            request.form.get("bairro"),
            request.form.get("cidade"),
            request.form.get("pontoReferencia"),
            request.form.get("cep", "").replace("-", ""),
            request.form.get("complemento"),
        ))

        # 3. PERFIL / DECLARAÇÃO (lei de cotas, PCD, quilombola…)
        cursor.execute("""
            INSERT INTO perfil_declaracao
              (id_participante, lei_cotas, possui_deficiencia,
               origem_quilombola, estrangeiro)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_participante,
            1 if request.form.get("leiCotas") == "sim" else 0,
            1 if request.form.get("pcd")      == "sim" else 0,
            1 if request.form.get("origemTradicional") == "sim" else 0,
            1 if request.form.get("estrangeiroRefugiado") == "sim" else 0,
        ))

        # 4. PERFIL REQUISITOS (escolaridade / renda per capita)
        renda_bruta  = float(request.form.get("rendaBruta") or 0)
        qtd_pessoas  = int(request.form.get("qtdPessoas")   or 1)
        renda_pc     = round(renda_bruta / qtd_pessoas, 2) if qtd_pessoas else 0

        cursor.execute("""
            INSERT INTO Perfil_requisitos (id_participante, escolaridade, renda_per_capita)
            VALUES (%s, %s, %s)
        """, (
            id_participante,
            request.form.get("tipoEscola"),
            renda_pc,
        ))

        # 5. DADOS SOCIOECONÔMICOS 
        cursor.execute("""
            INSERT INTO Dados_Socioeconomicos
              (id_participante, tipo_moradia, mora_em,
               renda_bruta_total_familiar, quantidade_pessoas_casa)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_participante,
            request.form.get("tipoMoradia"),
            request.form.get("zonaResidencia"),
            renda_bruta,
            qtd_pessoas,
        ))
        id_socio = cursor.lastrowid

        # 6. BENEFÍCIOS
        # tipoBolsa pode vir como múltiplos valores separados por vírgula
        tipos_bolsa = request.form.get("tipoBolsa", "")
        recebe = 1 if request.form.get("recebeAuxilio") == "sim" else 0

        cursor.execute("""
            INSERT INTO Participante_Beneficios
              (id_socio, recebe_auxilio_bolsa, nome_beneficio,
               beneficiario_bolsa_familia_cadunico, recebe_bpc)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            id_socio,
            recebe,
            tipos_bolsa if recebe else None,
            1 if request.form.get("bolsaFamilia") == "sim" else 0,
            1 if request.form.get("beneficioBpc") == "sim" else 0,
        ))

        # 7. DADOS BANCÁRIOS
        banco_codigo = request.form.get("nomeBanco")  # "001", "104", etc. ou "outro"
        id_banco_of  = _resolver_banco(cursor, banco_codigo, request.form.get("bancoOutro"))

        cursor.execute("""
            INSERT INTO Dados_Bancarios
              (id_participante, id_bancoOf, possui_conta,
               tipo_conta, variacao_poupanca, numero_conta, agencia)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            id_participante,
            id_banco_of,
            1 if request.form.get("possuiConta") == "sim" else 0,
            request.form.get("tipoConta"),
            request.form.get("variacaoPoupanca"),
            request.form.get("numeroConta"),
            request.form.get("numeroAgencia"),
        ))

        # 8. CURSO
        nome_curso = request.form.get("cursoSuperior", "")
        if nome_curso == "outro":
            nome_curso = request.form.get("cursoSuperiorOutro", "Outro")

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
        import json
        membros_raw = request.form.get("membros", "[]")
        membros     = json.loads(membros_raw)

        for m in membros:
            cursor.execute("""
                INSERT INTO Membros_Familia
                  (id_participante, nome, parentesco, data_nascimento)
                VALUES (%s, %s, %s, %s)
            """, (
                id_participante,
                m.get("nome"),
                m.get("parentesco"),
                m.get("dataNascimento") or None,
            ))
            id_membro = cursor.lastrowid

            # Profissional
            cursor.execute("""
                INSERT INTO Membro_Profissional (id_membro, profissao, vinculo_empregaticio)
                VALUES (%s, %s, %s)
            """, (id_membro, m.get("profissao"), m.get("vinculo")))

            # Renda
            cursor.execute("""
                INSERT INTO Membro_Renda (id_membro, renda_mensal)
                VALUES (%s, %s)
            """, (id_membro, float(m.get("renda") or 0)))

            # Saúde
            cursor.execute("""
                INSERT INTO Membro_Saude (id_membro, possui_deficiencia, possui_doenca_cronica)
                VALUES (%s, %s, %s)
            """, (
                id_membro,
                1 if m.get("possuiDeficiencia") else 0,
                1 if m.get("possuiDoencaCronica") else 0,
            ))

        # 11. DOCUMENTOS (PDF / imagens) 
        arquivos = request.files.getlist("documentos")
        for arquivo in arquivos:
            if arquivo and allowed_file(arquivo.filename):
                ext      = arquivo.filename.rsplit(".", 1)[1].lower()
                filename = f"{id_participante}_{uuid.uuid4().hex}.{ext}"
                filepath = os.path.join(UPLOAD_FOLDER, secure_filename(filename))
                arquivo.save(filepath)

                cursor.execute("""
                    INSERT INTO Pdf_Participante
                      (id_participante, url_imagemDocumento, titulo_do_pdf)
                    VALUES (%s, %s, %s)
                """, (id_participante, filepath, arquivo.filename))

        # COMMIT
        conn.commit()
        return jsonify({"success": True, "id_participante": id_participante}), 201

    except Exception as e:
        if conn:
            conn.rollback()
        print(f"[ERRO] {e}")
        return jsonify({"success": False, "error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# ROTA DE SAÚDE (para testar se o servidor está no ar)
@app.route("/api/health", methods=["GET"])
def health():
    try:
        conn = get_db()
        conn.close()
        return jsonify({"status": "ok", "db": "conectado"}), 200
    except Exception as e:
        return jsonify({"status": "erro", "db": str(e)}), 500


# ─── HELPERS INTERNOS 
def _resolver_banco(cursor, codigo, nome_outro=None):
    
    if not codigo or codigo == "outro":
        nome = nome_outro or "Outro banco"
        cursor.execute("SELECT id_bancoOf FROM Banco_Oficiais WHERE nome_instituicao = %s", (nome,))
        row = cursor.fetchone()
        if row:
            return row[0]
        cursor.execute(
            "INSERT INTO Banco_Oficiais (codigo_bacen, nome_instituicao) VALUES (%s, %s)",
            ("000", nome),
        )
        return cursor.lastrowid

    cursor.execute("SELECT id_bancoOf FROM Banco_Oficiais WHERE codigo_bacen = %s", (codigo,))
    row = cursor.fetchone()
    return row[0] if row else 1 


def _mapear_qtd_disciplinas(valor):
    """Converte o texto do radio button para número inteiro."""
    mapa = {
        "uma":       1,
        "duas":      2,
        "mais_duas": 3,
        "tcc":       0,
        "estagio":   0,
    }
    return mapa.get(valor, 1)

# começar o servidor Flask
if __name__ == "__main__":
    app.run(debug=True, port=5000)