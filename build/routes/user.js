"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = express_1.default.Router();
router.get('/validate', extractJWT_1.default, user_1.default.validateToken);
router.post('/login', user_1.default.loginUser);
router.post('/register', user_1.default.registerUser);
router.get('/findUser/:userID', extractJWT_1.default, user_1.default.read);
router.patch('/updateUser/:userID', extractJWT_1.default, user_1.default.update);
router.delete('/deleteUser/:userID', extractJWT_1.default, user_1.default.deleteUserData);
router.get('/', user_1.default.readAll);
module.exports = router;
//# sourceMappingURL=user.js.map