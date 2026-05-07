import mysql.connector 
from mysql.connector import Error

def conectar():
    try:
        conexao = mysql.connector.connect(
            host='localhost',
            database='Sistema_zetryx',
            user='root',
            password=''
        )
        if conexao.is_connected():
            print("Conexão ao MySQL bem-sucedida")
            return conexao
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

def fechar_conexao(conexao, cursor=None):
    if cursor:
        cursor.close()
    if conexao and conexao.is_connected():
        conexao.close()
        print("Conexão encerrada")

if __name__ == "__main__":
    conn = conectar()
    if conn:
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT DATABASE();")
            linha = cursor.fetchone()
            print(f"Você está conectado ao banco: {linha['DATABASE()']}")
        finally:
            fechar_conexao(conn, cursor)