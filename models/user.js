const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const UsersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  owned_forms: {type: Array, required: false},
  borrowed_forms: {type: Array, required: false}
});

UsersSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======')
    next()
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password)
    next()
  }
})

UsersSchema.methods.hashPassword = function(userPassword) {
  return bcrypt.hashSync(userPassword, 10)
};

UsersSchema.methods.validPassword = function(userPassword) {
  return bcrypt.compareSync(userPassword, this.password);
};

const User = mongoose.model("User", UsersSchema);


module.exports = User
