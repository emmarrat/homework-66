import React, {useState} from 'react';
import {MealOnClientSide, MealTypeApi} from "../../types";
import {useNavigate} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner/ButtonSpinner";

interface Props {
  onSubmit: (meal: MealTypeApi) => void;
  loading: boolean;
  editingMeal?: MealOnClientSide;
}

const FormCalories: React.FC<Props> = ({onSubmit, loading, editingMeal}) => {
  const navigate = useNavigate();
  const today = new Date();
  const [meal, setMeal] = useState<MealOnClientSide>(editingMeal ? editingMeal : {
    time: '',
    descr: '',
    calories: '',
    date: today.toLocaleDateString('en-CA'),
  });

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...meal,
      calories: parseFloat(meal.calories),
    })
  }

  return (
    <>
      <h3 className="text-center">{editingMeal ? "Please, edit your meal" : "Please, add a new meal"}</h3>
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
              disabled={loading}
            >
              <option disabled value="">Choose a meal time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Snack">Snack</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </label>
        </div>
        <div className="form-group mb-3 w-50">
          <label className="form-label">Meal description</label>
          <input
            disabled={loading}
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
            disabled={loading}
            onChange={onChangeForm}
            name="calories"
            type="number"
            className="form-control"
            value={meal.calories}
            required
          />
        </div>
        <div className="form-group w-25">
          <label className="form-label">Choose the date</label>
          <input
            disabled={loading}
            onChange={onChangeForm}
            name="date"
            type="date"
            className="form-control"
            value={meal.date}
            placeholder="dd-mm-yyyy"
            max={today.toLocaleDateString('en-CA')}
            required
          />
        </div>
        <div className="form-group mt-3">
          <button disabled={loading} className="btn btn-success">
            {loading && <ButtonSpinner/>}
            {editingMeal ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCalories;