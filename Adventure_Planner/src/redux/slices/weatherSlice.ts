import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchWeatherData from '../../api/getWeather';
import { Weather } from '../../components/types/types';

interface WeatherState {
    data: Weather[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null; 
    destination: string | null;
  }
  
  const initialState: WeatherState = {
    data: null,
    status: 'idle',
    error: null,
    destination: null,
  };

  export interface WeatherQuery {
    destination: string;
  }

export const fetchWeather = createAsyncThunk<Weather[], WeatherQuery>(
    'weather/fetchWeather',
    async ({ destination }) => {
        const response = await fetchWeatherData({ destination });
        console.log(response);
        return response;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      setDestination(state, action: PayloadAction<string>) {
        state.destination = action.payload;
      },
      clearDestination(state) {
        state.destination = null;
      },
      resetWeather(state) {
        state.data = null;
        state.status = "idle";
        state.error = null;
      },
      clearError(state) {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchWeather.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchWeather.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'error';
          console.error("Error fetching weather:", action.error);
        });
    },
  });

export const { setDestination, clearDestination, resetWeather, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;