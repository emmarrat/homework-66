import React from 'react';
import AddMealButton from "../../components/AddMealButton/AddMealButton";
import {MealType} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
  meals: MealType[];
  loading: boolean;
  totalCalories: number;
}

const Home: React.FC<Props> = ({meals, loading, totalCalories}) => {

  return (
    <>
      {loading ? <Spinner/> : (
        <>
          <div className="d-flex justify-content-between">
            <div>
              Total calories: <b> {totalCalories} kcal</b>
            </div>
            <AddMealButton/>
          </div>
          <div className="mt-5 d-flex flex-column align-items-center">
            {meals.map(meal => (
              <MealCard meal={meal} key={meal.id}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;