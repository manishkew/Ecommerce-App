import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../components/context/auth'

const Profile = () => {
    //context
  const [auth,setAuth] = useAuth()
  const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [Phone,setPhone] = useState()
    const [address,setAddress] = useState()
//get user data
    useEffect(()=>{
     const {name,email,Phone,address,password} = auth.user
     setName(name)
     setEmail(email)
     setPhone(Phone)
     setAddress(address)
     setPassword(password)
    },[auth?.user])
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
          const {data} = await axios.put('/api/v1/auth/profile',{name,email,password,Phone,address})
          if(data.error){
            toast.error(data.error)
          }else{
            setAuth({...auth,user:data?.updatedUser})
           let ls = localStorage.getItem("auth")
           ls = JSON.parse(ls)
           ls.user = data.updatedUser
           localStorage.setItem("auth",JSON.stringify(ls))
           toast.success('Profile Updated Successfully')
          }
      }catch(error){
        console.log(error)
        toast.error('Error in Register')
      }
    }
  return (
    <Layout>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
              <div className='col-md-3'>
                  <UserMenu/>
                </div>
                <div className='col-md-9'>
                <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">User Profile</h4>
          <div className="mb-3">
            <input
              type="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
            />
          </div>
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
              disabled
            />
          </div>
          <div className="mb-3">
           
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="mb-3">
          <input
              type="phone"
              value={Phone}
              onChange={(e)=>setPhone(e.target.value )}
              className="form-control"
              id="exampleInputphone1"
              aria-describedby="emailHelp"
              placeholder="Enter Your phone"
            />
          </div>
          <div className="mb-3">
            <input
              type="address"
              value={address}
              onChange = {(e)=>setAddress(e.target.value)}
              className="form-control"
              id="exampleInputaddress1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Address"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile