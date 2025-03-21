import { Layout } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyle.css"

const Productdetails = () => {
  const params = useParams();
  const [singleProduct, setProduct] = useState({});
  const [products,setRelatedProduct] = useState([])
  //use
  useEffect(() => {
    if (params?.slug) getProducuts();
  }, [params.slug]);
  //getproducts
  const getProducuts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/getsingle-product/${params.slug}`
      );
      setProduct(data?.singleProduct);
      getSimilarProduct(data?.products._id,data?.products.category._id)
    } catch (error) {
      console.log(error);
    }
  };

//getsimilar product
const getSimilarProduct = async (pid,cid) => {
    try{
       const {data} = await axios.get(`/api/v1/product/similar-product/${pid}/${cid}`)
       setRelatedProduct(data?.products)
    } catch(error){
        console.log(error);
        
    }
}
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6 mt-2">
          <img
            src={`/api/v1/product/product-photo/${singleProduct._id}`}
            className="card-img-top"
            alt={singleProduct.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 text-center">
            <h3 className="text-center">Product Details</h3>
            <h4>Name:{singleProduct.name}</h4>
            <h4>Description:{singleProduct.description}</h4>
            <h4>Price:{singleProduct.price}</h4>
            {/* <h4>Category:{singleProduct.singleCategory}</h4> */}
              <button className='btn btn-secondary ms-1'>ADD TO CART</button>
        </div>
        {/* <div className="row">
            <h1>Similar prod</h1>
            <div className="d-flex flex-wrap">
        {singleProduct?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>
                    <button class="btn btn-secondary ms-2">Add To Cart</button>                    
                  </div>
                </div>
            ))}
            </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Productdetails;
