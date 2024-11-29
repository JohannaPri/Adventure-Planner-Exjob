import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { setUser, clearUser } from './redux/slices/authSlice';

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
import ProtectedRoute from './components/ProtectedRoutes';
import Profile from './components/pages/Profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email: email || null, displayName: displayName || null }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <CookieConsent />
      <NavBar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/faq" element={<AccordionComponent />} />
          

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<LoggedIn />} />
          </Route>
          
          <Route path="*" element={<ErrorPage /> } />
        </Routes>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
