using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace program
{
    internal class BancoDeDados
    {
        private static readonly string strConexao = "server=localhost;database=padaria;user=appBoaMassa;pwd=um4S3nhaMuit0Forte!;";

        //Conecta-se Ao banco
        private static MySqlConnection Conectar()
        {
            var conexao = new MySqlConnection(strConexao);
            conexao.Open();
            return conexao;
        }

        //Método para INSERT
        public static (long linhasAfetadas, long ultimoID) Inserir(string querySql, Action<MySqlCommand> parametros = null)
        {
            using (MySqlConnection conexaoBanco = BancoDeDados.Conectar())
            {
                using (MySqlCommand comando = new MySqlCommand(querySql, conexaoBanco))
                {
                    parametros?.Invoke(comando);

                    long linhas = comando.ExecuteNonQuery();
                    long id = comando.LastInsertedId;

                    return (linhas, id);
                }
            }
        }

        //Método para SELECT
        public static MySqlDataReader Consultar(string querySql, Action<MySqlCommand> parametros = null)
        {
            MySqlConnection conexaoBanco = BancoDeDados.Conectar();

            MySqlCommand consulta = new MySqlCommand(querySql, conexaoBanco);
            parametros?.Invoke(consulta);

            return consulta.ExecuteReader(CommandBehavior.CloseConnection);
        }

        //Método para UPDATE, ALTER, DELETE
        public static long Executar(string querySql, Action<MySqlCommand> parametros = null)
        {
            using (MySqlConnection conexaoBanco = BancoDeDados.Conectar())
            {
                using (MySqlCommand comando = new MySqlCommand(querySql, conexaoBanco))
                {
                    parametros?.Invoke(comando);

                    return comando.ExecuteNonQuery();
                }
            }
        }
    }
}
