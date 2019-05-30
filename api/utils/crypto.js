const crypto = require("crypto");

/**
 * generates random string of characters i.e salt
 * @function
 * @param   {number}    length  - Length of the random string to be generated
 *
 */

const saltString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") //convert to hex format
    .slice(0, length);
};

/***
 * The resultant hash object
 * @typedef     {Object}    cryptoHashResult
 * @property    {string}    salt - Original salt provided
 * @property    {string}    text - Original text provided for hashing
 * @property    {string}    hash - Actual hash of the text provided.
 * 
 * hashing passwrd with sha256. return hash details with original inputs provided.
 * @function
 * @param  {string} textToHash   Main test that needs to hashed
 * @param  {string} salt   Randomly generated salt.
 * @param {...cryptoHashResult}  {@cryptoHashResult}
 *

 */

const sha256 = (textToHash, salt) => {
  //salt acts as a secret/private key for textToHash
  let hash = crypto.createHmac("sha256", salt);
  hash.update(textToHash);
  return {
    salt: salt,
    text: textToHash,
    hash: hash.digest("hex")
  };
};



module.exports = {
    saltString,
    sha256
}