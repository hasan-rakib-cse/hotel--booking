import React, { useContext } from 'react'
// import { Redirect, Route } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App'

const PrivateRoute = ({ children }) => {

  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return loggedInUser.email ? children : <Navigate to='/login' state={{from: location}} replace />;

}

export default PrivateRoute