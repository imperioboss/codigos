

   document.addEventListener('DOMContentLoaded', function() {
    const contadorCarrinho = document.getElementById('contador-carrinho');
    let itensCarrinho = [];

    // Função para adicionar itens ao carrinho
    function adicionarAoCarrinho(item) {
        itensCarrinho.push(item);
        atualizarContadorCarrinho();
    }

    // Atualizar o contador do carrinho
    function atualizarContadorCarrinho() {
        contadorCarrinho.textContent = itensCarrinho.length;
    }

    // Simulação de adição de item ao carrinho
    // Aqui você pode substituir por sua própria lógica de adicionar itens ao carrinho
    document.querySelectorAll('.botaoAdicionarCarrinho').forEach(botao => {
        botao.addEventListener('click', function() {
            const item = { id: this.dataset.id, nome: this.dataset.nome };
            adicionarAoCarrinho(item);
        });
    });


  function rolarParaCarrinho() {
        const carrinhoElemento = document.getElementById('carrinho');
        if (carrinhoElemento) {
            carrinhoElemento.style.display = 'block';
            carrinhoElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Vincular evento de clique ao botão do carrinho
    const botaoCarrinho = document.getElementById('botao-carrinho');
    if (botaoCarrinho) {
        botaoCarrinho.addEventListener('click', rolarParaCarrinho);
    }

    // Manipulação de marcas e produtos


document.querySelectorAll('.btn-marca').forEach(btn => {
    btn.addEventListener('click', function () {
        // Extrai o ID da marca do atributo 'onclick'
        const marca = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        mostrarProdutos(marca);
    });
});

function mostrarProdutos(marca) {
    document.querySelectorAll('.produtos-marca').forEach(div => {
        div.style.display = 'none';
    });

    const marcaElemento = document.getElementById(marca);
    if (marcaElemento) {
        marcaElemento.style.display = 'block';
        marcaElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


function pesquisar() {
    const textoPesquisa = document.getElementById('campoPesquisa').value.toLowerCase().split(' ');
    let encontrouProduto = false;

    document.querySelectorAll('.produtos-marca').forEach(secaoMarca => {
        let encontrouNaMarca = false;
        const nomeMarca = secaoMarca.id.toLowerCase();

        secaoMarca.querySelectorAll('.accordion').forEach(accordion => {
            let encontrouNoAcordeao = false;

            accordion.nextElementSibling.querySelectorAll('.produto-item').forEach(produto => {
                const nomeProduto = produto.querySelector('.produto-nome').textContent.toLowerCase();

                const produtoEhMarcaCorrespondem = textoPesquisa.every(parteTexto => 
                    nomeProduto.includes(parteTexto) || nomeMarca.includes(parteTexto));

                if (produtoEhMarcaCorrespondem) {
                    produto.style.display = 'block';
                    encontrouProduto = encontrouNaMarca = encontrouNoAcordeao = true;
                    accordion.style.display = 'block';
                    accordion.classList.add('active');
                    accordion.nextElementSibling.style.display = 'block';
                    produto.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    produto.style.display = 'none';
                }
            });

            if (!encontrouNoAcordeao) {
                accordion.classList.remove('active');
                accordion.nextElementSibling.style.display = 'none';
            }
        });

        secaoMarca.style.display = encontrouNaMarca ? 'block' : 'none';
    });

    const resultadoPesquisa = document.getElementById('resultadoPesquisa');
    resultadoPesquisa.style.display = encontrouProduto ? 'none' : 'block';
}


document.getElementById('formPesquisa').addEventListener('submit', function(event) {
    event.preventDefault();
    pesquisar();
});


    // Acordeões de produtos
document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel) {
            panel.style.display = panel.style.display === "block" ? "none" : "block";

            // Rolar a página até o início da lista de produtos correspondente
            if (panel.style.display === "block") {
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
    // Carrinho de Compras
    let carrinho = [];

function adicionarAoCarrinho(nomeProduto, preco, marca) {
    const produtoIndex = carrinho.findIndex(produto => produto.nome === nomeProduto && produto.marca === marca);
    if (produtoIndex > -1) {
        carrinho[produtoIndex].quantidade++;
    } else {
        carrinho.push({ nome: nomeProduto, preco: parseFloat(preco), marca: marca, quantidade: 1 });
    }
    atualizarCarrinho();

    // Mostrar o modal depois de adicionar um item ao carrinho
    mostrarModalAdicionarCarrinho();
}


function removerDoCarrinho(nomeProduto, marcaProduto) {
    const produtoIndex = carrinho.findIndex(produto => produto.nome === nomeProduto && produto.marca === marcaProduto);
    
    if (produtoIndex > -1) {
        carrinho[produtoIndex].quantidade--;
        if (carrinho[produtoIndex].quantidade <= 0) {
            carrinho.splice(produtoIndex, 1);
        }
        atualizarCarrinho();
    }
}


function atualizarCarrinho() {
    const divCarrinho = document.getElementById('itensCarrinho');
    divCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
        const divItemCarrinho = document.createElement('div');
        divItemCarrinho.className = 'item-carrinho';
        divItemCarrinho.innerHTML = `
            <span class='nome-produto'>${produto.quantidade}x ${produto.nome} (${produto.marca})</span>
            <span class='preco-produto'>R$${(produto.preco * produto.quantidade).toFixed(2)}</span>
            <button class='btn-remover' data-nome='${produto.nome}' data-marca='${produto.marca}'>Remover</button>
        `;
        divCarrinho.appendChild(divItemCarrinho);
    });

    document.getElementById('valorTotal').textContent = `R$${total.toFixed(2)}`;
    document.getElementById('carrinho').style.display = carrinho.length > 0 ? 'block' : 'none';
    atualizarContadorCarrinho();
}

document.getElementById('carrinho').addEventListener('click', function(event) {
    if (event.target.className === 'btn-remover') {
        const nomeProduto = event.target.getAttribute('data-nome');
        const marcaProduto = event.target.getAttribute('data-marca');
        removerDoCarrinho(nomeProduto, marcaProduto);
    }
});


   const botaoLimparCarrinho = document.getElementById('btnLimparCarrinho');
    if (botaoLimparCarrinho) {
        botaoLimparCarrinho.addEventListener('click', limparCarrinho);
    }


function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

// Vincular evento de clique ao botão 'Limpar Carrinho'
document.getElementById('btnLimparCarrinho').addEventListener('click', limparCarrinho);

// Código para vincular evento de clique aos botões 'Remover'
document.getElementById('carrinho').addEventListener('click', function(event) {
    if (event.target.className === 'btn-remover') {
        const nomeProduto = event.target.parentNode.querySelector('.nome-produto').textContent.split(' ')[1];
        const marcaProduto = event.target.parentNode.querySelector('.nome-produto').textContent.split('(')[1].slice(0, -1);
        removerDoCarrinho(nomeProduto, marcaProduto);
    }
});
    // Modal de adicionar ao carrinho
 function mostrarModalAdicionarCarrinho() {
    document.getElementById('modalAdicionarCarrinho').style.display = 'block';
}

    function fecharModal() {
        document.getElementById('modalAdicionarCarrinho').style.display = 'none';
    }

    document.getElementById('continuarComprando').addEventListener('click', fecharModal);
document.getElementById('irParaCarrinho').addEventListener('click', function() {
    // Fechar o modal
    fecharModal();

    // Exibir o carrinho
    document.getElementById('carrinho').style.display = 'block';

    // Rolar a página até o início do carrinho
    document.getElementById('carrinho').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Ocultar a lista de produtos das marcas
    document.querySelectorAll('.produtos-marca').forEach(div => {
        div.style.display = 'none';
    });
});



document.getElementById('btnConfirmarCarrinho').addEventListener('click', function() {
    if (carrinho.length > 0) {
        document.getElementById('carrinho').style.display = 'none';
        document.getElementById('formContainer').style.display = 'block';
        document.getElementById('formContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        alert("Seu carrinho está vazio.");
    }
});


let cupomFoiAplicado = false;
let descontoAplicado = 0;

function aplicarCupom() {
    if (cupomFoiAplicado) {
        alert("Cupom já foi aplicado.");
        return;
    }

    const inputCupom = document.getElementById('inputCupom').value.trim().toLowerCase();
    const cupomValido = "geimperio";  // Substitua 'seucupom' pelo código do seu cupom de desconto

    if (inputCupom === cupomValido) {
        cupomFoiAplicado = true;
        let totalProdutos = 0;
        carrinho.forEach(produto => {
            totalProdutos += produto.preco * produto.quantidade;
        });

        descontoAplicado = totalProdutos * 0.05; // 10% de desconto
        document.getElementById('valorTotal').textContent = `R$${(totalProdutos - descontoAplicado).toFixed(2)}`;

        // Atualizar o resumo do pedido
        atualizarResumoPedido();

        alert("Desconto aplicado com sucesso!");
    } else {
        alert("Cupom inválido.");
    }
    
}


// Não se esqueça de adicionar um event listener para a seleção da forma de pagamento
document.getElementById('formaPagamento').addEventListener('change', function() {
    atualizarResumoPedido();
});

document.getElementById('btnAplicarCupom').addEventListener('click', aplicarCupom);


document.getElementById('formEnvio').addEventListener('submit', function(event) {
    event.preventDefault();

    // Preencher os dados de envio
   // Obter valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Atualizar o resumo dos dados de envio
    document.getElementById('resumoNome').textContent = nome;
    document.getElementById('resumoCpf').textContent = cpf;
    document.getElementById('resumoEndereco').textContent = endereco;
    document.getElementById('resumoNumero').textContent = numero;
    document.getElementById('resumoBairro').textContent = bairro;
    document.getElementById('resumoCidade').textContent = cidade;
    document.getElementById('resumoEstado').textContent = estado;

    // Atualizar o resumo do pedido (Produtos, Frete e Total)
    atualizarResumoPedido();

    // Exibir o resumo do pedido
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('resumoPedido').style.display = 'block';
});

function atualizarResumoPedido() {
    let totalProdutos = 0;
    let detalhesProdutos = '';

    carrinho.forEach(produto => {
        totalProdutos += produto.preco * produto.quantidade;
        detalhesProdutos += `<strong>${produto.quantidade}x ${produto.nome} (${produto.marca})</strong> - <strong>R$${(produto.preco * produto.quantidade).toFixed(2)}</strong><br>`;
    });

   // Insere os detalhes dos produtos no HTML
    document.getElementById('resumoProdutos').innerHTML = detalhesProdutos;

    let valorFrete = 0;
    const valorFreteElemento = document.getElementById('valorFrete');
    const tipoFrete = document.getElementById('tipoFrete').value;
    if (valorFreteElemento && valorFreteElemento.value !== 'Não disponível') {
        valorFrete = parseFloat(valorFreteElemento.value.replace('R$ ', '').replace(',', '.'));
    }

    // Atualiza o valor do frete no HTML
    document.getElementById('resumoValorFrete').innerHTML = `<strong>${tipoFrete}: R$${valorFrete.toFixed(2)}</strong>`;

    // Calcula o total do pedido
    let totalPedido = totalProdutos + valorFrete;

    // Aplica o desconto se um cupom foi usado
    if (cupomFoiAplicado) {
        totalPedido -= descontoAplicado;
    }

    // Adiciona um acréscimo se o pagamento for com cartão
    const formaPagamento = document.getElementById('formaPagamento').value;
    if (formaPagamento === 'CARTAO') {
        totalPedido += totalPedido * 0.05;
    }

    // Adiciona o valor do seguro ao total, se selecionado
    let valorSeguro = 0;
    if (document.getElementById('contratarSeguro').checked) {
        valorSeguro = totalPedido * 0.20; // 20% do valor total
        totalPedido += valorSeguro;
        document.getElementById('resumoValorSeguro').innerHTML = `<strong>Valor do Seguro: R$${valorSeguro.toFixed(2)}</strong>`;
    } else {
        document.getElementById('resumoValorSeguro').innerHTML = '';
    }

    // Prepara as mensagens extras
    let extras = [];
    if (cupomFoiAplicado) {
        extras.push("(com desconto do CUPOM)");
    }
    if (formaPagamento === 'CARTAO') {
        extras.push("(+ acréscimo do cartão)");
    }
    if (valorSeguro > 0) {
        extras.push("(Seguro contratado)");
    }

    // Atualiza o total do pedido no HTML com as mensagens extras formatadas
    document.getElementById('resumoTotalPedido').innerHTML = `<strong>R$${totalPedido.toFixed(2)}</strong><br>${extras.join('<br>')}`;
    document.getElementById('resumoFormaPagamento').innerHTML = `<strong>${formaPagamento}</strong>`;
}


    // Botões de adicionar ao carrinho
    document.querySelectorAll('.btn-adicionar').forEach(button => {
        button.addEventListener('click', function() {
            const nomeProduto = this.parentNode.querySelector('.produto-nome').textContent;
            const precoProduto = parseFloat(this.parentNode.querySelector('.produto-preco').textContent.replace('R$ ', ''));
            const marcaProduto = this.getAttribute('onclick').match(/, '([^']+)'/)[1];
            adicionarAoCarrinho(nomeProduto, precoProduto, marcaProduto);
        });
    });


document.getElementById('btnEnviarPedido').addEventListener('click', function() {
    let mensagem = "IMPERIO (" + document.getElementById('tipoFrete').value + ")\n\n";
    mensagem += "DADOS DE ENVIO\n";
    mensagem += "Nome: " + document.getElementById('nome').value + "\n";
    mensagem += "CPF: " + document.getElementById('cpf').value + "\n";
    mensagem += "Endereço: " + document.getElementById('endereco').value + ", " + document.getElementById('numero').value + "\n";
    mensagem += "Bairro: " + document.getElementById('bairro').value + "\n";
    mensagem += "Cidade: " + document.getElementById('cidade').value + "\n";
    mensagem += "Estado: " + document.getElementById('estado').value + "\n";
    mensagem += "CEP: " + document.getElementById('cep').value + "\n\n";

    mensagem += "PRODUTOS\n";
    carrinho.forEach(produto => {
        mensagem += `${produto.quantidade}x ${produto.nome} (${produto.marca}) - R$${(produto.preco * produto.quantidade).toFixed(2)}\n`;
    });

    mensagem += "\nVALOR DO FRETE: R$" + document.getElementById('valorFrete').value.replace('R$ ', '') + "\n\n";

    let totalPedido = parseFloat(document.getElementById('resumoTotalPedido').textContent.replace('R$', '').trim());
    let extras = [];
    if (cupomFoiAplicado) {
        extras.push("com desconto do CUPOM");
    }
    if (document.getElementById('formaPagamento').value === 'CARTAO') {
        extras.push("acréscimo por cartão de crédito");
    }
    if (document.getElementById('contratarSeguro').checked) {
        extras.push("Seguro contratado");
    }
    mensagem += "TOTAL DO PEDIDO: R$" + totalPedido.toFixed(2) + (extras.length > 0 ? "\n" + extras.join("\n") : "") + "\n";

    const numeroWhatsApp = "5511919783638";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
});

document.getElementById('cep').addEventListener('input', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                    calcularFrete();
                }
            });
    }
});


