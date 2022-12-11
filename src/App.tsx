import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import AddMeal from "./containers/AddMeal/AddMeal";
import {MealsListApi, MealType} from "./types";
import axiosApi from "./axiosApi";
import EditMeal from "./containers/EditMeal/EditMeal";

function App() {
  const location = useLocation();

  const [meals, setMeals] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const getTotalCalories = useCallback((meals: MealType[]) => {
    const now = new Date().toLocaleDateString('en-CA');
    const total = meals.reduce((acc, meal) => {
      if (meal.date === now) {
        return acc + meal.calories;
      } else {
        return acc
      }
    }, 0);

    setTotalCalories(total);
  }, []);


  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<MealsListApi | null>('/meals.json');
      const meals = mealsResponse.data;
      let newMeals: MealType[] = [];

      if (meals) {
        newMeals = Object.keys(meals).map(id => {
          const meal = meals[id];
          return {
            ...meal,
            id
          }
        });
        getTotalCalories(newMeals);
        const sortedMeals = newMeals.sort(function (a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        setMeals(sortedMeals);
      } else {
        setMeals(newMeals);
      }

    } finally {
      setLoading(false);
    }
  }, [getTotalCalories]);

  useEffect(() => {
    if (location.pathname === "/") {
      void fetchMeals();
    }
  }, [fetchMeals, location]);

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={(
            <Home
              meals={meals}
              loading={loading}
              totalCalories={totalCalories}
              fetchMeals={fetchMeals}
            />)}/>
          <Route path="/add-new-meal" element={<AddMeal/>}/>
          <Route path="/edit-meal/:id" element={<EditMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
