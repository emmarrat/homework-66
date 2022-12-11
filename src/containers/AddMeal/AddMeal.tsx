import React, {useState} from 'react';
import FormCalories from "../../components/FormCalories/FormCalories";
import {MealTypeApi} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";

const AddMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const addMeal = async (meal: MealTypeApi) => {
    try{
      setLoading(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <FormCalories onSubmit={addMeal} loading={loading}/>
    </div>
  );
};

export default AddMeal;