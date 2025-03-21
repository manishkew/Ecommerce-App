import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setcategories] = useState([]);
  const [photo, setphoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate()
  //getAllcategory
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/getAll-categories`, {
        name,
      });
      if (data?.success) {
        setcategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong in getting category`);
    }
  };

  //useEffect
  useEffect(() => {
    getAllcategory();
  }, []);

  const handleCreate = async(e) =>{
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("category",category)

     const {data} = await axios.post(`/api/v1/product/create-product`,productData)
     if(data.success){
      toast.success(`product Created Sucessfully`)
      navigate('/dashboard/admin/products')
     }else{
      toast.error(data?.message)
     }
    }catch(error){
      console.log(error);
      toast.error('something went wrong')
    }

  }
  return (
    <Layout title={"Dashboaerd-CreateProduct"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                borederd={false}
                placeholder="Select category"
                size="large"
                showSearch
                className="from-select-mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setphoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <textarea
                type="textarea"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Product Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="form-control"
                showSearch
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
