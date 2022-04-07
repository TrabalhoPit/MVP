var index = 0, estoqueArray = [];

$(document).on("click", "[data-remove-histograma]", function (e) {
    var index = $(this).data("remove-histograma");
    Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir essa coluna?',
        showCancelButton: true,
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não...",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteColumn(index);
            montaMsg("Produto removido", "", "info");
        }
    })
});

$("[data-adicionar-table]").on("click", function () {
    swal.fire({
        title: 'Adicionar Produto',
        html: '<label>Nome do produto:</label>' +
            '<input id="swal-input1" class="swal2-input">' +
            '<label>Quantidade em estoque:</label>' +
            '<input id="swal-input2" class="swal2-input">' +
            '<label>Valor:</label>' +
            '<input id="swal-input3" class="swal2-input">',
        confirmButtonText: "Adicionar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                    $('#swal-input1').val(),
                    $('#swal-input2').val(),
                    $('#swal-input3').val()
                ])
            })
        }
    }).then(function (result) {
        if (result.isConfirmed) {
            trataResultado(result.value);
            montaMsg("Produto adicionado", "", "info");
        }
    }).catch(swal.noop);
    masks();
})

function trataResultado(data, complementarArray = true, oldIndex = '') {

    let valida = data.map((value) => {
        if (value === '' || value == 'R$') {
            montaMsg("Não deixe vazio");
            return false;
        }
        return true;
    });

    if (valida.includes(false)) {
        return false;
    }

    if (!validaNumber(data[1])) {
        montaMsg("Digite um valor de estoque válido!");
        return;
    }

    let estoqueObject = {
        nomeProduto: data[0],
        estoque: data[1],
        valor: data[2],
        index: (oldIndex !== '' ? oldIndex : index),
        show: 'V'
    }

    montaHtmlEstoque(estoqueObject);
    if (complementarArray) {
        estoqueArray[estoqueObject.index] = estoqueObject;
    }
    if (oldIndex === '') {
        index++;
    }
    aparecerTitulos();
}


function montaHtmlEstoque(data) {
    if (data.show == 'F') {
        return;
    }
    let html = '<tr data-id-conteudo=' + data.index + '>';
    html += '<td>' + data.nomeProduto + '</td>';
    html += '<td>' + data.estoque + '</td>';
    html += '<td>' + data.valor + '</td>';
    html += '<td>' + montaButtons(data) + '</td>';
    html += '</tr>';

    if (data.index === 0) {
        $("[data-body-table]").after(html);
    } else {
        let lastElement = $("[data-id-conteudo]").slice(-1);
        if (lastElement.length <= 0) {
            $("[data-body-table]").after(html);
        }
        $(lastElement).after(html);
    }
}

function montaButtons(data) {
    let htmlButton = '<div class="bloco-botoes">';
    htmlButton += montaButtonEdit(data.index);
    htmlButton += montaButtonSell(data.index);
    htmlButton += montaButtonRemove(data.index);
    htmlButton += '</div>';
    return htmlButton;
}

function montaButtonRemove(index) {
    return '<div class="button-acao remover" data-remove-estoque="' + index + '"><span class="material-icons">delete</span></div>';
}

function montaButtonEdit(index) {
    return '<div class="button-acao editar" data-edit-estoque="' + index + '"><span class="material-icons">edit</span></div>';
}

function montaButtonSell(index) {
    return '<div class="button-acao vender" data-sell-estoque="' + index + '"><span class="material-icons">sell</span></div>';
}

$(document).on("click", "[data-remove-estoque]", function (e) {
    var index = $(this).data("remove-estoque");
    Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir essa coluna?',
        showCancelButton: true,
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não...",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteColumn(index);
        }
    })
});

function deleteColumn(index) {
    var element = $("[data-id-conteudo=" + index + "]");
    estoqueArray = estoqueArray.map((value) => { if (value.index == index) { value.show = 'F' } return value; });
    setTimeout(() => { element.hide("slow", function () { $(element).remove(); }) }, 500);
}

$(document).on("click", "[data-edit-estoque]", function (e) {
    var index = $(this).data("edit-estoque");
    montaSwalEdit(estoqueArray[index]);
});

