const express=require("express");
const router=express.Router();
const {Property}=require('../models')



router.get('/',async(req,res)=>{
    const listOfProperty=await Property.findAll();
    
    res.send(listOfProperty);
    
})

router.post('/', async (req, res) => {
    
    let property = req.body;
     await Property.create(property);
    res.send(property);
});



router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);

        if(!property) { res.status(404).send('Property not found');}
       
        res.send(property);  
       
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports=router;