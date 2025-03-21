import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryfrom from "../../components/forms/Categoryfrom";
import {Modal} from 'antd'

const CreateCategory = () => {
  const [category, setcategories] = useState([]);
  const [name,setName] = useState('')
  const [visible,setVisible] = useState('')
  const [selected,setSelcted]= useState('')
  const [updateName,setUpdateName] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/category/create-category',{name})
      if(data.success){
        toast.success(`${data.name} is created successfully`)
        getAllcategories()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/getAll-categories`);
      if (data.success) {
        setcategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllcategories();
  }, []);
  const handleUpdate =async(e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updateName}) 
          if(data.success){
            toast.success(`${updateName} is Updated`)
            setSelcted(null)
            setUpdateName("")
            setVisible(false)
            getAllcategories()
          }else{
            toast.error(data.message)
          }
    }catch(error){
       toast.error('something went wrong')
    }

  }
  const handleDelete =async(pid)=>{
    try{
        const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`) 
          if(data.success){
            toast.success(`Category is Deleted`)
           getAllcategories()
          }else{
            toast.error(data.message)
          }
    }catch(error){
       toast.error('something went wrong')
    }

  }
  return (
    <Layout title={"CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <Categoryfrom
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <>
                      <tr>
                        <td key={c.id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdateName(c.name);setSelcted(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
              <Categoryfrom value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
