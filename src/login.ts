import express, { Request, Response } from "express";
import { user, User } from "./user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
var secret_key: string | undefined = process.env.SECRET_KEY;
var app = express();
var login = async function (req: Request, res: Response, next: () => void) {
  try {
    var people: User | undefined = user.find(
      (user: User) => user.name === req.body.name
    );
    if (!req.body.name || people == undefined) {
      res.status(500).send("no such user");
    } else {
      if (!(await bcrypt.compare(req.body.password, people.password))) {
        res.status(500).send("incorrect password");
      } else {
        console.log(`user name is ${req.body.name}`);
        if (secret_key == undefined) {
          res.status(500).send("secret key empty");
        } else {
          var tocken: string = jwt.sign(people, secret_key, {
            expiresIn: "1m",
          });
          res.json({ tocken: tocken });
          next();
        }
      }
    }
  } catch (error) {
    res.status(500).send("login not success");
  }
};

export = login;
