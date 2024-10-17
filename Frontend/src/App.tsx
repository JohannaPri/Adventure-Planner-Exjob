import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react";
import NavBar from "./components/layout/NavBar";
import Home from './components/pages/Home';

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
