"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./signup"));
const login_1 = __importDefault(require("./login"));
const search_1 = __importDefault(require("./search"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", signup_1.default, function (req, res) {
    console.log("signup completed");
    res.send("signup success");
});
app.post("/login", login_1.default, (req, res) => {
    console.log("login completed");
});
app.get("/get", search_1.default, (req, res) => {
    console.log("access granted");
});
app.listen(3000, () => {
    console.log("server listening");
});
