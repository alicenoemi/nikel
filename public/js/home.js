const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");       
const session = localStorage.getItem("session"); 

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);                       // chamar o event listener ao clicar no botao sair
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html"
})

//ADICIONAR LANCAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();                                                                             //para nao ir para outra pagina 

    const value = parseFloat(document.getElementById("value-input").value);                          //parseFloat transforma o valor em numero q possa ter virgula 
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;   
    const type = document.querySelector('input[name="type-input]:checked').value;                     //querySelector eh usado para trazer todos os comandos com o mesmo nome, nesse caso as entradas e saidas tem o mesmo nome, e o usuario deve informar qual se trata (por isso o checked)

    data.transactions.unshift({                                                                               //aqui estamos adicionando itens a nossa lista de transactions, usamos o unshift para colocar o valor no inicio da lista,e  nao no final como o push.
        value: value, type: type, description: description, date: date
    });
    
    saveData(data);                                                                                          //chamando a funcao de dados
    e.target.reset();                                                                                        //resetando o formulario, para ser inserido novo valor quando reaberto
    myModal.hide();                                                                                       //fechando a modal

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso!");
    
});

checkLogged();

function checkLogged() {                                                                                     //funcao para verificar se esta logado
    if(session) {
        sessionStorage.setItem("logged", session);          
        logged = session;
    }

    if(!logged) {                                                                                                // se nao tiver logado (!logged)
        window.location.href = "index.html";                                                     // mandar usuario para pagina index.html
        return;
    }

    const dataUSer = localStorage.getItem(logged);                                           // para pegar informacoes do usuario logado
    if(dataUSer) {
        data = JSON.parse(dataUSer);
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {                 //para sair da sessao logout
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index.description]}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             ` 

        }
        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === "2");

    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index.description]}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             ` 
             
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}


//CALCULAR TOTAL DAS TRANSACOES
function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed2}`;
}


function saveData(data) {           //salvar dados da transaction no storage
    localStorage.setItem(data.login, JSON.stringify(data));
}