function calcularFrete() {
    const estado = document.getElementById('estado').value;
    const tipoFrete = document.getElementById('tipoFrete').value;

    const tabelaFrete = {
        'SEDEX': {
            'SP': 40.00, 'DF': 50.00, 'RJ': 60.00, 'MG': 65.00, 'GO': 65.00, 'PR': 65.00, 'SC': 65.00,
            'ES': 65.00, 'RS': 70.00, 'MS': 80.00, 'MT': 80.00, 'BA': 80.00, 'CE': 85.00, 'SE': 105.00,
            'PE': 105.00, 'AL': 105.00, 'PB': 105.00, 'RN': 105.00, 'PI': 105.00, 'MA': 105.00,
            'PA': 105.00, 'AP': 105.00, 'AM': 105.00, 'TO': 105.00, 'CE': 125.00
        },
        'PAC': {
            'SP': 35.00, 'DF': 40.00, 'RJ': 40.00, 'ES': 40.00, 'MG': 45.00, 'GO': 45.00, 'PR': 45.00,
            'SC': 45.00, 'RS': 45.00, 'MS': 45.00, 'MT': 45.00, 'BA': 50.00, 'CE': 50.00, 'SE': 55.00,
            'AL': 55.00, 'PB': 55.00, 'RN': 55.00, 'PI': 55.00, 'AP': 55.00, 'TO': 55.00, 'PE': 65.00,
            'MA': 65.00, 'AM': 65.00, 'PA': 70.00, 'RO': 85.00
        },
        'TRANSPORTADORA': {
            'SP': 45.00, 'RJ': 65.00, 'ES': 75.00, 'MG': 75.00, 'DF': 75.00, 'SC': 75.00, 'PR': 75.00,
            'RS': 75.00, 'SE': 85.00, 'AL': 85.00, 'BA': 85.00, 'PB': 85.00, 'CE': 85.00, 'PI': 85.00,
            'PA': 85.00, 'GO': 85.00, 'TO': 85.00, 'MS': 85.00, 'RN': 95.00, 'MA': 95.00, 'MT': 95.00,
            'PE': 105.00, 'AM': 105.00, 'AP': 130.00, 'AC': 150.00
        }
    };

    if (tabelaFrete[tipoFrete] && tabelaFrete[tipoFrete][estado]) {
        const valorFrete = tabelaFrete[tipoFrete][estado];
        document.getElementById('valorFrete').value = `R$ ${valorFrete.toFixed(2)}`;
    } else {
        document.getElementById('valorFrete').value = 'Não disponível';
    }
}


