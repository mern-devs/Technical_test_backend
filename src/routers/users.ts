const express = require('express')
const router = new express.Router();
router.post("/users/login", async (req, res) => {
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