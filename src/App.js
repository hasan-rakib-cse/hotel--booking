import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter,  Route, Routes, } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import Error from './components/Error/Error';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/* <PrivateRoute path="/book/:bedType"><Book /></PrivateRoute> */}
          <Route path='/book/:bedType' element={<PrivateRoute> <Book /> </PrivateRoute>} />

          <Route path='*' element={<Error />} />

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
