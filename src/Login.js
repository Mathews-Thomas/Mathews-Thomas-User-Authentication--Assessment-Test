import React, { useState } from 'react'
import axios, { Axios } from 'axios'
function Login() {
    const [email, setemail] =useState()
    const [password,setpassword] =useState()
const handlesubmit = async (e)=>{
    e.preventDefault()
    try {
        const responce = await axios.post('http://localhost:3004/login',{password,email})
    console.log(responce.data)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div style={{textAlign:'center'}}>
        <h1>Login</h1>
                <form>
                <div style={{padding:'10px'}}><label>email:</label> <input onChange={(e)=>setemail(e.target.value)} style={{padding:'5px'}}></input></div>
                 <div style={{padding:'10px'}}><label>password:</label> <input onChange={(e)=>setpassword(e.target.value)} style={{padding:'5px'}}></input></div>
                 <div style={{padding:'10px'}}><button type='submit' onClick={handlesubmit} style={{padding:'5px',background:'Green'}}></button></div>
                </form>
    </div>
  )
}

export default Login