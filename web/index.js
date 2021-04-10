document.getElementById("email").value = "";
document.getElementById("login").value = "";
const btn = document.getElementsByClassName("ins");
var modal = document.querySelector('.modal');
var cancel = document.querySelector('.cancel');
var modal_bg = document.querySelector('.modal_bg');
var btn_cad = document.querySelector('#btn_cad');
var login_btn = document.querySelector('#login-button');
var loginInfo = document.querySelector('.loginInfo');
var online = document.querySelector('#online');
var btn_logout = document.querySelector('#btn_logout');

function refresh(){
if(localStorage.getItem("logado") == "true"){
  online.classList.add("logado");
  loginInfo.classList.add("loginInfo_none");
  online.classList.remove("deslogado");

}
else{
  console.log("entrei")
  online.classList.remove("logado");
  loginInfo.classList.remove("loginInfo_none");
}
}

refresh();

btn_logout.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.setItem("logado", false);
  window.location.reload(true);
  refresh();
})



btn_cad.addEventListener('click', (event) => {
event.preventDefault();

var login = document.getElementById("login").value;
var senha = document.getElementById("senha").value;
var rt_senha = document.getElementById("rt_senha").value;
console.log(senha)

if(login == ""){
  alert("Login não pode ser vazio")
return false
}
if( senha != rt_senha){
  alert("senhas não batem")
    return false
}
if( senha == "" || rt_senha == ""){
  alert("Senha não pode ser vazia")
  return false
  }
if( senha.length < 3 ){
  alert("Senha muito curta")
  return false
  }

  storage();
  modal.classList.remove("modal_active")
  modal_bg.classList.remove("modal_active")
  
  return true;
})


login_btn.addEventListener('click', (event) => {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

if(email == localStorage.getItem("login") && password == localStorage.getItem("senha")){
alert("Voce está logado!!!");
localStorage.setItem("logado", true);
refresh();
}
else{
  alert("credenciais inválidas")
return false
}

return true
})
  

function storage(){
  localStorage.setItem("login", login.value)
  localStorage.setItem("senha", senha.value)
  alert("cadastrado com sucesso")
  return true
}
  


const myFunction = function(){
  modal.classList.add("modal_active")
  modal_bg.classList.add("modal_active")

}

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', myFunction, false);
}

cancel.addEventListener('click', () => {
  modal.classList.remove("modal_active")
  modal_bg.classList.remove("modal_active")
})
