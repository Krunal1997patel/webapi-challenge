const express = require('express');

const router = express.Router();

const projectDB = require('../data/helpers/projectModel.js');
const actionDB = require('../data/helpers/actionModel.js');

router.use(express.json());

router.get('/', (req, res) => {
    projectDB.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, 'from GET in project')
        res.status(500).json({
            errror: 'Can not get the project'
        })
    })
})


router.get('/:id', (req, res) => {
    projectDB.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, 'from GET in project')
        res.status(500).json({
            errror: 'Can not get the project by id'
        })
    })
})

router.get('/:id/action', (req, res) => {
    const id = req.params.id;

    projectDB.getProjectActions(id)
    .then(allAction =>{
        res.status(200).json(allAction)
    })
    .catch(err => {
        console.log(err, 'from GET in project to get all action')
        res.status(500).json({
            error: 'Can not all the actions'
        })
    })
})

router.post('/', (req, res) => {
    const body = req.body;

    if(!body.name || !body.description){
        res.status(400).json({
            error: "Need name and description for the post request."
        })
    }else{
        projectDB.insert(body)
        .then(info => {
            res.status(201).json(info)
        })
        .catch(err => {
            console.log(err, 'from POST in project')
            res.status(500).json({
                error: 'can not make a Post in project'
            })
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDB.get(id)
    .then(projectID => {
        projectDB.remove(id)
        .then(removeProject => {
            res.status(200).json({
                mess: `The Project with the ID of ${id} has been remove`,
                projectID
            })
        })
        .catch(err => {
            console.log(err, 'from DELETE in project')
            res.status(500).json({
                error: 'Can not delete the project'
            })
        })
    })
    .catch(err => {
        console.log(err, 'from GET by id inside DELETE')
        res.status(500).json({
            error: 'Can not get the project by id'
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if(!body.name || !body.description || !body.completed){
        res.status(400).json({
            error: "Need name and description and completed for the put request."
        })
    }else{
        projectDB.update(id, body)
        .then(change => {
            res.status(200).json(change)
        })
        .catch(err => {
            console.log(err, 'from PUT in project')
            res.status(500).json({
                error: 'can not make a put request in project'
            })
        })
    }
})

router.post('/:id/action', (req, res) => {
    const body = req.body;
    const id = req.params.id;

    if(!body.description || !body.notes){
        res.status(400).json({
            error: "Need description and notes for the post"
        })
    }else{
        actionDB.insert({...body, project_id: id})
        .then(info => {
            res.status(201).json(info)
        })
        .catch(err => {
            console.log(err, 'from POST in /:id/action')
            res.status(500).json({
                error: 'can not make a Post in action'
            })
        })
    }
})

module.exports = router;