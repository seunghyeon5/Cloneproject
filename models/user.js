//회원정보(user) Schema
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 8;


const UserSchema = new mongoose.Schema({
  
    email: {
        type: String,
        unique : true,
    },

    password: {
        type: String,
        required: true,
    },

    nickname: {
        type: String,
        required: true,
    }
});


//비밀번호 암호화
UserSchema.pre("save", function (next) {
    const user = this;
  
    // user가 password를 바꿀때만 hashing 비밀번호 변경은 구현 못함 ㅠㅠ
    if (user.isModified("password")) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          return next(err);
        }
  
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err)
          }
          user.password = hash
          next()
        })
      })
    }
});

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
  });
  UserSchema.set('toJSON', {
    virtuals: true,
  });



module.exports = mongoose.model('User', UserSchema);