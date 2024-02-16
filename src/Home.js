import axios from 'axios'
import React, { useState } from 'react'

function Home() {
    const [username,setusername] =useState()
    const [email,setemail] =useState()
    const [password,setpassword] =useState()

// axois connection

const handlesubmit = async(e)=>{
    e.preventDefault()
        try {
            const responce = await axios.post('http://localhost:3004/register',{username,password,email})
        alert(responce.data)
        } catch (error) {
            console.log(error)
        }
}

  return (
    <div style={{textAlign:'center',padding:'10px'}}>
        <h1>User Registration</h1>
        <div >
            <form>
                <div style={{padding:'10px'}}><label>User Name:</label> <input onChange={(e)=>setusername(e.target.value)} style={{padding:'5px'}}></input></div>
                <div style={{padding:'10px'}}><label>User Email:</label> <input onChange={(e)=>setemail(e.target.value)} style={{padding:'5px'}}></input></div>
<div style={{padding:'10px'}}><label>Password:</label> <input onChange={(e)=> setpassword(e.target.value)} style={{padding:'5px'}}></input></div>
                <div><button type='submit' onClick={handlesubmit} style={{padding:'5px',background:'red'}}>Register </button></div>

            </form>
        </div>
    </div>
  )
}

export default Home