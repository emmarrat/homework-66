import React from 'react';

const Spinner = () => {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <strong className="text-success mb-3">Loading...</strong>
      <div className="spinner-border text-success" role="status"></div>
    </div>
  );
};

export default Spinner;