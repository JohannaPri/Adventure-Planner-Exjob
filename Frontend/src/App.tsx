import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react";
import NavBar from "./components/layout/NavBar";
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AccordionComponent } from './components/AccordionComponent';

import LoggedIn from './components/pages/LoggedIn';
import ErrorPage from './components/pages/ErrorPage';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <CookieConsent />
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loggedIn" element={<LoggedIn />} />
          <Route path="/faq" element={<AccordionComponent />} />
          <Route path="*" element={<ErrorPage /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
