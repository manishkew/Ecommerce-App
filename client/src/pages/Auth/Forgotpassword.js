import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {  useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
const Forgotpassword = () => {
    const [email,setEmail] = useState("")
      const [newPassword,setNewPassword] = useState("")
      const [answer,setAnswer] = useState("")
      const navigate = useNavigate()

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('/api/v1/auth/forget-password',{email,newPassword,answer})
            if(res && res.data.success){
            toast.success(res.data.message)
           
            navigate("/login")
          }else{
            toast.error(res.data.messages)
          }
        }catch(error){
            toast.error('Registration Failed')
            console.log(error.response.data.message)
        }
      }
      
 
  return (
    <Layout title={'Forgot-Password'}>
     <div className="form-container">
            <form onSubmit={handleSubmit}>
            <h4 className="title">Reset Password</h4>
              <div className="mb-3">    
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value )}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-3">    
                <input
                  type="text"
                  value={answer}
                  onChange={(e)=>setAnswer(e.target.value )}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Favourite Sport"
                  required
                />
              </div>
              <div className="mb-3">
               
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your New Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </form>
          </div>
    </Layout>
  )
}

export default Forgotpassword