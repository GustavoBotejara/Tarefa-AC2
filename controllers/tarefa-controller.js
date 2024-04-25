const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

router.get('/', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findOne({ _id: req.params.id });
        if (!tarefa) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    const { titulo, descricao, concluida } = req.body;
    const tarefa = { titulo, descricao, concluida }
    try {
        await Tarefa.create(tarefa);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descricao, concluida } = req.body;
        const usu = { titulo, descricao, concluida }
        const updateUsu = await Tarefa.updateOne({ _id: id }, usu);
        if (updateUsu.matchedCount === 0) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return
        }
        res.status(200).json(usu);
        } catch (error) {
            res.status(500).json({ error: error });
        }
});
    
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tarefa = await Tarefa.findOne({ _id: id });
        if (!tarefa) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return;
        }
        await Tarefa.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Tarefa excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
