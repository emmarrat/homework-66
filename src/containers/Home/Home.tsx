import React, {useState} from 'react';
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
  const [deleting, setDeleting] = useState(false);

  const deleteMeal = async (id: string) => {
    try {
      setDeleting(true);
      if (window.confirm('Please confirm that you want to delete selected meal')) {
        await axiosApi.delete('/meals/' + id + '.json');
        await fetchMeals();
      }
    } finally {
      setDeleting(false);
    }
  };

  let content = (
    <div className="mt-5 d-flex flex-column align-items-center">
      {meals.map(meal => (
        <MealCard meal={meal} key={meal.id} deleteLoading={deleting} onDelete={() => deleteMeal(meal.id)}/>
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
              <h3>Total calories for today: <b> {totalCalories} kcal</b></h3>
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