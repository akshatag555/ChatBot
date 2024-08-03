
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"
const Login =  () => {
    const [cred, setcred] = useState({email:"",password:""})
    let history=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
      
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:cred.email,password:cred.password})
          });
          const json=await response.json()
          if(json.success){
            localStorage.setItem('token',json.auth_token);
            history("/")
          }
          else{
            Alert("invalid")
          }
          //console.log(json)
    }
    const onChange=(e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
      }
  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={cred.email} name="email"  onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"  value={cred.password}  onChange={onChange} name="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
