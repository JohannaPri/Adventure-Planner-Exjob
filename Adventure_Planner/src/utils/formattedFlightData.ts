export type Segment = {
  airplane: {
    carrierCode: string;
    carrierName: string;
  };
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  flightNumber: string;
  duration: string;
  numberOfStops: number;
};

type Travel = {
  flightId: string;
  duration: string;
  segments: Segment[];
};
  
type Price = {
  total: string;
  currency: string;
};
  
type Flight = {
  flightId: string;
  price: Price;
  travel: Travel[];
};

type FlightData = Flight;

export type FormattedFlightData = {
  flightId: string;
  price: string;
  outbound: {
    carrier: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: string;
  };
  return: {
    carrier: string;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: string;
  };
};

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match?.[1]?.replace("H", "h") || "";
  const minutes = match?.[2]?.replace("M", "min") || "";
  return `${hours} ${minutes}`.trim();
}

export function formatFlightData(data: FlightData[]): FormattedFlightData[] {
  return data.map(flight => {
    const price = `€${flight.price.total}`;

    const outbound = flight.travel[0]?.segments[0];
    const outboundCarrier = outbound?.airplane?.carrierName || "Unknown Carrier";
    const outboundFlightNumber = outbound?.flightNumber || "Unknown Flight";
    const outboundDeparture = outbound?.departure || "Unknown Departure";
    const outboundArrival = outbound?.arrival || "Unknown Arrival";
    const outboundDepartureTime = outbound?.departureTime 
      ? new Date(outbound.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : "N/A";
    const outboundArrivalTime = outbound?.arrivalTime 
      ? new Date(outbound.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "N/A";
    const outboundDuration = outbound?.duration ? formatDuration(outbound.duration) : "N/A"; 
    const outBoundStops = outbound?.numberOfStops === 0 ? 'direct' : `${outbound?.numberOfStops} stops`;

    const returnFlight = flight.travel[1]?.segments[0];
    const returnCarrier = returnFlight?.airplane?.carrierName || "Unknown Carrier";
    const returnFlightNumber = returnFlight?.flightNumber || "Unknown Flight";
    const returnDeparture = returnFlight?.departure || "Unknown Departure";
    const returnArrival = returnFlight?.arrival || "Unknown Arrival";
    const returnDepartureTime = returnFlight?.departureTime 
      ? new Date(returnFlight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : "N/A";
    const returnArrivalTime = returnFlight?.arrivalTime 
      ? new Date(returnFlight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : "N/A";
    const returnDuration = returnFlight?.duration ? formatDuration(returnFlight.duration) : "N/A";
    const returnStops = returnFlight.numberOfStops === 0 ? 'direct' : `${returnFlight?.numberOfStops} stops`;

    return {
      flightId: flight.flightId,
      price,
      outbound: {
        carrier: outboundCarrier,
        flightNumber: outboundFlightNumber,
        departure: outboundDeparture,
        arrival: outboundArrival,
        departureTime: outboundDepartureTime,
        arrivalTime: outboundArrivalTime,
        duration: outboundDuration,
        stops: outBoundStops
      },
      return: {
        carrier: returnCarrier,
        flightNumber: returnFlightNumber,
        departure: returnDeparture,
        arrival: returnArrival,
        departureTime: returnDepartureTime,
        arrivalTime: returnArrivalTime,
        duration: returnDuration,
        stops: returnStops
      }
    };
  });
}