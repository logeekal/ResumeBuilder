const IMAGE_COLLECTION = require('../config').IMAGE_COLLECTION;
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
   type: {
        type: String,
        required: true
    },
    data :{
        type : Buffer,
        required : true
    },
    contentType :{
        type : String,
        required : true
    }
}, {
    timestamps:true
});

ImageSchema.index({userId:1, type:1},{unique : true});

const Image = mongoose.model("Image", ImageSchema,IMAGE_COLLECTION);

module.exports = {Image};