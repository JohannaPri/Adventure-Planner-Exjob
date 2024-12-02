import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchCityData from "../../api/getCity";
import { City } from "../../components/types/types";

interface CityState {
  data: City[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  destination: string | null;
}

const initialState: CityState = {
  data: null,
  status: "idle",
  error: null,
  destination: null,
};

export interface CityQuery {
  destination: string;
}

export const fetchCities = createAsyncThunk<City[], CityQuery>(
  "cities/fetchCities",
  async ({ destination }) => {
    const response = await fetchCityData({ destination });
    return response;
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
        console.error("Error fetching cities:", action.error);
      });
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
