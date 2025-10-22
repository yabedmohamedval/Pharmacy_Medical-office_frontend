
export interface Pharmacy {
  id: number;
  name: string;
  addressRaw: string;
  latitude?: number | null;
  longitude?: number | null;
  moughataa: string;
  commune: string;
  open_time: string;
}
