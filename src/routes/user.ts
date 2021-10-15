import express from 'express'
import controller from '../controllers/user'
import extractJWT from '../middleware/extractJWT';

const router = express.Router()

router.get('/validate', extractJWT, controller.validateToken);
router.post('/login', controller.loginUser)
router.post('/register', controller.registerUser)
router.get('/findUser/:userID', extractJWT, controller.read)
router.patch('/updateUser/:userID', extractJWT, controller.update)
router.delete('/deleteUser/:userID', extractJWT, controller.deleteUserData)
router.get('/', controller.readAll)

export = router;
