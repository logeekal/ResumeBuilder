const Image = require('../models/Images').Image;
const User = require('../models/users').User;
const withAuth = require('../middlewares').withAuth;
var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var path = require('path')

const IncomingForm = require('formidable').IncomingForm;

// const storage = multer.diskStorage({
//     destination : function(req, file, cb){
//         cb(null, '../images/') 
//     },
//     filename : function(req, file, cb){
//         console.log('Firing filename')
//         console.log(req.email);
//         console.log(file);
        
//         let userId  = User.findOne({email: req.email},{_id:1});
//         console.log(`User Id is ${userId}`);
//         cb(null, )
//     }
// })

// const upload =  multer({storage: storage});

const router = express.Router();


router.post('/avatar', withAuth,async (req, res, next)=>{
    var form = new IncomingForm();

    form.uploadDir = path.join(__dirname,'..','images');
    form.keepExtensions = true;
    let {_id}  = await User.findOne({email: req.email},{_id:1});
    
    let avatarPath ;

    form.on('file', async (field,file)=>{
        console.log('In form On event');
        if(field === 'avatar'){
            let newFileName = _id;
            avatarPath =  form.uploadDir + "/" + newFileName  + path.extname(file.path);
            fs.renameSync(file.path, avatarPath);
            // let image = {
            //     userId :  _id,
            //     type : field,
            //     contentType : file.type,
            //     data : fs.readFileSync(avatarPath)
            // }
            // console.log(image);
            // const result = await Image.updateOne({userId :  image.userId, type:image.type},{image},{upsert : true});
            // if(result.nModified > 0){
                
            // }
            
        }else{
            res.status(500);
            res.send("Field Name should be avatar")
        }
    })

    form.on('end',async ()=>{
        console.log(`Now updating avatar path in `)
        let absoluteAvatarPath = path.join(avatarPath);
        let relativeAvatarPath =  path.relative(__dirname, absoluteAvatarPath);
        console.log(relativeAvatarPath);
        let result = await User.updateOne({email: req.email},{avatar : relativeAvatarPath},{upsert:false});
        if(result.nModified > 0|| (result.nModified === 0 && result.n > 0)){
            res.status(200);
            res.sendFile(absoluteAvatarPath);
        }else{
            console.log('Nothing found in DB');
            res.sendStatus(500);
        }
       // console.log(absoluteAvatarPath);
    })

    form.parse(req);


    // console.log('In avatar path')
    // const file= req.file;
    // console.log(file);
})

module.exports = router;