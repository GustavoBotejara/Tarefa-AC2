const mongoose = require('mongoose');

const Tarefa = mongoose.model('Tarefa', {
    titulo: String,
    descricao: String,
    concluida: Boolean
});

module.exports = Tarefa;