const jwt = require("jsonwebtoken");
const config = require("config");

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user: {
        id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          reject("Token could not be generated");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
