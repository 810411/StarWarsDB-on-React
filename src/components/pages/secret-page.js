import React from 'react';
import {Redirect} from "react-router-dom";

const SecretPage = ({isLoggedIn}) => {
  if (isLoggedIn) {
    return (
      <div className="jimbotron text-center">
        <h2>This is secret page!</h2>
      </div>
    )
  }

  return (
    <Redirect to="/login"/>
  )
};

export default SecretPage
