const express = require('express');
const routes = require('../routes/user');
import mongoose from 'mongoose'
import config from '../config/config';
import logging from '../config/logging';

const server = express();
server.use(express.json());

beforeAll(async () => {
    await mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then(() => {
            logging.info('Mongo Connected')
        })
        .catch((error: any) => {
            logging.error(error)
        })

})

afterAll(async () => {
    try {
        await mongoose.connection.close()
    } catch (err) {
        console.log(err)
    }
    // Closing the DB connection allows Jest to exit successfully.


})

server.use('/api/users', routes);

module.exports = server;