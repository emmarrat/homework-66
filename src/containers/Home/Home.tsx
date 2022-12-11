import React from 'react';
import AddMealButton from "../../components/AddMealButton/AddMealButton";

const Home = () => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        Total calories: some number
      </div>
      <AddMealButton/>
    </div>
  );
};

export default Home;