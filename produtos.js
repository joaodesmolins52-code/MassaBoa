// GUIA PRA EU N ME PERDER DEPOIS:
// document.getElementById()	Encontra um elemento pelo ID.
// document.querySelector()	Encontra o primeiro elemento que corresponde a um seletor CSS.
// document.querySelectorAll()	Encontra todos os elementos que correspondem a um seletor CSS.
// document.createElement()	Cria um elemento HTML pelo JavaScript.
// elemento.innerHTML	Acessa ou modifica o conteúdo HTML de um elemento.
// elemento.textContent	Acessa ou modifica o conteúdo textual de um elemento.
// elemento.appendChild()	Insere um elemento daentro de outro.
// elemento.closest()	Procura um elemento correspondente a um seletor, subindo pela estrutura HTML.
// elemento.getAttribute()	Obtém o valor de um atributo HTML.
const carrinho = document.getElementById("carrinho");
const botaoCarrinho = document.getElementById("CarrinhoLink");
const fecharCarrinho = document.getElementById("FecharCarrinho");

const produtosCarrinho = document.getElementById("ProdutosCarrinho");
const totalCarrinho = document.getElementById("TotalCarrinho");

let itensCarrinho = [];


botaoCarrinho.addEventListener("click", function () {
    carrinho.classList.add("Ativado");
});

fecharCarrinho.addEventListener("click", function () {
    carrinho.classList.remove("Ativado");
});


function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function atualizarCarrinho() {

    produtosCarrinho.innerHTML = "";

    if (itensCarrinho.length === 0) {

        produtosCarrinho.innerHTML =
            '<p id="CarrinhoVazio">Seu carrinho ainda está vazio.</p>';

        totalCarrinho.textContent = "R$ 0,00";

        return;
    }


    itensCarrinho.forEach(function (produto, indice) {

        const elementoProduto = document.createElement("div");

        elementoProduto.classList.add("ItemCarrinho");

        elementoProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="InfoItemCarrinho">

                <div class="TopoItemCarrinho">
                    <h3>${produto.nome}</h3>

                    <button class="RemoverItem"
                        data-acao="remover"
                        data-indice="${indice}">
                        X
                    </button>
                </div>

                <p>${formatarPreco(produto.preco)} cada</p>

                <div class="ControleQuantidade">

                    <button data-acao="diminuir"
                        data-indice="${indice}">−</button>

                    <span>${produto.quantidade}</span>

                    <button data-acao="aumentar"
                        data-indice="${indice}">+</button>

                    <strong>${formatarPreco(produto.preco * produto.quantidade)}</strong>

                </div>

            </div>
        `;

        produtosCarrinho.appendChild(elementoProduto);

    });


    let valorTotal = 0;

    itensCarrinho.forEach(function (produto) {

        valorTotal += produto.preco * produto.quantidade;

    });

    totalCarrinho.textContent = formatarPreco(valorTotal);

}


const botoesAdicionar = document.querySelectorAll("#Produtos li button");

botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const elementoProduto = botao.closest("li");

        const nomeProduto = elementoProduto.querySelector("h2").textContent.trim();

        const precoTexto = elementoProduto.querySelector("h4").textContent;

        const precoProduto = Number(
            precoTexto.replace("R$", "").trim().replace(/\./g, "").replace(",", ".")
        );

        const imagemProduto = elementoProduto.querySelector("img").getAttribute("src");


        const produtoExistente = itensCarrinho.find(function (produto) {

            return produto.nome === nomeProduto;

        });


        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            itensCarrinho.push({

                nome: nomeProduto,
                preco: precoProduto,
                imagem: imagemProduto,
                quantidade: 1

            });

        }

        atualizarCarrinho();

    });

});


produtosCarrinho.addEventListener("click", function (evento) {

    const botao = evento.target.closest("button[data-acao]");

    if (!botao) {

        return;

    }


    const indice = Number(botao.dataset.indice);

    const acao = botao.dataset.acao;


    if (acao === "aumentar") {

        itensCarrinho[indice].quantidade++;

    }


    if (acao === "diminuir") {

        itensCarrinho[indice].quantidade--;

        if (itensCarrinho[indice].quantidade <= 0) {

            itensCarrinho.splice(indice, 1);

        }

    }


    if (acao === "remover") {

        itensCarrinho.splice(indice, 1);

    }


    atualizarCarrinho();

});