import express, { Request, Response } from "express";
import signup from "./signup";
import login from "./login";
import search from "./search";
var app = express();
app.use(express.json());
app.post("/signup", signup, function (req: Request, res: Response): void {
  console.log("signup completed");
  res.send("signup success");
});
app.post("/login", login, (req: Request, res: Response): void => {
  console.log("login completed");
});
app.get("/get", search, (req: Request, res: Response): void => {
  console.log("access granted");
});
app.listen(3000, () => {
  console.log("server listening");
});
