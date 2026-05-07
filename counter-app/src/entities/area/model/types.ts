export interface House {
  id: string;
  address: string;
  fias_addrobjs?: string[];
}

export interface Area {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: House;
}
