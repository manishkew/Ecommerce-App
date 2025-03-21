import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import  "../../styles/AuthStyle.css";


const Register = () => {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [Phone,setPhone] = useState()
  const [address,setAddress] = useState()
  const [answer,setAns] = useState()
  const navigate = useNavigate()
//form function
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const res = await axios.post('/api/v1/auth/register',{name,email,password,Phone,address,answer})
        if(res.data.success){
          toast.success(res.data.message)
          navigate('/login')
        }else{
          toast.error(res.data.message)
        }
    }catch(error){
      console.log(error)
      toast.error('Error in Register')
    }
  }
  console.log(process.env.REACT_APP_API,'||||||');
  
  return (
    <Layout title={"register page"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">Register Form</h4>
          <div className="mb-3">
            <input
              type="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="answer"
              value={answer}
              onChange = {(e)=>setAns(e.target.value)}
              className="form-control"
              id="exampleInputaddress1"
              aria-describedby="emailHelp"
              placeholder="What is Your Favourite Sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
