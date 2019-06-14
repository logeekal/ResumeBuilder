const DUPLICATE = require("../config").DUPLICATE;

/***
 *
 * @param   {string}    errorMessage    Original message forwarded by Mongoose/Mongo
 *
 * @returns {boolean/string}    if error is not even a MongoError, returns False, error returns the meaning. If meaning is not known, returns error message as it is.
 */

function resolveMongoError(errorMessage) {
  console.log(errorMessage);
  if (typeof errorMessage === Object) {
    if (errorMessage.name !== "MongoError") {
      return false;
    } else if (errorMessage.code === 11000) {
        return DUPLICATE;
    }
  }
}

module.exports = { resolveMongoError };
