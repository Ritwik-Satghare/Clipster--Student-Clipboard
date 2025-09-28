const bcrypt = require("bcrypt");

const passwordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        });
      }
    });
  });
};

const comparePass = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  passwordHash,
  comparePass,
};
