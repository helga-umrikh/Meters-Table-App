export interface Meter {
  id: number;
  _type:
    | 'heatSupply'
    | 'coldWaterAreaMeter'
    | 'hotWaterAreaMeter'
    | 'electricitySupply';
  installation_date: string;
  is_automatic: boolean;
  initial_values: number;
  area_id: number;
  description: string;
}
