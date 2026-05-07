import type { Meter } from '../model/types';

const types: Meter['_type'][] = [
  'coldWaterAreaMeter',
  'hotWaterAreaMeter',
  'heatSupply',
  'electricitySupply',
];

const descriptions = [
  'Подвал, парадная 1',
  'Подвал, парадная 2',
  'Подвал, парадная 3',
  'Подвал, парадная 4',
  'Подвал, парадная 5',
  'Подвал, парадная 6',
  'Технический этаж',
  'Чердак',
];

const dates = [
  '2021-03-15',
  '2021-07-22',
  '2022-01-10',
  '2022-05-30',
  '2022-09-14',
  '2023-01-12',
  '2023-06-01',
  '2023-11-20',
  '2024-02-08',
  '2024-07-17',
];

const values = [
  333467.66, 12045.3, 87654.1, 500001.0, 4321.77, 98765.43, 213456.78, 7654.32,
  654321.9, 11111.11,
];

export const mockMeters: Meter[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  _type: types[i % types.length],
  installation_date: dates[i % dates.length],
  is_automatic: i % 3 !== 0,
  initial_values: values[i % values.length],
  area_id: (i % 20) + 1,
  description: descriptions[i % descriptions.length],
}));
