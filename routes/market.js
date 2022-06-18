const express = require('express');
const Market = require("../models/market")
const moment = require("moment");
const authMiddleware = require("../middlewares/auth-middleware")
const router = express.Router()

//상품 등록하기

router.post("/market", authMiddleware, async(req, res) => {
    try {
        const { userId } = res.locals.user;
        const { ImageUrl, title, price, content, count, condition, exchange} = req.body;
        const createMarket = await Market.create({
            ImageUrl, title, price, content, count, condition, exchange, userId,
        });
        //res.json ({ result : true, msg : "상품등록이 완료되었습니다.", createMarket}) //test 출력
        res.json ({ result : true, msg : "상품등록이 완료되었습니다."});
    }catch(err){
        res.json({ result : false, mag : "상품등록이 취소되었습니다." })
        // console.log(err)
    }
});

//검색 상품 목록 조회 
router.get("/market/list", async(req, res) =>{
    const Items = await Market.find().sort({createdAt :'desc'});
    
    
    
    
    res.send({
        Items : Items.map((a) => ({
        ImageUrl : a.ImageUrl,
        title : a.title,
        price : a.price,
        createdAt : a.createdAt.toLocaleTimeString('ko-KR'),
        })),
        

    });

});



// 상품 검색 조회 API
router.get("/market/:search/:sort",  async(req, res) => {
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
            createdAt : a.createdAt.toLocaleDateString('ko-KR')+a.createdAt.toLocaleTimeString('ko-KR'),
            }))
        });
        
       
    }catch(err){
        res.json({ result: false})
        // console.log(err)
    }
})

//상품정보 상세조회

router.get("/market/:itemId", async (req, res) =>{
    try {
        const { itemId } = req.params;
        const item = await Market.findOne({itemId})

        res.json({ result: true, item });
    }catch(err){
        res.json({ result : false })
        // console.log(err)
    }
 });
 
 
 //상품등록 수정
 
 router.put("/market/:itemId/modify", authMiddleware, async (req, res)=> {

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
 router.delete("/market/:itemId/delete", authMiddleware, async (req, res)=>{
    
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