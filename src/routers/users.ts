const { transformUser } = require("../transform/users");
import { Request, Response } from 'express';
const express = require('express')
const router = new express.Router();
const User = require("../models/user");
router.post("/users/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const userObject = transformUser(user);

      res.send({ user: userObject });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: {
          message: "Email or password is not correct",
        },
      });
    }
  });
module.exports = router;