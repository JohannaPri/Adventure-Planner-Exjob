import { configureStore } from '@reduxjs/toolkit';
import airportReducer from './slices/airportSlice';
import flightReducer from './slices/flightSlice';
import hotelReducer from './slices/hotelSlice';
import cityReducer from './slices/citySlice';
import activityReducer from './slices/activitySlice';
import weatherReducer from './slices/weatherSlice';
import authReducer from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        airport: airportReducer,
        flights: flightReducer,
        hotel: hotelReducer,
        city: cityReducer,
        activity: activityReducer,
        weather: weatherReducer,
        auth: persistedReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;