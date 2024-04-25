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
const user_1 = require("./user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secret_key = process.env.SECRET_KEY;
var app = (0, express_1.default)();
var login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var people = user_1.user.find((user) => user.name === req.body.name);
            if (!req.body.name || people == undefined) {
                res.status(500).send("no such user");
            }
            else {
                if (!(yield bcrypt_1.default.compare(req.body.password, people.password))) {
                    res.status(500).send("incorrect password");
                }
                else {
                    console.log(`user name is ${req.body.name}`);
                    if (secret_key == undefined) {
                        res.status(500).send("secret key empty");
                    }
                    else {
                        var tocken = jsonwebtoken_1.default.sign(people, secret_key, {
                            expiresIn: "1m",
                        });
                        res.json({ tocken: tocken });
                        next();
                    }
                }
            }
        }
        catch (error) {
            res.status(500).send("login not success");
        }
    });
};
module.exports = login;
