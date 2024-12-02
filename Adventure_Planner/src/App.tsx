import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
import SignUp from './components/Auth/Signup';
import SignIn from './components/Auth/Signin';

import Login from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Faq from './components/AccordionComponent';
import Profile from './components/pages/Profile';
import { RootState } from "./redux/store";
import { hideToast, showToast } from "./redux/slices/toastSlice";
import ToastComponent from "./components/ToastComponent";

function App() {
  const dispatch = useDispatch();

  const toast = useSelector((state: RootState) => state.toast);

  // For testing only.
  // const handleShowToast = () => {
  //   dispatch(showToast({ message: 'Toast incoooming!', type: 'success'}));
  // }

  const handleHideToast = () => {
    dispatch(hideToast());
  }

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

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<LoggedIn />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
            <SignIn />
            <SignUp />
            <Faq />
            {toast.showToast && (
              <ToastComponent 
                message={toast.message} 
                type={toast.type} 
                onClose={handleHideToast} 
              />
            )}
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;