document.getElementById('tipoFrete').addEventListener('change', calcularFrete);


function calcularValorSeguro(total) {
    return total * 0.20; // 20% do total
}

document.getElementById('contratarSeguro').addEventListener('change', function() {
    atualizarResumoPedido();
});



 // Adicione os event listeners para os botões editar aqui, no final do seu código
    document.getElementById('btnEditarDadosFormulario').addEventListener('click', function() {
        document.getElementById('formContainer').style.display = 'block'; // Mostrar o formulário
        document.getElementById('resumoPedido').style.display = 'none'; // Esconder o resumo do pedido
        document.getElementById('formContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Botão editar itens do carrinho
    document.getElementById('btnEditarCarrinho').addEventListener('click', function() {
        document.getElementById('carrinho').style.display = 'block'; // Mostrar o carrinho
        document.getElementById('resumoPedido').style.display = 'none'; // Esconder o resumo do pedido
        document.getElementById('carrinho').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });


    function mostrarModalAvisos() {
        const modalAvisos = document.getElementById('modalAvisos');
        if (modalAvisos) {
            modalAvisos.style.display = 'block';
        }
    }

    // Função para fechar o modal de avisos
    function fecharModalAvisos() {
        const modalAvisos = document.getElementById('modalAvisos');
        if (modalAvisos) {
            modalAvisos.style.display = 'none';
        }
    }

    // Evento para abrir o modal de avisos quando a página carrega
    mostrarModalAvisos();

    // Evento para fechar o modal de avisos
    const closeModalAvisos = document.getElementById('closeModalAvisos');
    if (closeModalAvisos) {
        closeModalAvisos.addEventListener('click', fecharModalAvisos);
    }


});




    
