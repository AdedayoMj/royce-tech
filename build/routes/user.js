"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.get('/', user_1.default.readAll);
router.post('/create', user_1.default.create);
router.get('/read/:userID', user_1.default.read);
router.patch('/update/:userID', user_1.default.update);
router.delete('/:userID', user_1.default.deleteUserData);
module.exports = router;
//# sourceMappingURL=user.js.map