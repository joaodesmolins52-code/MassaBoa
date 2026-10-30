const loginArea = document.getElementById("loginArea");
const criarConta = document.getElementById("CriarConta");
const BotaoCriar = document.getElementById("Criar");

BotaoCriar.addEventListener("click", function() {
    loginArea.classList.add("escondido")
    criarConta.classList.add("ativa")
});

const voltarLogin = document.getElementById("VoltarLogin");

voltarLogin.addEventListener("click", function() {
    criarConta.classList.remove("ativa");
    loginArea.classList.remove("escondido")
});

function Entrar(){
    window.location.href = 'Produtos.html';
};