//MODAL
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");       // informacao q ficar salva enquanto estiver na sessao
const session = localStorage.getItem("session");      // informacao q ficara salva no armazenamento storagelocal

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();                                         // USA-SE O PREVENT DEFAULT POIS O LOGIN SERA CONTROLADO POR NOS, NAO EM UMA OUTRA PAGINA

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;      // nesse caso eh checked pois nao queremos saber o "valor" mas sim se esta ticado (checked) ou nao

    const account = getAccount(email)                                     // no nosso storage a key eh o email

    if(!account) {                                // utiliza o ! para dizer que nao tem account = !account (Verificacao feita para verificar se existe a conta com o email informado)
        alert("Opps! Verifique o usuário ou a senha.");
        return
    }

    if(account) {                           // caso exista a conta, a segunda verificacao eh se a senha esta correta
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.") 
            return;
        }

        saveSession(email, checkSession)

        window.location.href = "home.html";
    }                               

 });

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }
    if(password.length < 4) {
        alert("Preencha a senha com no mínimo 4 digitos")
        return;
    }
    saveAccount({
        login: email,
        password: password,
        transaction: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

function checkLogged() {                   //funcao para verificar se esta logado
    if(session) {
        sessionStorage.setItem("logged", session);          //se tiver alguem salvo, setar quem esta logado - salvar em session
        logged = session;
    }

    if(logged) {                           //se tiver alguem logado, executar funcao saveSession e enviar usuario para home
        saveSession(logged, session);

        window.location = "home.html"
    }
}

function saveAccount (data) {
    localStorage.setItem(data.login, JSON.stringify(data));                  //localStorage BANCO DE DADOS 
}                                                                             // JSON.stringify para transformar o valor em string

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);              // o local storage salva mesmo se eu fechar a pagina, ja o sessio storage salva apenas durante a sessao estiver aberta
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    
    if(account){
        return JSON.parse(account);                             // JSON.parse para desfazer o valor em string
    }

    return "";
}

//fim