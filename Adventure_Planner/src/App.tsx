import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoutes";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import LoggedIn from "./components/pages/LoggedIn";
import ErrorPage from "./components/pages/ErrorPage";
import CookieConsent from "./components/CookieConsent";
import SignUp from "./components/Auth/Signup";
import SignIn from "./components/Auth/Signin";

import Faq from "./components/AccordionComponent";
import Profile from "./components/pages/Profile";
import { RootState } from "./redux/store";
import { hideToast } from "./redux/slices/toastSlice";
import ToastComponent from "./components/ToastComponent";
import MyDestinations from "./components/MyDestinations/MyDestinations";

function App() {
  const dispatch = useDispatch();

  const toast = useSelector((state: RootState) => state.toast);

  const handleHideToast = () => {
    dispatch(hideToast());
  };

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
                <Route path="/my-destinations" element={<MyDestinations />} />
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
