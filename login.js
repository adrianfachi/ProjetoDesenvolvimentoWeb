const cpf = document.querySelector("#CPF");
const senha = document.getElementById('senha')
const mostrar = document.getElementById('mostrar')
const aviso = document.getElementById('aviso')

cpf.addEventListener("blur", function(){
   if(cpf.value.length == 11) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");
   validaCPF(cpf)
});


senha.addEventListener('blur', function() {
    validaSenha(senha)
})


function validaCPF (cpf) {
    if (cpf.value.length == 14) {
        cpf.style.border = 'none'
        return true
    } else {
        cpf.style.border = 'solid red'
        return false
    }
}

function validaSenha (senha) {
    if (senha.value.length > 4) {
        senha.style.border = 'none'
        return true
    } else {
        senha.style.border = 'solid red'
        return false
    }
}

function validaLogin () {
    const senhas = JSON.parse(localStorage.getItem('senha')) || []
    const CPFs = JSON.parse(localStorage.getItem('cpf')) || []
        if (CPFs.includes(cpf.value)) {
            if (senha.value == senhas[CPFs.indexOf(cpf.value)]) {
                return true
            } else {
                aviso.innerHTML = "<p>A senha está incorreta</p>"
                return false
            } 
        } else {
            aviso.innerHTML = '<p>Este CPF não tem uma conta, <a href="cadastro.html">clique aqui</a> para criar uma</p>'
            return false
        }
}

function avancar() {
    if(validaCPF(cpf) && validaSenha(senha) && validaLogin()) {
        window.location = "index.html"
    } else {
        validaCPF(cpf) 
        validaSenha(senha)
        validaLogin()
    }
}

mostrar.addEventListener('click', function() {
    mostrarSenha()
})

function mostrarSenha () {
    if(mostrar.checked) {
        senha.type = 'text'
    } else {
        senha.type = 'password'
    }
}