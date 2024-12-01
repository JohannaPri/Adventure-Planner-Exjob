import { configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportSlice';
import flightReducer from './slices/flightSlice';
import hotelReducer from './slices/hotelSlice';
import cityReducer from './slices/citySlice';
import activityReducer from './slices/activitySlice';
import weatherReducer from './slices/weatherSlice';
import authReducer from './slices/authSlice';
import modalSignUpReducer from './slices/modalSignupSlice';
import modalSignInReducer from './slices/modalSigninSlice';
import modalFaqReducer from './slices/modalFaqSlice';
import toastReducer from './slices/toastSlice';

export const store = configureStore({
    reducer: {
        airport: airportReducer,
        flights: flightReducer,
        hotel: hotelReducer,
        city: cityReducer,
        activity: activityReducer,
        weather: weatherReducer,
        auth: authReducer,
        signupmodal: modalSignUpReducer,
        signinmodal: modalSignInReducer,
        faqmodal: modalFaqReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;