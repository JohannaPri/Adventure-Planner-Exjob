import { configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportSlice';
import flightReducer from './slices/flightSlice';
import hotelReducer from './slices/hotelSlice';
import cityReducer from './slices/citySlice';
import activityReducer from './slices/activitySlice';
import weatherReducer from './slices/weatherSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        airport: airportReducer,
        flights: flightReducer,
        hotel: hotelReducer,
        city: cityReducer,
        activity: activityReducer,
        weather: weatherReducer,
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;