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

      res.send({ 
        success: true,
        user: userObject 
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        error: error.message
      });
    }
  });

router.post("/users/register", async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      name
    } = req.body;
    const user = new User({
      email,
      password,
      name,
    });
    const result = await user.save();
    res.send({ 
      success: true,
      user: result 
    });
  } catch(error) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});
module.exports = router;