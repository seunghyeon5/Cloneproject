const express = require("express");
const User = require("../models/user");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const authMiddelware = require("../middlewares/auth-middleware")
const bcrypt = require("bcrypt");



//회원가입 양식
const postUsersSchema = Joi.object({
    email: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]+@+[0-9a-zA-Z-.]{3,30}$')), //이메일 형식 'com','net'만 허용
    password: Joi.string().required().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$')), //최소6자, 하나 이상의 영문자, 하나의 숫자, 하나의 특수문자
    confirmpassword: Joi.string().required(),
    nickname: Joi.string().required(),
  });


  router.post("/user/signup", async (req, res) => {//회원가입

    try {
      const { email, password, confirmpassword, nickname} =
        await postUsersSchema.validateAsync(req.body);
        console.log(req.body);
      
  
     if (password !== confirmpassword) {
        res.status(400).send({
          errorMesssage: "패스워드와 패스워드 확인란이 동일하지 않습니다.",
        });
        return;
      }




      const existUsers = await User.find({ 
        $or:[{email}, {nickname}]
        
    });
    console.log(email, nickname);
    if (existUsers.length) {
        res.status(400).send({
            errorMesssage:"중복된 닉네임, 또는 이메일이 존재합니다."
        });
        return;
    }
  

    //  const existemail = await User.find({ email  });
    
    // // if (existemail.length) {
    // //     res.status(400).send({
    // //         errorMesssage:"중복된 닉네임, 또는 이메일이 존재합니다."
    // //     });
    // //     return;
    // // } else {
    // //     res.status(200).send({
    // //         message : "사용가능한 이메일 입니다."
    // //     })
    // // }
    // //    const existnickname = await User.find({nickname});
    // // if (existnickname.length) {
    // //     res.status(400).send({
    // //         errorMessage:"중복된 닉네임이 존재합니다."
    // //     });
    // //     return;
    // // }
  
      const users = new User({ nickname, password, email });
      await users.save();
      console.log(users)
      res.status(201).send({
        message : "회원가입에 성공하셨습니다!"
      });
    } catch (error) {
      res.status(400).send({
        errorMesssage: "요청한 데이터 형식이 올바르지 않습니다.",
        
      });
      // console.log(error)
    }
  });

  // const postAuthSchema = Joi.object({ //로그인
  //   email: Joi.string().required(),//로그인 이메일 형식
  //   password: Joi.string().required(),//최소 8자, 하나 이상의 문자, 하나의 숫자, 하나의 특수문자
  // });
  

  router.post("/user/login", async (req, res) => {//로그인

        const {email, password} = req.body;
        
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(400).send({
                errorMessage: '이메일 또는 패스워드를 확인해주세요.',
            });
            return;
        }
        const confirmpassword = await bcrypt.compare(password, user.password);
        if (!confirmpassword) {
          return res.status(400).send({errorMessage :"이메일 또는 패스워드를 확인해주세요."})
        }

        // const id = user.userId;
        const token = jwt.sign({ userId: user.userId }, "ligthing-secret-key"); 
        res.status(200).send({ message: "로그인에 성공했습니다", token });
        console.log(token);
        console.log(user);
    });

  router.get("/user/login/me", authMiddelware, async (req, res) => { //로그인 조회

    
   const{ user } =  res.locals;
   
   res.send({ userId: user.email, nickname: user.nickname});
    
  });

  module.exports = router;