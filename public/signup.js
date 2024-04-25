"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("./user");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var signup = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var username = req.body.name;
            var hashpassword = yield bcrypt_1.default.hash(req.body.password, 10);
            var person = { "name": username, "password": hashpassword };
            user_1.user.push(person);
            next();
        }
        catch (error) {
            res.status(404).send("password error");
        }
    });
};
module.exports = signup;
