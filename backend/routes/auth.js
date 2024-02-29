const express =require('express');
const User=require('../models/User');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt =require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="harryPotterisNiceBoy";


//ROUTE 1 create a User using :POST "/api/auth/createuser".No login requried
router.post('/createuser',[
  body('name','enter a valid name').isLength({min:3}),
  body('email','enter a valid email').isEmail(),
  body('password','password must be 5 char').isLength({min:5}),
] ,
async (req,res)=>{
  let success= false;
  //if there are errors return bad request and the errors
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
     return res.status(400).json({success, errors:errors.array()})
   }
   //check whether the user with this email exists already
   try{
  let user =await User.findOne({email:req.body.email });
  if(user){
    return res.status(400).json({success, error:"soryy a user with a email already exists"})
  }
  //bcryptjs use for generate hash code
  const salt= await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  //create a new user
  user= await User.create({
      name:req.body.name,
      email:req.body.email,
      password:secPass
   })
    //jwt ka use
    const data={
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    console.log(success, authtoken);

   // res.json(user)
   success=true;
    res.json({authtoken});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error route 1")
    } 
})

//ROUTE 2 Authenticate a User using :POST "/api/auth/login".No login requried
router.post('/login',[

  body('email','enter a valid email').isEmail(),
  body('password','password cant be blank').exists(),
] ,
async (req,res)=>{
  let success= false;
  //if there are errors return bad request and the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({success,errors:errors.array()})
  }

  const {email,password}=req.body;
try{
  let user =await User.findOne({email});
  if(!user){
    success= false;
    return res.status(400).json({error: 'plese try to login with corrrect credentials'});
  }
  const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success= false;
    return res.status(400).json({success, error: 'plese try to login with corrrect credentials'});
  }

  const data={
    user:{
      id:user.id
    }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  success= true;
  res.json({success, authtoken});
}
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error") 
}

})

//ROUTE 3 Get login User request using :POST "/api/auth/getuser".login requried
router.post('/getuser',fetchuser,[

  body('email','enter a valid email').isEmail(),
  body('password','password cant be blank').exists(),
] ,
async (req,res)=>{
try {
  userId=req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error") 
}
})
module.exports = router;