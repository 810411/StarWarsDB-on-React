import React from 'react';
import {Redirect} from "react-router-dom";

const SecretPage = ({isLoggedIn, onServiceChange }) => {
  if (isLoggedIn) {
    return (
      <div className="jumbotron text-center">
        <h2>This is secret page!</h2>
        <button
          onClick={onServiceChange}
          className="btn btn-primary">
          Change Service
        </button>
      </div>
    )
  }

  return (
    <Redirect to="/login"/>
  )
};

export default SecretPage
