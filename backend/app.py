from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import traceback

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = 'uploads/documentos'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Criar pasta se não existir
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configuração do banco de dados
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  
    'database': 'Sistema_zetryx',
    'charset': 'utf8mb4'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file(file, matricula):
    if not file or not allowed_file(file.filename):
        return None
    
    filename = secure_filename(file.filename)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    unique_filename = f"{matricula}_{timestamp}_{filename}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
    file.save(filepath)
    return f"/uploads/documentos/{unique_filename}"

@app.route('/api/inscricao', methods=['POST'])
def criar_inscricao():
    conexao = None
    cursor = None
    
    try:
        dados = request.form.to_dict()
        
        for campo in ['possuiConta', 'recebeAuxilio', 'bolsaFamilia', 'beneficioBpc']:
            if campo in dados:
                dados[campo] = 1 if dados[campo] == 'sim' else 0
        
        # Processar membros da família (JSON string)
        membros = []
        if 'membros' in dados:
            import json
            membros = json.loads(dados['membros'])
        
        # Processar documentos
        arquivos = request.files.getlist('documentos')
        
        # Conectar ao banco
        conexao = get_db_connection()
        if not conexao:
            return jsonify({'error': 'Erro ao conectar ao banco de dados'}), 500
        
        cursor = conexao.cursor()
        
        # Inserir Participante
        sql_participante = """
            INSERT INTO Participante (
                matricula, nome_completo, cpf, data_nascimento, 
                email, telefone, estado_civil, modalidade_auxilio
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_participante, (
            dados.get('matricula'),
            dados.get('nome'),
            dados.get('cpf'),
            dados.get('dataNascimento'),
            dados.get('email'),
            dados.get('telefone'),
            dados.get('estadoCivil'),
            dados.get('auxilio', 'ambos')
        ))
        id_participante = cursor.lastrowid
        
        # Inserir Endereço
        sql_endereco = """
            INSERT INTO Endereco_participante (
                id_participante, rua, numero, bairro, cidade, 
                cep, complemento, ponto_referencia
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_endereco, (
            id_participante,
            dados.get('rua'),
            dados.get('numero'),
            dados.get('bairro'),
            dados.get('cidade'),
            dados.get('cep', '').replace('-', ''),
            dados.get('complemento'),
            dados.get('pontoReferencia')
        ))
        
        # Inserir Perfil de Declaração
        sql_declaracao = """
            INSERT INTO perfil_declaracao (
                id_participante, lei_cotas, possui_deficiencia, 
                origem_quilombola, estrangeiro
            ) VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql_declaracao, (
            id_participante,
            1 if dados.get('leiCotas') == 'sim' else 0,
            1 if dados.get('pcd') == 'sim' else 0,
            1 if dados.get('origemTradicional') == 'sim' else 0,
            1 if dados.get('estrangeiroRefugiado') == 'sim' else 0
        ))
        
        # Inserir Perfil Requisitos (Critérios)
        sql_perfil = """
            INSERT INTO Perfil_requisitos (id_participante, escolaridade, renda_per_capita)
            VALUES (%s, %s, %s)
        """
        cursor.execute(sql_perfil, (
            id_participante,
            dados.get('tipoEscola'),
            dados.get('rendaPerCapita')
        ))
        
        # Inserir Dados Socioeconômicos
        sql_socio = """
            INSERT INTO Dados_Socioeconomicos (
                id_participante, tipo_moradia, mora_em, 
                renda_bruta_total_familiar, quantidade_pessoas_casa
            ) VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql_socio, (
            id_participante,
            dados.get('tipoMoradia'),
            dados.get('zonaResidencia'),
            dados.get('rendaBruta', 0),
            dados.get('qtdPessoas', 1)
        ))
        id_socio = cursor.lastrowid
        
        # Inserir Benefícios
        sql_beneficios = """
            INSERT INTO Participante_Beneficios (
                id_socio, recebe_auxilio_bolsa, beneficiario_bolsa_familia_cadunico, recebe_bpc
            ) VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql_beneficios, (
            id_socio,
            1 if dados.get('recebeAuxilio') == 'sim' else 0,
            1 if dados.get('bolsaFamilia') == 'sim' else 0,
            1 if dados.get('beneficioBpc') == 'sim' else 0
        ))
        
        # Inserir Banco (verificar se banco existe)
        codigo_bacen = dados.get('nomeBanco', '001')
        cursor.execute("SELECT id_bancoOf FROM Banco_Oficiais WHERE codigo_bacen = %s", (codigo_bacen,))
        banco_result = cursor.fetchone()
        
        if not banco_result:
            # Inserir banco se não existir
            cursor.execute(
                "INSERT INTO Banco_Oficiais (codigo_bacen, nome_instituicao) VALUES (%s, %s)",
                (codigo_bacen, f"Banco {codigo_bacen}")
            )
            id_banco_of = cursor.lastrowid
        else:
            id_banco_of = banco_result[0]
        
        sql_banco = """
            INSERT INTO Dados_Bancarios (
                id_participante, id_bancoOf, possui_conta, 
                tipo_conta, variacao_poupanca, numero_conta, agencia
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_banco, (
            id_participante,
            id_banco_of,
            dados.get('possuiConta', 0),
            dados.get('tipoConta'),
            dados.get('variacaoPoupanca'),
            dados.get('numeroConta'),
            dados.get('numeroAgencia')
        ))
        
        # Inserir Curso
        sql_curso = """
            INSERT INTO Curso (id_participante, nome_curso, tipo_curso)
            VALUES (%s, %s, %s)
        """
        nome_curso = dados.get('cursoSuperior', '')
        if nome_curso == 'outro':
            nome_curso = dados.get('cursoSuperiorOutro', 'Curso não especificado')
        
        cursor.execute(sql_curso, (id_participante, nome_curso, 'Superior'))
        id_curso = cursor.lastrowid
        
        # Inserir Matrícula
        sql_matricula = """
            INSERT INTO Matricula (id_participante, id_curso, data_matricula, qtd_disciplinas_matriculadas)
            VALUES (%s, %s, CURDATE(), %s)
        """
        qtd_disciplinas = 1
        if dados.get('qtdDisciplinas') == 'duas':
            qtd_disciplinas = 2
        elif dados.get('qtdDisciplinas') == 'mais_duas':
            qtd_disciplinas = 3
        
        cursor.execute(sql_matricula, (id_participante, id_curso, qtd_disciplinas))
        
        # Inserir Membros da Família
        for membro in membros:
            sql_membro = """
                INSERT INTO Membros_Familia (
                    id_participante, nome, parentesco, data_nascimento
                ) VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql_membro, (
                id_participante,
                membro.get('nome'),
                membro.get('parentesco'),
                membro.get('dataNascimento') or None
            ))
            id_membro = cursor.lastrowid
            
            # Renda do membro
            sql_renda = "INSERT INTO Membro_Renda (id_membro, renda_mensal) VALUES (%s, %s)"
            cursor.execute(sql_renda, (id_membro, membro.get('renda', 0)))
            
            # Saúde do membro
            sql_saude = """
                INSERT INTO Membro_Saude (id_membro, possui_deficiencia, possui_doenca_cronica)
                VALUES (%s, %s, %s)
            """
            cursor.execute(sql_saude, (
                id_membro,
                1 if membro.get('possuiDeficiencia') else 0,
                1 if membro.get('possuiDoencaCronica') else 0
            ))
            
            # Profissão do membro
            if membro.get('profissao') or membro.get('vinculo'):
                sql_profissional = """
                    INSERT INTO Membro_Profissional (id_membro, profissao, vinculo_empregaticio)
                    VALUES (%s, %s, %s)
                """
                cursor.execute(sql_profissional, (
                    id_membro,
                    membro.get('profissao'),
                    membro.get('vinculo')
                ))
        
        # Inserir Documentos
        for arquivo in arquivos:
            if arquivo and allowed_file(arquivo.filename):
                url_arquivo = save_file(arquivo, dados.get('matricula'))
                if url_arquivo:
                    sql_pdf = """
                        INSERT INTO Pdf_Participante (id_participante, url_imagemDocumento, titulo_do_pdf)
                        VALUES (%s, %s, %s)
                    """
                    cursor.execute(sql_pdf, (id_participante, url_arquivo, arquivo.filename))
        
        # Commit da transação
        conexao.commit()
        
        return jsonify({
            'success': True,
            'message': 'Inscrição realizada com sucesso!',
            'id_participante': id_participante,
            'matricula': dados.get('matricula')
        }), 201
        
    except Error as e:
        if conexao:
            conexao.rollback()
        print(f"Erro MySQL: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': f'Erro no banco de dados: {str(e)}'
        }), 500
        
    except Exception as e:
        if conexao:
            conexao.rollback()
        print(f"Erro geral: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': f'Erro interno: {str(e)}'
        }), 500
        
    finally:
        if cursor:
            cursor.close()
        if conexao:
            conexao.close()

@app.route('/api/inscricao/<matricula>', methods=['GET'])
def consultar_inscricao(matricula):
    conexao = get_db_connection()
    if not conexao:
        return jsonify({'error': 'Erro ao conectar ao banco'}), 500
    
    cursor = conexao.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT p.*, e.* 
            FROM Participante p
            LEFT JOIN Endereco_participante e ON p.id_participante = e.id_participante
            WHERE p.matricula = %s
        """, (matricula,))
        
        resultado = cursor.fetchone()
        
        if resultado:
            return jsonify({'success': True, 'data': resultado})
        else:
            return jsonify({'success': False, 'message': 'Inscrição não encontrada'}), 404
            
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conexao.close()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    print("🚀 Iniciando API do Sistema Zetryx...")
    print(f"📁 Uploads salvos em: {UPLOAD_FOLDER}")
    print("📍 API disponível em: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)