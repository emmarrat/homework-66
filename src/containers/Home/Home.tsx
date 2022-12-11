import React from 'react';
import AddMealButton from "../../components/AddMealButton/AddMealButton";
import {MealType} from "../../types";
import MealCard from "../../components/MealCard/MealCard";
import Spinner from "../../components/Spinner/Spinner";
import axiosApi from "../../axiosApi";

interface Props {
  meals: MealType[];
  loading: boolean;
  totalCalories: number;
  fetchMeals: () => void;
}

const Home: React.FC<Props> = ({meals, loading, totalCalories, fetchMeals}) => {
  const removeMeal = async (id: string) => {
    if(window.confirm('Please confirm that you want to delete selected meal')) {
      await axiosApi.delete('/meals/' + id + '.json');
      await fetchMeals();
    }
  };
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
              <MealCard meal={meal} key={meal.id} onDelete={() => removeMeal(meal.id)}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;