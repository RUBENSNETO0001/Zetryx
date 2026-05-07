import mysql.connector 
from mysql.connector import Error

import Conexao 
from connector_bd.conexaobd import conectar, fechar_conexao

def dados_usuario():
    conexao = conectar()
    if conexao:
        try:
            cursor = conexao.cursor(dictionary=True)
            cursor.execute("SELECT * FROM usuario;")
            resultados = cursor.fetchall()
            return resultados
        except Error as e:
            print(f"Erro ao buscar dados do usuário: {e}")
            return []
        finally:
            fechar_conexao(conexao, cursor)