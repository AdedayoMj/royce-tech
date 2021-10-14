import { NextFunction, Request, Response } from 'express'
import logging from '../config/logging'
import User from '../models/user'
import mongoose from 'mongoose'

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Attempting to create blog ...')

  const { writer, author, title, url, year, otherInfo } = req.body

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
    writer,
    url,
    year,
    otherInfo
  })

  return user
    .save()
    .then((newUser) => {
      logging.info('New user  info created')

      return res.status(201).json({ user: newUser })
    })
    .catch((error) => {
      logging.error(error.message)

      return res.status(500).json({
        message: error.message
      })
    })
}

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID
  logging.info(`Incoming read for user data with id ${_id}`)

  User.findById(_id)
    .populate('name')
    .exec()
    .then((user) => {
      if (user) {
        return res.status(200).json({ user })
      } else {
        return res.status(404).json({
          error: 'Information not found.'
        })
      }
    })
    .catch((error) => {
      logging.error(error.message)

      return res.status(500).json({
        error: error.message
      })
    })
}

const update = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Update route called')

  const _id = req.params.userID

  User.findById(_id)
    .exec()
    .then((user) => {
      if (user) {
        user.set(req.body)
        user.save()
          .then((savedUser) => {
            logging.info(`User with id ${_id} updated`)

            return res.status(201).json({
              user: savedUser
            })
          })
          .catch((error: { message: any }) => {
            logging.error(error.message)

            return res.status(500).json({
              message: error.message
            })
          })
      } else {
        return res.status(401).json({
          message: 'NOT FOUND'
        })
      }
    })
    .catch((error) => {
      logging.error(error.message)

      return res.status(500).json({
        message: error.message
      })
    })
}

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Returning all Users data information ')

  User.find()
    .populate('name')
    .exec()
    .then((user) => {
      return res.status(200).json({
        count: user.length,
        user: user
      })
    })
    .catch((error) => {
      logging.error(error.message)

      return res.status(500).json({
        message: error.message
      })
    })
}

const deleteUserData = (req: Request, res: Response, next: NextFunction) => {
  logging.warn('Delete route called')

  const _id = req.params.userID

  User.findByIdAndDelete(_id)
    .exec()
    .then(() => {
      return res.status(201).json({
        message: 'User data deleted'
      })
    })
    .catch((error) => {
      logging.error(error.message)

      return res.status(500).json({
        message: error.message
      })
    })
}

export default {
  create,
  read,
  update,
  readAll,
  deleteUserData

}
