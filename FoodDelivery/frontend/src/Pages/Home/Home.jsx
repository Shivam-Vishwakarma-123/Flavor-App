import React, { useState } from 'react';
import './Home.css'; // Ensure this file exists and is correctly styled
import Header from '../../Components/Navbar/Header/Header'; // Check if this path is correct
import Exploremenu from '../../Components/Navbar/ExploreMenu/Exploremenu'; // Check if this path is correct
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import AppDownload from '../../Components/AppDownload/AppDownLoad';

const Home = () => {
  const [category, setCategory] = useState("All"); // Correctly use array destructuring

  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  );
}



export default Home
