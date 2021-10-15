import express from 'express'
import controller from '../controllers/user'
import extractJWT from '../middleware/extractJWT';

const router = express.Router()

router.get('/validate', extractJWT, controller.validateToken);
router.post('/login', controller.loginUser)
router.post('/register', controller.registerUser)
router.get('/read/:userID', controller.read)
router.patch('/update/:userID',extractJWT, controller.update)
router.delete('/:userID',extractJWT, controller.deleteUserData)
router.get('/getall', controller.readAll)

export = router;
