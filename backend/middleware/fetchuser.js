var jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "authenticate using correct auth token" });
  }
  try {
    const data = jwt.verify(token, "akshat");
    //console.log(data.user);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "plz authenticate using correct auth token" });
  }
};
module.exports = fetchuser;
