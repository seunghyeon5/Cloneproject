const express = require('express');
const Market = require("../models/market")
const User = require("../models/user");
const moment = require("moment");
const authMiddleware = require("../middlewares/auth-middleware")
const router = express.Router()

//time ago 상품 등록으로 부터 지난 시간 구해주는 함수
function timeSince(date) {

    let seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + "년 전";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "달 전";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "일 전";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "시간 전";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "분 전";
    }
    return Math.floor(seconds) + "초 전";
  }

//상품 등록하기

router.post("/", authMiddleware, async(req, res) => {
    try {
        const { nickname } = res.locals.user;
        const { ImageUrl, title, price, content, count, condition, exchange} = req.body;
        const createMarket = await Market.create({
            ImageUrl, title, price, content, count, condition, exchange, nickname
        });
        //res.json ({ result : true, msg : "상품등록이 완료되었습니다.", createMarket}) //test 출력
        res.json ({ result : true, msg : "상품등록이 완료되었습니다."});
   }catch(err){
        res.json({ result : false, mag : "상품등록이 취소되었습니다." })
        // console.log(err)
    }
});

//상품 전체 목록 조회 
router.get("/list", async(req, res) =>{      
    try {
        const Items = await Market.find().sort({createdAt :'desc'});    
        res.json({
            Items : Items.map((a) => ({
            ImageUrl : a.ImageUrl,
            title : a.title,
            price : a.price,
            createdAt : timeSince(a.createdAt),
            itemId : a.itemId,        
            })),           
        });       
    }catch(err){
       res.json({ result : false })
        console.log(err)
    }
   
});

// 상품 검색 조회 API
router.get("/:search/:sort",  async(req, res) => {
    try{
        const {search,sort} = req.params;
        //const {type}=req.query;
       // console.log(search,sort);                      

        if(sort==="default"){
            findAllitem = await Market.find( 
                { $or: [{'title': { '$regex': search, '$options': 'i' } },
                        {'content': { '$regex': search, '$options': 'i' } }
          ]}).exec();    
        }else if(sort==="time"){
            findAllitem = await Market.find( 
                { $or: [{'title': { '$regex': search, '$options': 'i' } },
                        {'content': { '$regex': search, '$options': 'i' } }
          ]})
          .sort({ createdAt: 'desc' }).exec(); // 최신순 정렬   
        }else if(sort==="d_price"){
            findAllitem = await Market.find( 
                { $or: [{'title': { '$regex': search, '$options': 'i' } },
                        {'content': { '$regex': search, '$options': 'i' } }
          ]})
          .sort({ price: 'desc' }).exec(); // 가격 고가순  
        }else if(sort==="a_price"){
            findAllitem = await Market.find( 
                { $or: [{'title': { '$regex': search, '$options': 'i' } },
                        {'content': { '$regex': search, '$options': 'i' } }
          ]})
          .sort({ price: 'asc' }).exec(); // 가격 저가순   
        }         
        //res.send({findAllitem}) //test출력
        
        res.json({
            findAllitem : findAllitem.map((a) => ({
            ImageUrl : a.ImageUrl,
            title : a.title,
            price : a.price,
            createdAt : timeSince(a.createdAt),
            
            }))
        });
        
       
    }catch(err){
        res.json({ result: false})
        // console.log(err)
    }
})

//상품정보 상세조회

router.get("/:itemId", async (req, res) =>{
    try {
        const { itemId } = req.params;
        const item = await Market.findById(itemId);
        const period = timeSince(item.createdAt);        
        res.json({  item ,period:period})            
    }catch(err){
       res.json({ result : false })
        console.log(err)
    }
 });
 
 
 //상품등록 수정
 
 router.put("/:itemId/modify", authMiddleware, async (req, res)=> {

    try{
        const { userId } = res.locals.user;
        const { itemId } = req.params;
        const {title, condition, exchange, price, content, count} = req.body;
        const existsItem = await Market.findById(itemId);
        if (existsItem.userId !== userId) {
            return res.status(400).json({existsPost, message: "판매자 정보가 일치하지 않습니다."});
        } else if (existsItem.userId === userId) {
            Market.findByIdAndUpdate( itemId , { $set: { title, condition, exchange, price, content, count }});
        }
            res.json({result: true, msg: "수정 완료"});
    }catch(err){
        res.json({ result : false })
        // console.log(err)
    }
  });
 
 //상품 등록 삭제
 router.delete("/:itemId/delete", authMiddleware, async (req, res)=>{
    
    try{
        const { userId } = res.locals.user;
        const { itemId } = req.params;
        const existsItem = await Market.findById(itemId);
        if (existsItem.userId !== userId) {
            return res.status(400).json({existsItem, message: "판매자 정보가 일치하지 않습니다."});
        } else {
            await Market.findByIdAndDelete(itemId);
        }
        res.json({ result: true, msg: "삭제 완료" });
    }catch(err){
        res.json({ result: false })
        // console.log(err)
    }
 });
 
module.exports = router;