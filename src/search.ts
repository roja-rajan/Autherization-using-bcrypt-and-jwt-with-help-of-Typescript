import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
var secret_key: string | undefined = process.env.SECRET_KEY;
var app = express();
var search = (req: Request, res: Response, next: () => void): void => {
  var jwttoken: string | undefined = req.headers["authorization"];
  if (jwttoken !== undefined) {
    var tocken = jwttoken.split(" ")[1];
    if (secret_key !== undefined) {
      jwt.verify(tocken, secret_key, (err, data) => {
        if (err) {
          res.status(500).send("you can not access data");
        } else {
          res.send(data);
          next();
        }
      });
    }
  } else {
    res.status(500).send("no token");
  }
};
export = search;
