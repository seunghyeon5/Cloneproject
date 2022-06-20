const express = require("express");
const User = require("../models/user");
const Like = require("../models/like");
const Market = require("../models/market");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware")
const bcrypt = require("bcrypt");
require("dotenv").config();


//회원가입 양식
const postUsersSchema = Joi.object({
  
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), //이메일 형식 'com','net'만 허용
    password: Joi.string().required().pattern(new RegExp('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$')), //최소6자, 하나 이상의 영문자, 하나의 숫자, 하나의 특수문자
    confirmpassword: Joi.string().required(),
    nickname: Joi.string().required(),
    userprofileUrl : Joi.string().required(),
  });

//회원가입
  router.post("/user/signup", async (req, res) => {

    try {
      const { email, password, confirmpassword, nickname, userprofileUrl} =
        await postUsersSchema.validateAsync(req.body);
        // console.log(req.body);
      
  
     if (password !== confirmpassword) {
        res.status(400).send({
          errorMesssage: "패스워드와 패스워드 확인란이 동일하지 않습니다.",
        });
        return;
      }
      // 이메일 중복확인 버튼
     const existEmail = await User.findOne({email});
    //  console.log("지나갑니다.")
    //  console.log(existId);
    if (existEmail) {
      return res.status(400).send({errorMesssage:"중복된 이메일이 존재합니다.",});
        
    } 
     // 닉네임 중복확인 버튼
     const existnicName = await User.findOne({nickname});
    //  console.log("지나갑니다아~")
     if(existnicName) {
      return res.status(400).send({ errorMessage: "중복된 닉네임이 존재합니다.", });
     }
        
    
   
      const users = new User({ nickname, password, email, userprofileUrl });
      await users.save();
      console.log(users)
      res.json({users,
        message : "회원가입에 성공하셨습니다!"
      });
    } catch (error) {
      res.status(400).send({
        errorMesssage: "요청한 데이터 형식이 올바르지 않습니다.",
        
      });
      // console.log(error)
    }
  });


  
// 로그인
  router.post("/user/login", async (req, res) => {

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
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {expiresIn: '2h',}); 
        res.status(200).send({ message: "로그인에 성공했습니다", token });
        console.log(token);
        console.log(user);
    });

// 로그인 인증

  router.get("/user/login/me", authMiddleware, async (req, res) => { 

    
   const{ user } =  res.locals;
   
   
   res.send({ userId: user.email, nickname: user.nickname, userInfo : user.userId});
   console.log(res.locals);
  });




  //마이페이지

  router.get('/user/mypage', authMiddleware, async (req, res) => {
   
  try {
    
      const {nickname, userprofileUrl, userInfo } = res.locals.user;
    //찜 목록  
      const mypage = await Like.find({nickname});
      const mylike = mypage.map((a) => ({
            itemId : a.itemId,}));
    //내가 등록한 상품
    
    const mypost = await Market.find({nickname});
      const mypostDNO = mypost.map((b) => ({
            itemId : b.itemId,}));
      // console.log(myitems)  userporfilUrl, profilInfo
      res.json({result:true, 
        mylike,
        mypostDNO,
        nickname,
        userInfo,
        userprofileUrl,
        });


   }catch(err){
      res.json({result:false});
   }

   });






  //마이페이지 정보수정 
  router.put('/user/mypage/:userId/modify', authMiddleware, async (req,res) =>{
  //  try{
     const {userId} = req.params;
     const { nickname, userInfo, userprofileUrl } = req.body; 

     const existnicName = await User.findOne({nickname});
    //  console.log("지나갑니다아~")
     if(existnicName) {
      return res.status(400).send({ errorMessage: "중복된 닉네임이 존재합니다.", });
     }

     const mypagemodifiy = await User.findByIdAndUpdate(userId, {$set : {nickname, userInfo, userprofileUrl}})
     console.log(mypagemodifiy);
     res.json({result : true, msg :"수정 완료", mypagemodifiy})
     
  //  }catch(err){
  //   res.json({result : false});

  //  }
   
    
  });

  module.exports = router;