import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/CategoryProductstyle.css";

const Categoryproduct = () => {
  const [product,setProduct] = useState([])
  const [category,setCategory] = useState([])
  const params = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    if(params?.slug)geproductByCat()
  },[params?.slug])
  const geproductByCat = async() =>{
    try{
      const {data} = await axios.get(`/api/v1/product/prod-category/${params.slug}`)
      setProduct(data?.products)
      setCategory(data?.category)
    }catch(error){
      console.log(error);
      
    }

  }
  return (
    <Layout>
      <h3 className='text-center'>Category-{category?.name}</h3>
      <h6 className='text-center'>{product?.length}result found</h6>
      <div className='row'>
      <div className="d-flex flex-wrap">
        {product?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">${p.price}</p>

                    <button class="btn btn-primary ms-2" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-2">Add To Cart</button>                    
                  </div>
                </div>
            ))}
        </div>
        {/* <div className="m-2 p-3">
        {product && product.length < total &&(
          <button className="btn btn-warning" onClick={(e)=>{e.preventDefault();setPage(page + 1)}}>

            {loading ? "Loading...":"Loadmore"}
          </button>
        )}

      </div> */}
      </div>

    </Layout>
  )
}

export default Categoryproduct