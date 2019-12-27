const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');
const server = express();
const projectRoute = require('../Router/projectRouter.js');
const actionRoute = require('../Router/actionRouter.js');

server.use(helmet());
server.use(logger);
// server.use(cors());


server.get('/', (req, res) => {
    res.send(`<h1> Your Serever is up and runing</h1>`)
})

server.use('/api/project', projectRoute);
server.use('/api/action', actionRoute);

function logger(req, res, next) {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next()
}


module.exports = server