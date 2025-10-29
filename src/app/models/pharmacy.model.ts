
export interface Pharmacy {
  id: number;
  name: string;
  addressRaw: string;
  addressFormatted?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  moughataa: string;
  commune: string;
  open_time: string;
}
