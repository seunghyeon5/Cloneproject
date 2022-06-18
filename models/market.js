const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema(
    {
        ImageUrl : {
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
            type : String,
            required:true,
            trim : true

        },

        exchange : {
            type : String,
            required:true,
            trim : true

        },

        price : {
            type : Number,
            required:true,
            trim : true

        },

        content : {
            type : String,
            required:true,
            trim : true

        },

        count : {
            type : Number,
            required:true,
            trim : true

        },

        userId : {
            type : String,
            required:true
        }
},
);


MarketSchema.virtual("itemId").get(function () {
    return this._id.toHexString();
});
MarketSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model('Market', MarketSchema);