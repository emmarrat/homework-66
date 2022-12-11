import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import AddMeal from "./containers/AddMeal/AddMeal";
import {MealsListApi, MealType} from "./types";
import axiosApi from "./axiosApi";

function App() {

  const [meals, setMeals] = useState<MealType[]>([]);
  const [loading, setLoading] = useState(false);

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
      }
      setMeals(newMeals);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals])

  console.log(meals);


  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<Home meals={meals} loading={loading}/>}/>
          <Route path="/add-new-meal" element={<AddMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
