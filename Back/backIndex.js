const path = require('path');

const express = require('express');
const app = express();
const port = 9090;
const mongoose = require('mongoose');
const dataSchema = require('../Back/schema');
const dataSchema2 = require('./textschema');
const bodyParser = require('body-parser');
var cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

app.get('/authenticate',function(req,res){
  dataSchema.find(function(err,usuario){
   if(err){
     console.log(err)
     }  
   else{
     res.send(usuario)
   }
  })
})

app.post('/authenticate', (req,res) => {
  const post = new dataSchema({
    Email: req.body.Email,
    Senha: req.body.Senha
  })

  post.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({message: err});
    });
});


app.get('/coins',function(req,res){
  dataSchema2.find(function(err,usuario){
   if(err){
     console.log(err)
     }  
   else{
     res.send(usuario)
   }
  })
})

app.post('/coins', (req,res) => {
  const post = new dataSchema2({
    Nome: req.body.Nome,
    PrecoCompra: req.body.PrecoCompra,
    PrecoVenda: req.body.PrecoVenda
  })

  post.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({message: err});
    });
});


mongoose.connect("mongodb+srv://admin:admin@cluster0.rknsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, () => {
  console.log('conectado ao DB')
})

app.listen(process.env.PORT || port, () => {console.log("server started on port" + port)});
