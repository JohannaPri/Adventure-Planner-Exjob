import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { setUser } from './redux/slices/authSlice';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoutes';

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

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/pages/Profile';

function App() {
  const dispatch = useDispatch();

  return (
      <div className="flex flex-col min-h-screen">
        <AuthProvider>
          <CookieConsent />
          <Router>
            <NavBar isLoggedIn={false} />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/faq" element={<AccordionComponent />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<LoggedIn />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;
