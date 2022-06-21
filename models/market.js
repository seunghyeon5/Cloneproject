const mongoose = require('mongoose');
const moment = require("moment");
const MarketSchema = new mongoose.Schema(
    {
        imageUrl : {
            type : String,
            required:true,
            trim : true

        },
        
        title : {
            type : String,
            required:true,
            trim : true

        },

        condition : {
            type : Boolean,
            required:true,
            trim : true

        },

        exchange : {
            type : Boolean,
            required:true,
            trim : true

        },

        price : {
            type : String,
            required:true,
            trim : true

        },

        content : {
            type : String,
            required:true,
            trim : true

        },

        location : {
            type : String,

        },

        count : {
            type : Number,
            required:true,
            trim : true

        },

       

        nickname : String,
        
},
    {timestamps:true},
);


MarketSchema.virtual("itemId").get(function () {
    return this._id.toHexString();
});
MarketSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model('Market', MarketSchema);