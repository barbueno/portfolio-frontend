//Conectando todos os campos para diminuir o tamanho do código
var fields = {};

document.addEventListener("DOMContentLoaded", function() {
    fields.nome = document.getElementById('nome');
    fields.email = document.getElementById('email');
    fields.assunto = document.getElementById('assunto');
    fields.mensagem = document.getElementById('mensagem');

    Object.values(fields).forEach(field => {
        field.addEventListener('input', toggleButton);
    });

    toggleButton();
})

//Verificando os campos
function checkFields() {
    var nome = fields.nome.value.trim();
    var email = fields.email.value.trim();
    var assunto = fields.assunto.value.trim();
    var mensagem = fields.mensagem.value.trim();
    
    return nome !== '' && email !== '' && assunto !== '' && mensagem !== '';
}

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
}
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
}
function fieldValidation(field, validationFunction, errorMessage, ...args) {
    if (field == null) return false;
   
    let isFieldValid = validationFunction(field.value, ...args);
    let errorElement = document.getElementById(field.id + "-error");
    if (!isFieldValid) {
        field.style.color = 'red';
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    } else {
        field.style.color = '';
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
   
    return isFieldValid;
}

function maxLength(value, maxLength) {
    return value.trim().length <= maxLength;
}

function isValid() {
    var valid = true;
    
    valid = fieldValidation(fields.nome, isNotEmpty, "O Nome não pode estar vazio e deve ter no máximo 50 caracteres.") && valid;
    valid = fieldValidation(fields.nome, maxLength, "O Nome deve ter no máximo 50 caracteres.", 50) && valid;
    valid = fieldValidation(fields.assunto, isNotEmpty, "O Assunto não pode estar vazio e deve ter no máximo 50 caracteres.") && valid;
    valid = fieldValidation(fields.assunto, maxLength, "O Assunto deve ter no máximo 50 caracteres.", 50) && valid;
    valid = fieldValidation(fields.email, isEmail, "Por favor, insira um endereço de e-mail válido.") && valid;
    valid = fieldValidation(fields.mensagem, isNotEmpty, "A Mensagem não pode estar vazia e deve ter no máximo 300 caracteres.") && valid;
    valid = fieldValidation(fields.mensagem, maxLength, "A Mensagem deve ter no máximo 300 caracteres.", 300) && valid;
   
    return valid;
}

//Enviando a mensagem
function sendMessage (){
    if (isValid()){
        alert ('Mensagem enviada!');
        window.location.reload();
    }
    else {
        alert ('Ocorreu um erro, confira os seus dados');
    }
}

//Desabilitar/habilitar o botão
function toggleButton() {
    var button = document.querySelector('.formcontato__botao');
    button.disabled = !checkFields(); 
}