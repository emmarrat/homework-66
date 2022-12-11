import React from 'react';
import {Link} from "react-router-dom";
import {MealType} from "../../types";

interface Props {
  meal: MealType;
  onDelete: React.MouseEventHandler;
  deleteLoading: boolean;
}

const MealCard: React.FC<Props> = ({meal, onDelete, deleteLoading}) => {
  return (
    <div className="card border-0 mb-3 w-75 shadow-lg p-3 bg-body rounded">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{meal.time}</h5>
          <p className="card-text">{meal.descr}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center w-25">
          <p className="card-text m-0">{meal.calories} kcal</p>
          <div>
            <Link to={"/edit-meal/" + meal.id} className="btn btn-warning text-light d-block mb-1">Edit</Link>
            <button onClick={onDelete} disabled={deleteLoading} className="btn btn-danger d-block">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;