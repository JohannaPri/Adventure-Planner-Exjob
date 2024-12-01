import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface Flight {
  flightId: string;
  airplane: {
    carrierCode: string;
    carrierName: string;
  };
  traveler: {
    adults: number;
    children: number;
  };
  price: {
    total: string;
    currency: string;
  };
  travel: {
    itineraries: Array<{
      duration: string;
      segments: Array<{
        departure: {
          departureTime: string;
          iataCode: string;
          at: string;
        };
        arrival: {
          destinationTime: string;
          iataCode: string;
          at: string;
        };
        carrierCode: string;
      }>;
    }>;
  };
}

interface FlightState {
  data: Flight[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  departure: string | null;
  departureTime: string | null;
  destination: string | null;
  destinationTime: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

const initialState: FlightState = {
  data: null,
  status: "idle",
  error: null,
  departure: null,
  departureTime: null,
  destination: null,
  destinationTime: null,
  dateFrom: null,
  dateTo: null,
};

interface FetchFlightsParams {
  tripType: "round-trip" | "one-way";
  departure: string | null;
  destination: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  adults: number;
  children: number;
}

export const fetchFlights = createAsyncThunk<Flight[], FetchFlightsParams>(
  "flights/fetchFlights",
  async ({
    tripType,
    departure,
    destination,
    dateFrom,
    dateTo,
    adults,
    children,
  }) => {
    const returnDate = tripType === "round-trip" ? dateTo : "";
    const baseURL = `https://m2.eeazy.se/rapapi/flights?originLocationCode=${departure}&destinationLocationCode=${destination}&departureDate=${dateFrom}&returnDate=${returnDate}&adults=${adults}&children=${children}&nonStop=true&currencyCode=EUR&max=10`;

    try {
      const response = await axios.get(baseURL);
      console.log("API RESPONSE: ", response.data);
      console.log("Axios Response: ", response);
      console.log("API Response: ", response.data);
      return response.data.data
    } catch (error) {
      const AxiosError = error as AxiosError;
      const errorMessage =
        AxiosError.response?.statusText ||
        AxiosError.message ||
        "Failed to fetch flight data";
      console.log("Error fetching flights: ", errorMessage);
      throw new Error(errorMessage);
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setDeparture(state, action: PayloadAction<string>) {
      state.departure = action.payload;
    },
    setDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setDateFrom(state, action: PayloadAction<string>) {
      state.dateFrom = action.payload;
    },
    setDateTo(state, action: PayloadAction<string>) {
      state.dateTo = action.payload;
    },
    clearDeparture(state) {
      state.departure = null;
    },
    clearDestination(state) {
      state.destination = null;
    },
    resetFlights(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
        console.log("Error fetching flights: ", action.error);
      });
  },
});

export const {
  setDeparture,
  setDestination,
  clearDeparture,
  clearDestination,
  setDateFrom,
  setDateTo,
  resetFlights,
} = flightSlice.actions;

export default flightSlice.reducer;
