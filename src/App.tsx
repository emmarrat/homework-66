import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import AddMeal from "./containers/AddMeal/AddMeal";

function App() {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container pt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-new-meal" element={<AddMeal/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
