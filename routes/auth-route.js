const router= require('express').Router();
const User = require('../models/user')
const bcrypt= require("bcrypt");
const jwt =require("jsonwebtoken")
const checkAuth = require('../middleware/check-auth');
router.post("/signup",(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.json({success:flase,message:"hashing error"})
        }else{
            const user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password:hash
            })
            user.save().then((_)=>{
                res.json({success:true,message:"account has been created"})
            })
            .catch((err)=>{
                if (err.code==11000){
                    return(res.json({success:false,message:"email already exist"}))
                }
            res.json({success:false,message:"signup error"})
            })
        }
    })
})

router.post("/login",(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then((result)=>{
        if(result.length < 1){
            return res.json({success:false,message:"User not found"})
        }
        const user = result[0];
        bcrypt.compare(req.body.password,user.password,(err,ret)=>{
            if(ret){
                const payload ={
                    userId:user._id
                }
                const token =jwt.sign(payload,'uttkarshKey');
             
                return res.json({success:true,message:"Login Successful", token:token})

            }else{
                return res.json({success:false,message:"password do not match"})
            }
        })
    }).catch(err=>{
        res.json({success:false,message:"Auth failsed"})
    })
})
router.get('/profile', checkAuth, (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .exec()
        .then((result) => {
            res.json({success:true, data:result})
        }).catch(err => {
            res.json({success: false, message: "server error"})
        })
})


module.exports=router



