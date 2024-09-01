import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/Context';
import Fooditems from '../FoodItems/Fooditems';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    console.log("Food list:", food_list);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You!</h2>
            <div className="food-display-list">
                {food_list && food_list.length > 0 ? (
                    food_list
                        .filter(item => category === "All" || category === item.category) // Filter items based on category
                        .map((item, index) => (
                            // **********Food item  
                            <Fooditems
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        ))
                ) : (
                    <p>No food items available</p>
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;



