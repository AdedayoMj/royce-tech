import http from 'http'
import express from 'express'
import logging from './config/logging'
import config from './config/config'
import mongoose from 'mongoose'
import cors from 'cors'


import userRoutes from './routes/user'

import cluster from 'cluster'
import { cpus } from 'os'
import process from 'process'

// const throng = require('throng')
// const WORKERS = process.env.WEB_CONCURRENCY || 1
const numCPUs = cpus().length

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  const router = express()


  /** Server Handling */
  const httpServer = http.createServer(router)

  /** allow cors */
  router.use(cors())

  /** Connect to Firebase */

  /** Connect to Mongo */

  mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
      logging.info('Mongo Connected')
    })
    .catch((error: any) => {
      logging.error(error)
    })

  /** Log the request */
  router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
      logging.info(
                `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
      )
    })

    next()
  })

  /** Parse the body of the request */
  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }

    next()
  })

  /** Routes */
  router.use('/api/users', userRoutes)

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error('Not found')

    res.status(404).json({
      message: error.message
    })
  })

  /** Listen */
  httpServer.listen(config.server.port, () =>
    logging.info(`Server is running ${config.server.hostname}:${config.server.port}`)
  )
  console.log(`Worker ${process.pid} started`)
}
