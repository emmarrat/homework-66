import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MealOnClientSide, MealTypeApi} from "../../types";
import axiosApi from "../../axiosApi";
import FormCalories from "../../components/FormCalories/FormCalories";
import Spinner from "../../components/Spinner/Spinner";

const EditMeal = () => {
  const {id} = useParams();
  const [meal, setMeal] = useState<MealOnClientSide | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchMeal = useCallback(async () => {
    try {
      setLoading(true);
      const mealResponse = await axiosApi.get<MealTypeApi>('/meals/' + id + '.json');
      const meal = mealResponse.data;
      setMeal({
        ...meal,
        calories: meal.calories.toString(),
      });

    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchMeal();
  }, [fetchMeal]);

  const updateMeal = async (meal: MealTypeApi) => {
    try {
      setSubmitLoading(true);
      await axiosApi.put('/meals/' + id + '.json', meal);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div> {loading ? <Spinner/> : (
      <>
        {meal && <FormCalories onSubmit={updateMeal} loading={submitLoading} editingMeal={meal}/>}
      </>
    )}
    </div>
  );
};

export default EditMeal;