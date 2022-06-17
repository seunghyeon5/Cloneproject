const express = require('express');
const res = require('express/lib/response');
const Market = require("../models/market")
const router = express.router

//상품 등록하기

router.post("/market", authMiddleware, async() => {
    try {
        const { ImageUrl, title, price, content, count } = req.body;
        const createMarket = await Market.create({
            ImageUrl, title, price, content, count
        });
        res.json ({ result : true, msg : "상품등록이 완료되었습니다.", createMarket})
    } catch(err){
        res.json({ result : false, mag : "상품등록이 취소되었습니다." })
    }
});

//상품정보 조회

router.get("/market/:itemId", async (req, res) =>{
    const { itemId } = req.params;
 
    const item = await Post.find(itemId)

    res.json({ result: true, item });
 });
 
 
 //상품등록 수정
 
 router.put("/market/:itemId/modify", authMiddleware, async (req, res)=> {

     const user = res.locals.user;
     
     const {itemId} = req.params;
     // console.log(contentId);
     const {title, condition, exchange, price, content, count} = req.body;
     
    
     const existsItem = await Post.findById(itemId);
     
    
     if (existsItem.user !== user) {
         return res.status(400).json({existsPost, message: "판매자 정보가 일치하지 않습니다."
     });
         } else if (existsItem.user === user) {
            Market.findByIdAndUpdate( contentId , { $set: { title, condition, exchange, price, content, count, createAt }});
         }
         res.status(200).json({result:'success', errorMessage: "수정 성공",
         });
 
  });
 
 //상품 등록 삭제
 router.delete("/post/:contentId/delete", authMiddleware, async (req, res)=>{
     const { user } = res.locals.user;
     const { ItemId } = req.params;
 
     const existsItem = await Market.findById(ItemId);
     if (existsItem.user !== user) {
         return res.status(400).json({existsItem, message: "판매자 정보가 일치하지 않습니다."
     });
     } else {
 
     await Post.findByIdAndDelete(ItemId);
     }

     res.json({result:"success"});
 
 });
 
module.exports = router;