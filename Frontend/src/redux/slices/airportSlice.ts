import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchAirportData from '../../api/getAirports';
import { Airport } from '../../components/types/types';

interface AirportState {
    data: Airport[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: AirportState = {
    data: null,
    status: 'idle',
    error: null,
  };

export const fetchAirports = createAsyncThunk<Airport[], string>(
    'airports/fetchAirports',
    async (query) => {
        const response = await fetchAirportData(query);
        console.log(response);
        return response;
    }
);

const airportSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAirports.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAirports.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchAirports.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Something went wrong';
          console.error("Error fetching airports:", action.error);
        });
    }, 
  });

export default airportSlice.reducer;