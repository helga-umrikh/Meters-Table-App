export type KnownMeterKind = 'ColdWaterAreaMeter' | 'HotWaterAreaMeter' | 'AreaMeter';

export type MeterKind = KnownMeterKind | (string & {});

export interface Meter {
  id: string;
  _type: MeterKind[];
  area: { id: string };
  is_automatic: boolean | null;
  communication?: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}
