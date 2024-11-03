import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react";
import NavBar from "./components/layout/NavBar";
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import LoggedIn from './components/pages/LoggedIn';
import ErrorPage from './components/pages/ErrorPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loggedIn" element={<LoggedIn />} />
        <Route path="*" element={<ErrorPage /> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
