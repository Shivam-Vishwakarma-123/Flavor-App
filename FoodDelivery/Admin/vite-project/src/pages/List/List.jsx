import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../../assets/assets";
const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    console.log("API Call (fetchList):", `${url}/api/food/list`);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Response Data (fetchList):", response.data);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    console.log("API Call (removeFood):", `${url}/api/food/remove`);
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      console.log("Response Data (removeFood):", response.data);

      await fetchList(); // Refresh the list after removing food

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="cursor" onClick={() => removeFood(item._id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
