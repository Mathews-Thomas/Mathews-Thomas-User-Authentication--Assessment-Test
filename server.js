 const express = require('express')
 const bcrypt =require('bcrypt')
 const jwt = require('jsonwebtoken')
 const bodyparser =require('body-parser')
 const dotenv = require('dotenv').config()
 const mongoose = require('mongoose')
const app = express()
// port
const port =  3004
app.use(bodyparser.json())
// mongodbconnection
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// userschema
const userschema = new mongoose.Schema(
    {
        username: {type: String , required : true},
        email: {type: String , required : true},
        password: {type: String , required : true}
    }
)

const User =mongoose.model('User',userschema)

// User Registion 
app.post('/register', async (req,res)=>{
    const {username,password ,email} =req.body
  if(!username || !email || !password){
    return res.status(400).json({error :"all fields are required"})
  }
  if(!email)
  {
    return res.status(400).json({error:"invlid email format"})
  }
  if(password.length <6)
  {
    return res.status(400).json({error:"password should be 6 charaters long"})
  }
  const hashedpassword =await bcrypt.hash(password,10)
  const newUser = new User(
    {
        username,email,password :hashedpassword
    }
  )
  newUser.save()
  return res.status(201).json({message:"registration successfull"})
})
// user login
app.post('/login', async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user || !(await bcrypt.compare(password,user.password)))
    {
        return res.status(401).json({error:'invalid user'})
    }
    const token = jwt.sign({userId :user._id, email: user.email},'key',{expiresIn:'1h'})
    return res.status(200).json({token})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
