import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import Adminmenu from '../../components/Layout/Adminmenu'
import Layout from '../../components/Layout/Layout'
import toast  from 'react-hot-toast'
import { useAuth } from '../../components/context/auth'
import moment from 'moment'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'
const {Options} = 'Select'

const AdminOrders = () => {
    const [status,setStatus] = useState(["Not Process","Shipped","Processing","Deliverd","Cancel"])
    const [changeStatus,setChangeStatus] = useState("")
    const [auth,setAuth] = useAuth()
      const [orders, setOrders] = useState([]);
    

    
      const getOrders = async () => {
        try {
          const { data } = await axios.get("/api/v1/auth/Allorders");
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
      const handleChange = async(orderId,value) =>{
        try{
            const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value})
            getOrders()
       }catch(error){
           console.log(error);
           
       }
      }
  return (
    <Layout title={"All orders-data"}>
    <div className='row'>
    <div className='col-md-3'>
        <Adminmenu/>
        </div>
        <div className='col-md-9'>
         <h1 className='text-center'>All Orders</h1>
          {orders?.map((o, i) => {
                       return (
                         <div className="border shadow">
                           <table className="table">
                             <thead>
                               <tr>
                                 <th scope="col">#</th>
                                 <th scope="col">Status</th>
                                 <th scope="col">Buyer</th>
                                 <th scope="col">Date</th>
                                 <th scope="col">Payment</th>
                                 <th scope="col">Quantity</th>
                               </tr>
                             </thead>
                             <tbody>
                               <tr>
                                 <td>{i + 1}</td>
                                 <td>
                                    <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                                    {status.map((s,i)=>(
                                        <Option key={i} value={s}>
                                            {s}
                                        </Option>
          ))}
                                    </Select>
                                 </td>
                                 <td>{o?.buyer?.name}</td>
                                 <td>{moment(o?.createAt).fromNow()}</td>
                                 <td>{o?.payment.success? "failed" : " success"}</td>
                                 <td>{o?.products?.length}</td>
         
                               </tr>
                             </tbody>
                           </table>
                           <div className="container">
                           <div className="col-md-9">
                     {o?.products?.map((p,i) => (
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
                         </div>
                       </div>
                     ))}
                   </div>
                           </div>
                         </div>
                       );
                     })}
        </div>
    </div>
    </Layout>
  )
}

export default AdminOrders