const express = require('express');

const router = express.Router();

const actionDB = require('../data/helpers/actionModel.js');

router.use(express.json());

router.get('/', (req, res) => {
    actionDB.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err, 'from GET in action')
        res.status(500).json({
            error: 'Can not get the action'
        })
    })
})

router.get('/:id', (req, res) => {
    actionDB.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err, 'from GET in action id')
        res.status(500).json({
            error: 'Can not get the action by id'
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDB.get(id)
    .then(actionID => {
        actionDB.remove(id)
        .then(removeAction => {
            res.status(200).json({
                mess: `The action with the ID of ${id} was delete`,
                actionID
            })
        })
        .catch(err => {
            console.log(err, 'from DELETE in action')
            res.status(500).json({
                error: 'Can not delete the action'
            })
        })
    })
    .catch(err => {
        console.log(err, 'from GET by id inside DELETE')
        res.status(500).json({
            error: 'Can not get the action by id'
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!body.description || !body.notes || !body.completed){
        res.status(400).json({
            error: "Need notes and description and completed for the put request."
        })
    }else{
        actionDB.update(id, body)
        .then(change => {
            res.status(200).json(change)
        })
        .catch(err => {
            console.log(err, 'from PUT in action')
            res.status(500).json({
                error: 'can not make a put request'
            })
        })
    }
})



module.exports = router;