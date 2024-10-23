import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react";
import NavBar from "./components/layout/NavBar";
import Home from './components/pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
