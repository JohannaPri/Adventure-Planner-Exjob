export interface DestinationImage {
  image_jpeg: string;
  image_webp: string;
}

export interface DisplayType {
  type: string;
  displayName: string;
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
