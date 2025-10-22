export interface GeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
  osmId?: string;
  osmType?: string;
}
