import React,{useState,useEffect} from 'react'
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [categories, setcategories] = useState([]);
  const [photo, setphoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id,setId] = useState("")
  
  //get Single Product
  const getSingleProduct = async()=>{    
    try{
       const{data} = await axios.get(`/api/v1/product/getsingle-product/${params.slug}`)
      setName(data.singleProduct.name);
      setId(data.singleProduct._id);
      setDescription(data.singleProduct.description);
      setPrice(data.singleProduct.price);
      setQuantity(data.singleProduct.quantity);
      setShipping(data.singleProduct.shipping);
      setCategory(data.singleProduct.category._id);
    }catch(error){
        console.log(error);
    }
  }
  useEffect(()=>{
    getSingleProduct()
     //eslint-disable-next-line
  },[])
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

  const handleUpdate = async(e) =>{
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      photo && productData.append("photo",photo)
      productData.append("category",category)

     const { data } = await axios.put(`/api/v1/product/update-product/${id}`,productData)
     if(data.success){
      toast.success(`product Updated Sucessfully`)
      navigate('/dashboard/admin/products')
     }else{
      toast.error(data?.message)
      
     }
    }catch(error){
      console.log(error);
      toast.error('something went wrong')
    }

  }
  const handleDelete = async(e) =>{
    e.preventDefault();
    try{
    let answer = window.prompt('are you sure you want to delete this product ?')
    if(!answer)return;
     const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
     if(data.success){
      toast.success(`product Deleted Sucessfully`)
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
            <h1>Update Product</h1>
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
                value={category}
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ):(
                <div className="text-center">
                <img
                  src={`api/v1/product/product-photo/${id}`}
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
                value={shipping ? "yes" : "no"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger d-flex" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProducts