export interface DestinationImage {
  image_jpeg: string;
  image_webp: string;
}

export interface DisplayType {
  type: string;
  displayName: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  total_price: string;
  currency: string;
  checkin: string;
  checkout: string;
  adult: number;
  child: number;
}

export interface City {
  id: string;
  city: string;
  city_full: string;
}

export interface Airport {
  id: string;
  displayname: string;
  loctype: string;
  lat: string;
  lng: number;
  country: string;
  cityname: string;
  timezone: string;
  airportname: string;
  destination_images: DestinationImage;
  displayType: DisplayType;
  shortdisplayname: string;
  smartyDisplay: string;
}

export interface Flight {
  departure: string;
  destination: string;
  fromDate: string;
  toDate: string;
  tripType: "one-way" | "round-trip";
  adults: number;
  children: number;
  flightData: FlightOffer[] | null;
  loading: boolean;
  error: string | null;
}

interface FlightOffer {
  id: string;
  source: string;
  price: Price;
  itinaries: Itinerary[];
  validatingAirlineCodes: string[];
  travelerPricing: TravelerPricing[];
}

interface Price {
  curency: string;
  total: string;
  base: string;
  granTotal: string;
}

interface Itinerary {
  duration: string;
  segments: Segment[];
}

interface Segment {
  departure: AirportInfo;
  arrival: AirportInfo;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

interface AirportInfo {
  iataCode: string;
  terminal: string;
  at: string;
}

interface Aircraft {
  code: string;
}

interface Operating {
  carrierCode: string;
}

interface TravelerPricing {
  travelerId: string;
  faceOption: string;
  travelerType: string;
  price: Price;
  fareDetailBySegment: FareDetail[];
}

interface FareDetail {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
}