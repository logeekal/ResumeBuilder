const ProfileSchema = require("./profile").ProfileSchema;
const USER_COLLECTION = require("../config").USER_COLLECTION;
const mongoose = require("mongoose");

const { sha256, saltString } = require("../utils/crypto");

const status = {
  ACTIVE: "active",
  PENDING: "pending",
  INACTIVE: "inactive"
};

const saltLength = 10;

/**
 * @template    {UserSchema} defines the scnema for user that needs t
 *                           stored.
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: [status.ACTIVE, status.INACTIVE, status.PENDING],
    default: status.PENDING
  },
  profile: ProfileSchema,
  avatar: {
    type: String,
    required: false
  }
});

/**
 *
 * Defing the pre tag of the UserSchema.
 * We will need to calculate password hash before event
 */
UserSchema.pre("save", function(next) {
  //check if the document is new or a password has already been set

  if (this.isNew || this.isModified("password")) {
    console.log(`This is new entry`);
    const document = this;
    let { salt, hash } = sha256(document.password, saltString(saltLength));
    console.log(`hash is ${hash}`);
    document.password = hash;
    document.salt = salt;
    console.log(document);
    next();
  } else {
    console.log(`Not new.`);
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
  try {
    let { hash } = sha256(password, this.salt);
    if (hash === this.password) {
      console.log(`Password match`);
      callback(false, true);
    } else {
      console.log(`Password don't match`);
      callback(true, false);
    }
  } catch (err) {
    console.log(`Error in isCorrectPassword ${err}`);
    callback(err, "");
  }
};

const User = mongoose.model("User", UserSchema, USER_COLLECTION);

module.exports = { User };
