const CustomAPIError = require("../errors/custom-error");
// jwt token sign has three components payload,jwt secret and options
const jwt = require("jsonwebtoken");
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(`no token provided`, 401);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const luckynumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decode.username}`,
      secret: `your secret lucky number is ${luckynumber}`,
    });
  } catch (error) {
    throw new CustomAPIError(`invalid user`, 401); // 401 is the response of unauthorized request
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username} and password: ${password}`);
  if (!username || !password) {
    throw new CustomAPIError("Please provide username or password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token);
  res.status(200).json({ msg: `user created`, token: token });
  //res.status(200).json({ msg: `sahi toh chal raha bey` });
};
module.exports = {
  dashboard,
  login,
};
