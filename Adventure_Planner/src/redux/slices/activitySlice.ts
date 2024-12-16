import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchActivityData from "../../api/getActivities";
import { Activity } from "../../components/types/types";

interface ActivityState {
  id: string | null;
  data: Activity[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  destination: string | null;
  date: string | null;
  adults: number;
  children: number;
}

const initialState: ActivityState = {
  id: null,
  data: null,
  status: "idle",
  error: null,
  destination: null,
  date: null,
  adults: 0,
  children: 0,
};

export interface ActivityQuery {
  destination: string;
  date: string;
  adults: number;
  children: number;
}

export const fetchActivites = createAsyncThunk<Activity[], ActivityQuery>(
  "activities/fetchActivities",
  async ({ destination, date, adults, children }) => {
    const response = await fetchActivityData({
      destination,
      date,
      adults,
      children,
    });
    console.log(response);
    return response;
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    clearDestination(state) {
      state.destination = null;
    },
    resetActivites(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchActivites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
        console.error("Error fetching activities:", action.error);
      });
  },
});

export const {
  setDestination,
  setDate,
  setAdults,
  setChildren,
  clearDestination,
  resetActivites,
} = activitySlice.actions;
export default activitySlice.reducer;
