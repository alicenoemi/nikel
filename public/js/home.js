const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");       
const session = localStorage.getItem("session"); 
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);                       // chamar o event listener ao clicar no botao sair

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

    console.log(data);
}

function logout() {                 //para sair da sessao logout
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data) {           //salvar dados da transaction no storage
    localStorage.setItem(data.login, JSON.stringify(data));
}