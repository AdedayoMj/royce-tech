import express from 'express'
import controller from '../controllers/user'

const router = express.Router()

router.get('/', controller.readAll)
router.post('/create', controller.create)
router.get('/read/:userID', controller.read)
router.patch('/update/:userID', controller.update)
router.delete('/:userID', controller.deleteUserData)

export = router;
