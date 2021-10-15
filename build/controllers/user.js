"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NAMESPACE = 'Users';
const validateToken = (req, res, next) => {
    logging_1.default.info(NAMESPACE, 'Token validated, user authorized.');
    return res.status(200).json({
        message: 'Token(s) validated'
    });
};
const registerUser = (req, res, next) => {
    logging_1.default.info('Attempting to create user ...');
    let { name, dob, address, description, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }
    });
    const _user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        dob,
        address,
        description,
    });
    return _user
        .save()
        .then((newUser) => {
        logging_1.default.info('New user  info created');
        return res.status(201).json({ user: newUser });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const login = (req, res, next) => {
};
const read = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming read for user data with id ${_id}`);
    user_1.default.findById(_id)
        .populate('name')
        .exec()
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(404).json({
                error: 'Information not found.'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            error: error.message
        });
    });
};
const update = (req, res, next) => {
    logging_1.default.info('Update route called');
    const _id = req.params.userID;
    user_1.default.findById(_id)
        .exec()
        .then((user) => {
        if (user) {
            user.set(req.body);
            user.save()
                .then((savedUser) => {
                logging_1.default.info(`User with id ${_id} updated`);
                return res.status(201).json({
                    user: savedUser
                });
            })
                .catch((error) => {
                logging_1.default.error(error.message);
                return res.status(500).json({
                    message: error.message
                });
            });
        }
        else {
            return res.status(401).json({
                message: 'NOT FOUND'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info('Returning all Users data information ');
    user_1.default.find()
        .populate('name')
        .exec()
        .then((user) => {
        return res.status(200).json({
            count: user.length,
            user: user
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const deleteUserData = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.userID;
    user_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'User data deleted'
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
exports.default = {
    validateToken,
    registerUser,
    read,
    update,
    readAll,
    deleteUserData
};
//# sourceMappingURL=user.js.map