import { configureStore  } from "@reduxjs/toolkit";
import airportSlice from './slices/airportSlice';

const store = configureStore({
    reducer: {
        airport: airportSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;