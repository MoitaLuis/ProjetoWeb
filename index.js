document.getElementById("email").value = "";
document.getElementById("login").value = "";
const btn = document.getElementsByClassName("ins");
var modal = document.querySelector('.modal');
var modal2 = document.querySelector('.modal2');
var cancel = document.querySelector('.cancel');
var cancel2 = document.querySelector('#cancel');
var modal_bg = document.querySelector('.modal_bg');
var modal_bg2 = document.querySelector('.modal_bg2');
var btn_cad = document.querySelector('#btn_cad');
var login_btn = document.querySelector('#login-button');
var loginInfo = document.querySelector('.loginInfo');
var online = document.querySelector('#online');
var btn_logout = document.querySelector('#btn_logout');
var btn_buscar = document.querySelector('#btn_buscar');
var btn_conteudo = document.querySelector('#btn_conteudo');
var api_search = document.querySelector('#api_search');
var searchcontainer = document.querySelector('#searchcontainer');


async function checaEmail(login){ 
  flag = 1
  await axios.get('http://localhost:9090/authenticate')
  .then(function(response)
  {
    for (const i in response.data) {
      if(response.data[i].Email == login){
        
        flag = 0
      }

    }
  })  
  return flag
}

async function chamaGet(login,senha){ 
  flag = 0
  await axios.get('http://localhost:9090/authenticate')
  .then(function(response)
  {
    for (const i in response.data) {
      if(response.data[i].Email == login && response.data[i].Senha == senha){
        flag = 1
        return flag
      }

    }
  })  
  return flag
}



async function chamaPost(login,senha){ 
  axios.post('http://localhost:9090/authenticate',{

    Email: login,
    Senha: senha

  }).then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }) 
}

btn_conteudo.addEventListener('click', (event) => {
  event.preventDefault();
  modal_bg2.classList.add("modal2_active")
  modal2.classList.add("modal2_active")
})

searchcontainer.addEventListener('submit', (event) => {
  event.preventDefault();
})
btn_buscar.addEventListener('click', (event) => {
  event.preventDefault();
  if(api_search.value == ""){
    var x = document.getElementById("snack1");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return false
  }
  else{
    usuario=localStorage.getItem('login')
    axios.get('https://www.mercadobitcoin.net/api/'+api_search.value+'/orderbook/')
  .then(function (response) {
    console.log(response.data)
    var x = document.getElementById("snack2");
    x.innerHTML ='Moeda: '+api_search.value.toUpperCase()+', Preço de compra: R$ '+response.data.asks[0][0]+', Preço de venda: R$ '+response.data.bids[0][0]
    x.className = "snackbarresposta show";
    setTimeout(function(){ x.className = x.className.replace("snackbarresposta show", "snackbarresposta"); }, 3000);
  })
  .catch(function (error) {
    console.log(error)
    var x = document.getElementById("snack3");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return false
  });
  }
  refresh();
})

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



btn_cad.addEventListener('click', async(event) => {
event.preventDefault();

  var login = document.getElementById("login").value;
  var senha = document.getElementById("senha").value;
  var rt_senha = document.getElementById("rt_senha").value;


  if(login == ""){
    var x = document.getElementById("snack4");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
  return false
  }

  if( senha != rt_senha){
    var x = document.getElementById("snack5");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
      return false
  }

  if( senha == "" || rt_senha == ""){
    var x = document.getElementById("snack6");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return false
    }

  if( senha.length < 3 ){
    var x = document.getElementById("snack7");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return false
  }
  
  if(!(await checaEmail(login))){
    var x = document.getElementById("snack8");
     x.className = "snackbar show";
     setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return false
  }

  else{
  console.log("antes do chama post")
  
  chamaPost(login,senha)

  console.log("dentro do chama post")
  modal.classList.remove("modal_active")
  modal_bg.classList.remove("modal_active")
  }
  return true;
})

// async function login_request(email,password){
//   await axios.post('https://reqres.in/api/login', {
//     email: email,
//     password: password
//   })
//   .then(function (response) {
//     var token = response.data.token;
//     console.log("token enviado pela API: " + token);
//     if(response.status == 200)
//     var x = document.getElementById("snack8");
//     x.className = "snackbar show";
//     setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
//     localStorage.setItem("logado", true);
//     refresh();
//   })
//   .catch(function (error) {
//     var x = document.getElementById("snack9");
//     x.className = "snackbar show";
//     setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
//     return false
//   });
// }

login_btn.addEventListener('click', async (event) => {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if(!emailRegex.test(email)){
    var x = document.getElementById("snack10");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return 0;
  }
  if(password == ""){
    var x = document.getElementById("snack11");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    return 0;
  }
  // if((email == localStorage.getItem("login") && password == localStorage.getItem("senha"))){
  //   var x = document.getElementById("snack12");
  //   x.className = "snackbar show";
  //   setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
  //   localStorage.setItem("logado", true);
  //   refresh();
  // }
  
  else{
    if(await chamaGet(email,password)){
    localStorage.setItem("logado", true);
    var x = document.getElementById("snack9");
    x.className = "snackbar show";
    setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
    refresh();
    return true
    }
    else{
      var x = document.getElementById("snack12");
      x.className = "snackbar show";
      setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
      return false
    }
  }
  
})
  

function storage(){
  localStorage.setItem("login", login.value)
  localStorage.setItem("senha", senha.value)
  var x = document.getElementById("snack13");
  x.className = "snackbar show";
  setTimeout(function(){ x.className = x.className.replace("snackbar show", "snackbar"); }, 3000);
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

cancel2.addEventListener('click', () => {
  modal2.classList.remove("modal2_active")
  modal_bg2.classList.remove("modal2_active")
})
