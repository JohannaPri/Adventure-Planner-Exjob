import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchHotelData from '../../api/getHotels';
import { Hotel } from '../../components/types/types';

interface HotelState {
    data: Hotel[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null; 
    destination: string | null;
    adults: number | null;
    children: number | null;
    checkin: string | null;
    checkout: string | null;
  }
  
  const initialState: HotelState = {
    data: null,
    status: 'idle',
    error: null,
    destination: null,
    adults: null,
    children: null,
    checkin: null,
    checkout: null,
  };

  export interface HotelQuery {
    destination: string;
    adults: number;
    children: number;
    checkin: string;
    checkout: string;
  }

export const fetchHotels = createAsyncThunk<Hotel[], HotelQuery>(
    'hotels/fetchHotels',
    async ({ destination, adults, children, checkin, checkout }) => {
        const response = await fetchHotelData({ destination, adults, children, checkin, checkout });
        return response;
    }
);

const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
      setDestination(state, action: PayloadAction<string>) {
        state.destination = action.payload;
      },
      setAdults(state, action: PayloadAction<number>) {
        state.adults = action.payload;
      },
      setChildren(state, action: PayloadAction<number>) {
        state.children = action.payload;
      },
      setCheckin(state, action: PayloadAction<string>) {
        state.checkin = action.payload;
      },
      setCheckout(state, action: PayloadAction<string>) {
        state.checkout = action.payload;
      },
      clearDestination(state) {
        state.destination = null;
      },
      resetHotels(state) {
        state.data = null;
        state.status = "idle";
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchHotels.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchHotels.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchHotels.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Something went wrong';
          console.error("Error fetching hotels:", action.error);
        });
    }, 
  });


export const { setDestination, setAdults, setChildren, setCheckin, setCheckout, resetHotels, clearDestination } = hotelSlice.actions;
export default hotelSlice.reducer;