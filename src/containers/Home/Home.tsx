import React from 'react';
import AddMealButton from "../../components/AddMealButton/AddMealButton";
import {MealType} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
  meals: MealType[];
  loading: boolean;
  totalCalories: number;
  fetchMeals: () => void;
}

const Home: React.FC<Props> = ({meals, loading, totalCalories, fetchMeals}) => {

  const today = new Date().toLocaleDateString('en-CA');

  let content = (
    <div className="mt-5 d-flex flex-column align-items-center">
      {meals.map(meal => (
        <MealCard meal={meal} key={meal.id} fetchMeals={fetchMeals} />
      ))}
    </div>
  );

  if (meals.length === 0) {
    content = (
      <>
        <h3 className="text-center mt-5">List of meals is empty...</h3>
      </>
    );
  }

  return (
    <>
      {loading ? <Spinner/> : (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <h3>Total calories for today ({today}): <b> {totalCalories} kcal</b></h3>
            </div>
            <AddMealButton/>
          </div>
          {content}
        </>
      )}
    </>
  );
};

export default Home;