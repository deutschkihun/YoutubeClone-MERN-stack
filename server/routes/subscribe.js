const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");



router.post("/subscribeNumber",(req,res) =>{
    Subscriber.find( {userTo:req.body.userTo})
        .exec((err,subscribe) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, subscribeNumber:subscribe.length})
            // subscribe.length = numbe of subscriber 
        })
})




router.post("/subscribed",(req,res) =>{
    Subscriber.find( {userTo:req.body.userTo,userForm:req.body.userForm})
        .exec((err,subscribe) => {
            if(err) return res.status(400).send(err)
            let result = false
            if(subscribe.length !==0){
                result = true
                return res.status(200).json({success:true, subscribed : result})
            }
            // subscribe.length = numbe of subscriber 
        })
})


router.post("/unSubscribe",(req,res) =>{
    
    Subscriber.findOneAndDelete({userTo:req.body.userTo,userForm:req.body.userForm})
        .exec((err,doc) => {
            if(err) res.status(400).json({success:false,err})
            return res.status(200).json({success:true,doc})
        })
})


router.post("/addSubscribe",(req,res) =>{
    
    const subscribe = new Subscriber(req.body)
    subscribe.save((err,doc) =>{
        if(err) res.status(400).json({success:false,err})
        return res.status(200).json({success:true})
    })
})


module.exports = router;
