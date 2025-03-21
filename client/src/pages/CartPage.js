import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../components/context/cart";
import { useAuth } from "../components/context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import "../styles/CartStyles.css";
function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken,setClientToken] = useState("");
  const [instance,setInstance] = useState("")
  const [loading,setLoading] = useState(false)
  //handle payment
  const handlePayment = async() =>{
     try{
      setLoading(true)
        const {nonce} = await instance.requestPaymentMethod()
        const {data} = await axios.post('/api/v1/product/braintree/payment',{nonce,cart})
        setLoading(false)
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/orders')
        toast.success('Payment Completed Successfully')
     }catch(error){
      console.log(error);
      setLoading(false)
      
     }
  }
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //get paymentgetway token 
  const getToken = async() =>{
    try{
        const {data} = await axios.get('/api/v1/product/braintree/token')
        setClientToken(data?.clientToken)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
   getToken()
  },[auth?.token])
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center bg-light p-2 mb-1">
              {cart?.length
                ? `you have ${cart.length}items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart?.map((p) => (
              <div className="row  mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width={"100px"}
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <h4>Price:${p.price}</h4>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h4 className="">Cart Summary</h4>
            <p>Total| Checkout|Payment</p>
            <h4>Total:{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning
                    "
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login",{
                      state:"/cart"
                    })}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-3">
              {
                !clientToken ||!auth?.token || !cart?.length ?(""):(
                  <>
               <DropIn
                options={{
                authorization:clientToken,
                paypal:{
                  flow:'vault'
                },
              }}
              onInstance={instance =>setInstance(instance) }
              />
              <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing...." : "Make Payment"}</button>
                  </>
                )
              }
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
