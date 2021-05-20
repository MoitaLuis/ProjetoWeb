const path = require('path');

const express = require('express');
const app = express();
const port = 9090;
const mongoose = require('mongoose');
const dataSchema = require('./textschema');
const bodyParser = require('body-parser');
var cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

app.get('/uploads',function(req,res){
  dataSchema.find(function(err,usuario){
   if(err){
     console.log(err)
     }  
   else{
     res.send(usuario)
   }
  })
})

app.post('/uploads', (req,res) => {
  const post = new dataSchema({
    Conteudo: req.body.Conteudo
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

app.listen(port, () => {console.log("server started on port" + port)});
