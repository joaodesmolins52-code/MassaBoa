//Apenas um teste
using program;

string[] nomes = ["João", "Nicolas", "Bernardo"];

for (int i = 0; i < 3; i++)
{
   var inserção = BancoDeDados.Inserir("insert into tabelaTeste(nome) values (@nome)", parametro =>
   {
       parametro.Parameters.AddWithValue("@nome", nomes[i]);
   });

    Console.WriteLine($"Funcionou!\nLinhas Afetadas: {inserção.linhasAfetadas}");
}