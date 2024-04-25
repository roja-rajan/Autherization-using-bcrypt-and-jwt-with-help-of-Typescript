"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secret_key = process.env.SECRET_KEY;
var app = (0, express_1.default)();
var search = (req, res, next) => {
    var jwttoken = req.headers["authorization"];
    if (jwttoken !== undefined) {
        var tocken = jwttoken.split(" ")[1];
        if (secret_key !== undefined) {
            jsonwebtoken_1.default.verify(tocken, secret_key, (err, data) => {
                if (err) {
                    res.status(500).send("you can not access data");
                }
                else {
                    res.send(data);
                    next();
                }
            });
        }
    }
    else {
        res.status(500).send("no token");
    }
};
module.exports = search;
