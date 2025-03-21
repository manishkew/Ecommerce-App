import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/Layout/Adminmenu";
import { Layout } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProduct] = useState();
  const getAllproducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <Adminmenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link 
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}>
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
