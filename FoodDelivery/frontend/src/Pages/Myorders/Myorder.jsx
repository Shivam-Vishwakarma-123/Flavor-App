import React, { useContext,useState,useEffect } from 'react'
import './Myorder.css'
import axios from 'axios'
import { StoreContext } from '../../Context/Context';
import { assets } from '../../assets/assets';

const Myorder = () => {
  const [data,setData] =  useState([]);
  const {url,token}=useContext(StoreContext);
  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorder",{},{headers:{token}});
    setData(response.data.data)
    console.log(response.data.data);
  }
  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt="" />
                {/* ye dasrshat he har order me kitne item he */}
                <p>{order.items.map((item,index)=>{
                  // if the item is the last item 
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>₹{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Myorder
