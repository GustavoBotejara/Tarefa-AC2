
const express = require("express");
const mongoose = require('mongoose');
const tarefasController = require('./controllers/tarefa-controller');

const app = express();
app.use(express.json());
app.use('/tarefas', tarefasController)

mongoose.connect('mongodb://127.0.0.1:27017/aula10')
    .then(() => {
            app.listen(3000, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 3000');
        })
    }).catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('Api rodando');
});


    
    
