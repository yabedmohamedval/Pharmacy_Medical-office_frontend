export interface MedicalOffice {
  id: number;
  name: string;
  addressRaw: string;
  addressFormatted?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  wilaya: string;
  moughataa: string;
  commune: string;
  speciality: string;
  open_time: string;
}
