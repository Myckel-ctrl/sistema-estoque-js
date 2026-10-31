const produtos = [];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function validarProduto(nome, preco, quantidade) {
    if (nome === "") {
        console.log("Nome inválido.");
        return false;
    }
    if (isNaN(preco) || preco <= 0) {
        console.log("Preço inválido.");
        return false;
    }
    if (isNaN(quantidade) || quantidade < 0) {
        console.log("Quantidade inválida.");
        return false;
    }
    if (produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase())) {
        console.log("Já existe um produto com esse nome.");
        return false;
    }
    return true;
}

function cadastrarProduto() {
    const nome = (prompt("Nome: ") ?? "").trim();
    const preco = Number(prompt("Preço: "));
    const quantidade = Number(prompt("Quantidade: "));

    if (!validarProduto(nome, preco, quantidade)) {
        return;
    }

    produtos.push({ nome, preco, quantidade });
    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("\n===== LISTA DE PRODUTOS =====\n");
    produtos.forEach(p => {
        console.log(`${p.nome} | Preço: ${formatarMoeda(p.preco)} | Quantidade: ${p.quantidade}`);
    });
}

function buscarProduto() {
    const nome = (prompt("Nome do produto: ") ?? "").trim();
    const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (produto) {
        console.log("Produto encontrado!");
        console.log(`${produto.nome} | Preço: ${formatarMoeda(produto.preco)} | Quantidade: ${produto.quantidade}`);
    } else {
        console.log("Produto não encontrado.");
    }
}

function calcularValorTotal() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("\n===== VALOR TOTAL DO ESTOQUE =====\n");
    let total = 0;

    produtos.forEach(p => {
        const subtotal = p.preco * p.quantidade;
        total += subtotal;
        console.log(`${p.nome}: ${formatarMoeda(subtotal)}`);
    });

    console.log(`\nValor total: ${formatarMoeda(total)}`);
}

function removerProduto() {
    const nome = (prompt("Nome do produto a remover: ") ?? "").trim();
    const indice = produtos.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (indice === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    produtos.splice(indice, 1);
    console.log("Produto removido com sucesso!");
}

function atualizarPreco() {
    const nome = (prompt("Nome do produto: ") ?? "").trim();
    const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const novoPreco = Number(prompt("Novo preço: "));
    if (isNaN(novoPreco) || novoPreco <= 0) {
        console.log("Preço inválido.");
        return;
    }

    produto.preco = novoPreco;
    console.log("Preço atualizado com sucesso!");
}

function mostrarMaisCaro() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    const maisCaro = produtos.reduce((maior, atual) =>
        atual.preco > maior.preco ? atual : maior
    );
    console.log(`Produto mais caro: ${maisCaro.nome} (${formatarMoeda(maisCaro.preco)})`);
}

function mostrarQuantidadeProdutos() {
    console.log(`Produtos cadastrados: ${produtos.length}`);
}

function exibirMenu() {
    return prompt(`
===== GERENCIAMENTO DE ESTOQUE =====

1 - Cadastrar produto
2 - Listar produtos
3 - Buscar produto
4 - Valor total do estoque
5 - Sair
6 - Remover produto
7 - Atualizar preço
8 - Produto mais caro
9 - Quantidade de produtos

Escolha uma opção: `);
}

let opcao = "";

while (opcao !== "5") {
    opcao = exibirMenu();

    if (opcao === null) {
        break;
    }

    switch (opcao.trim()) {
        case "1": cadastrarProduto(); break;
        case "2": listarProdutos(); break;
        case "3": buscarProduto(); break;
        case "4": calcularValorTotal(); break;
        case "5": console.log("Encerrando o programa..."); break;
        case "6": removerProduto(); break;
        case "7": atualizarPreco(); break;
        case "8": mostrarMaisCaro(); break;
        case "9": mostrarQuantidadeProdutos(); break;
        default: console.log("Opção inválida.");
    }
}