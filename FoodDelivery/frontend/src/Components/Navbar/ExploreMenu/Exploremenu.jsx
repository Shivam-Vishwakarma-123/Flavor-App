import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../../assets/assets'



const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Experience Our Signature Dishes</h1>
      <p className='explore-menu-text'>Discover a wide selection of mouthwatering dishes, each prepared with the highest quality ingredients and expert culinary techniques. Our goal is to delight your taste buds and enhance your dining journey, serving you exceptional meals that will leave you craving for more</p>
    <div className="explore-menu-list">
        {
            menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                       <img  className={category===item.menu_name?"active":""}src={item.menu_image} alt="" />
                       <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
    </div>
    <hr/>
    
    </div>
  )
}

export default Exploremenu
