const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwt_secret = "akshat";
var fetchuser = require("../middleware/fetchuser");
//CREATING USER
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "plz eter unique email" });
      }
      const salt = await bcrypt.genSalt(10);

      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      //.then(user => res.json(user)).catch(err=>{console.log(err); res.json({error:'Please enter unique'})})
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data, jwt_secret);
      success=true;
      // console.log(auth_token);
      res.json({ success,auth_token });
      //res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "cant be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success,error: "plz entert correct cred" });
      }
      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        
        return res.status(400).json({ success,error: "plz entert correct cred" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data, jwt_secret);
      success=true
      res.json({ success,auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

//GETTING USER DETAILS--LOGIN REQUIRED

router.post(
  "/userdetails",
  fetchuser,
  async (req, res) => {
    try {
      
      userid = req.user.id;
      const user = await User.findById(userid).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

module.exports = router;
