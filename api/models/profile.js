const PROFILE_COLLECTION = require("../config").PROFILE_COLLECTION;
const mongoose = require(`mongoose`);

/**
 *
 * @template    {ProfileSchema}     defines the schema for profiles that will be saved
 *                                  for each user.
 *
 */

 const genericSchema = new mongoose.Schema({

     count : {
       type: Number,
       required : true
     },
     visible: {
       type : Boolean,
       required : true
     },
     details : {
       type:Object,
       required : true
     }
   
 });


 genericSchema.pre('save', function(next){
   const document =  this;
   document.visible = true;
   console.log(`Making Visible as true for ${document.parent}`);
   next();
 })

 



// const ProfileSchema = new mongoose.Schema({
//   header:{

//     summary : {
//       type:String,
//       required : true,
//     }
//   },
//   personalInfo: {
//     name: {
//       type: String,
//       required: true
//     },
//     add1: {
//       type: String,
//       required: true
//     },
//     add2: {
//       type: String,
//       required: true
//     },
//     state: {
//       type: String,
//       required: true
//     },
//     country: {
//       type: String,
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     }
//   },
//   education: [
//     {
//       school: {
//         type: String,
//         required: true
//       },
//       qualification :{
//         type: String,
//         required: true
//       },
//       gpa :{
//         type:String,
//         required : true
//       },
//       courses :{
//         type:Array,
//         required : true
//       },
//       startDate :{
//         type:String,
//         required : true
//       },
//       endDate :{
//         type : String,
//         required :  true
//       }
//     }
//   ],
//   experience: [
//     {
//       title: {
//         type: String,
//         required: true
//       },
//       company :{
//         type: String,
//         required: true
//       },
//       highlights :{
//         type:Array,
//         required : true
//       },
//       startDate :{
//         type:String,
//         required : true
//       },
//       endDate :{
//         type : String,
//         required :  true
//       }
//     }
//   ],
//   otherDetails: {
//     skills: {
//         type: Array,
//         required: true
//       },
//       projects :{
//         type: Array,
//         required: true
//       },
//       languages :{
//         type:Array,
//         required : true
//       }
//     }
  
// });


const ProfileSchema  = new mongoose.Schema({
  personalInfo : genericSchema,
  header : genericSchema,
  education : genericSchema,
  experience :  genericSchema,
  otherDetails : genericSchema,
  social : genericSchema
});


ProfileSchema.pre('save', function(){
  console.log(`Pre-save for profile schema`);
})


module.exports = {ProfileSchema};
