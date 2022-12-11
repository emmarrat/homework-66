import React from 'react';
import {Link} from "react-router-dom";
import {MealType} from "../../types";

interface Props {
  meal: MealType;
  // onDelete: React.MouseEventHandler;
}

const MealCard: React.FC<Props> = ({meal}) => {
  return (
    <div className="card mb-3 w-75">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{meal.time}</h5>
          <p className="card-text">{meal.descr}</p>
        </div>
        <div className="d-flex justify-content-between w-25">
          <p className="card-text m-0">{meal.calories} kcal</p>
          <div>
            <Link to={"/edit-meal/" + meal.id} className="btn btn-warning text-light">Edit</Link>
            {/*<button onClick={onDelete} className="btn btn-danger">Delete</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;