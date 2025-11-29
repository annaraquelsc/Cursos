let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input");
let dados = [];

async function carregarDados() {
    try {
        const resposta = await fetch("tutubas.json");
        dados = await resposta.json();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciar_busca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca)
    );
    renderizaCards(dadosFiltrados);
}

function renderizaCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores

    for (let dado of dados) {
        const fonte = new URL(dado.link).hostname; // Extrai o domínio do link
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="blank">Saiba mais</a>
        <p>${dado.Tags.join(", ")}</p>
        `
        cardContainer.appendChild(article);
    }
}


window.onload = carregarDados; // Carrega todos os dados quando a página é iniciada
