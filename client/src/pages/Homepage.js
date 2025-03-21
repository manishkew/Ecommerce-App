import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Prices } from "../components/Prices";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cart";
import toast from "react-hot-toast";
// import "../styles/Homepage.css";


const Homepage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setCheked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //gettotal count

  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/getAll-categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setLoading(false);
    }
  };
  const totalCount = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllcategories();
    totalCount();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //filtter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All product-Best Offers"}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h6 className="text-start">Filter by category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-start">Filter by Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-row">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <h1 className="text-center"> All Products </h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">${p.price}</p>

                  <button
                    class="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-2"
                    className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart,p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart,p])
                        );
                        toast.success("Item Added to cart");
                      }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