function aparecerTitulos() {
    let display = $("[data-head-table]").css("display");
    if (display == "none") {
        $("[data-head-table]").slideToggle();
    }
}

function montaSwalEdit(data) {
    swal.fire({
        title: 'Editar Produto',
        html: '<label>Nome Produto:</label>' +
            '<input id="swal-input1" value="' + data.nomeProduto + '" class="swal2-input">' +
            '<label>Qunatidade Estoque:</label>' +
            '<input id="swal-input2" value="' + data.estoque + '" class="swal2-input">' +
            '<label>Valor:</label>' +
            '<input id="swal-input3" value="' + data.valor + '" class="swal2-input">',
        confirmButtonText: "Alterar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                    $('#swal-input1').val(),
                    $('#swal-input2').val(),
                    $('#swal-input3').val()
                ])
            })
        }
    }).then(function (result) {
        if (result.isConfirmed) {
            if (trataResultadoEdit(result.value, data.index) != false) {
                // $("[data-id-conteudo=" + data.index + "]").remove();
                montaMsg("Produto editado", "", "info");
            };
        }
    }).catch(swal.noop);

    masks();
}

function trataResultadoEdit(values, indexOld) {
    estoqueArray = estoqueArray.map((value, index) => {
        if (index == indexOld) {
            value.nomeProduto = values[0];
            value.estoque = values[1];
            value.valor = values[2];
            return value;
        }
        return value;
    })
    excluirTabela();
    remontaTabela();
}

function remontaTabela() {
    estoqueArray.map((value) => {
        if (value.show == 'V') {
            trataResultado(Object.values(value), false, value.index);
        }
    });
}

$(document).on("click", "[data-sell-estoque]", function (e) {
    var index = $(this).data("sell-estoque");
    montaSwalSell(estoqueArray[index]);
});


function montaSwalSell(data) {
    swal.fire({
        title: 'Vender Produto',
        html: '<label>Nome Produto ' + data.nomeProduto + '</label>' +
            '<br><label>Quantidade para Vender:</label>' +
            '<input id="swal-input2" class="swal2-input">',
        confirmButtonText: "Vender",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: function () {
            return new Promise(function (resolve) {
                resolve([
                    $('#swal-input2').val()
                ])
            })
        }
    }).then(function (result) {
        if (result.isConfirmed) {
            let valores = trataVenda(result.value, data);
            if (valores != false) {
                trataResultado(valores);
                montaMsg("Venda realizada", "", "info");
            }
        }
    }).catch(swal.noop);

    masks();
}

$("[data-search-product]").on("click", function () {
    let name = $('[data-search-input]').val();

    if (name === '') {
        excluirTabela();
        remontaTabela();
        return;
    }

    pesquisaProduto(name);
})

function pesquisaProduto(nameProduct) {
    let produtcsFound = [];
    estoqueArray.map((value) => {
        if (value.nomeProduto == nameProduct) {
            produtcsFound.push(value);
        }
    });
    if (produtcsFound.length <= 0) {
        montaMsg("Nenhum produto encontrado!");
        return;
    }
    excluirTabela();
    produtcsFound.map((value) => {
        console.log(value);
        trataResultado(Object.values(value), false, value.index);
    })

}

function excluirTabela() {
    estoqueArray.map((value) => {
        $('[data-id-conteudo=' + value.index + ']').remove();
    });
}

function trataVenda(value, data) {
    if (data.estoque == 0) {
        montaMsg("Produto esgotado!");
        return false;
    }
    data.estoque = data.estoque - value;
    $("[data-id-conteudo=" + data.index + "]").remove();
    return Object.values(data);
}


function montaMsg($msg, $title = '', $icon = 'error') {
    Swal.fire(
        $title,
        $msg,
        $icon
    )
}

function validaNumber(num) {
    if (isNaN(num)) {
        montaMsg("Digite um valor valido!");
        return false;
    }
    return true;
}

function masks() {
    $("#swal-input2").mask("0000");
    $("#swal-input3").mask("R$000.000,00");
}

