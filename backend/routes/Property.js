const express=require("express");
const router=express.Router();
const {Property}=require('../models')



router.get('/',async(req,res)=>{
    const listOfProperty=await Property.findAll();
    const list = await Property.
    res.json(listOfProperty);
    
})

router.post('/', async (req, res) => {
    
    let property = req.body;
     await Property.create(property);
    res.send(property);
});


module.exports=router;