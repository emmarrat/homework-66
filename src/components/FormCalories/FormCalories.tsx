import React, {useState} from 'react';
import {MealOnClientSide, MealTypeApi} from "../../types";
import {useNavigate} from "react-router-dom";

interface Props {
  onSubmit: (meal: MealTypeApi) => void;
  loading: boolean;
}


const FormCalories: React.FC<Props> = ({onSubmit, loading}) => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState<MealOnClientSide>({
    time: '',
    descr: '',
    calories: '',
  });

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit( {
      ...meal,
      calories: parseFloat(meal.calories),
    })
  }

  return (
    <>
      <form className="mt-3" onSubmit={submitForm}>
        <div className="d-flex flex-row-reverse">
          <button onClick={() => navigate('/')} className="btn btn-sm btn-secondary">Cancel</button>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">
            <select
              className="form-select"
              required
              name="time"
              value={meal.time}
              onChange={onChangeForm}
            >
              <option disabled value="">Choose a meal time</option>
              <option value="breakfast">Breakfast</option>
              <option value="snack">Snack</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </label>
        </div>
        <div className="form-group mb-3 w-50">
          <label className="form-label">Meal description</label>
          <input
            onChange={onChangeForm}
            name="descr"
            type="text"
            className="form-control"
            value={meal.descr}
            required
          />
        </div>
        <div className="form-group w-25">
          <label className="form-label">Count of calories</label>
          <input
            onChange={onChangeForm}
            name="calories"
            type="number"
            className="form-control"
            value={meal.calories}
            required
          />
        </div>
        <div className="form-group mt-3">
          <button className="btn btn-success">Save</button>
        </div>
      </form>
    </>
  );
};

export default FormCalories;