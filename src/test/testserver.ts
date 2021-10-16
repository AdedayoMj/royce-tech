const express = require('express');
const routes = require('../routes/user');


const server = express();
server.use(express.json());

server.use('/api/users', routes);

module.exports = server;