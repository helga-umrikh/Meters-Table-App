import { apiClient } from '@/shared/api';

export interface AreaHouseDto {
  id: string;
  address: string;
  fias_addrobjs?: string[];
}

export interface AreaDto {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: AreaHouseDto;
}

export interface AreasResponse {
  count: number;
  results: AreaDto[];
}

export const fetchAreasByIds = async (ids: string[]): Promise<AreasResponse> => {
  if (ids.length === 0) return { count: 0, results: [] };
  const { data } = await apiClient.get<AreasResponse>('/areas/', {
    params: { id__in: ids.join(',') },
  });
  return data;
};
