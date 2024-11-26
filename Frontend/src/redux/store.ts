import { configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportSlice';
import flightReducer from './slices/flightSlice';
import hotelReducer from './slices/hotelSlice';
import cityReducer from './slices/citySlice';
import activityReducer from './slices/activitySlice';

const store = configureStore({
    reducer: {
        airport: airportReducer,
        flights: flightReducer,
        hotel: hotelReducer,
        city: cityReducer,
        activity: activityReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;