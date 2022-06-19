const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({    
    //email 도 unique 한 값이기 때문에 email을 쓰려고 했으나 개발자 도구에서 payload에 email이 노출되는것은 안좋다고 생각하여 다시변경
    nickname: {
        type: String,
        required : true,
    },
    itemId: {
        type: String,
        required: true,
    }
},
    //{ timestamps: true } 좋아요에 필요한가 의문
);
LikeSchema.virtual('likeId').get(function () {
    return this._id.toHexString();
    });
LikeSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('Like', LikeSchema);