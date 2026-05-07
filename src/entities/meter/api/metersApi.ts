import { apiClient } from '@/shared/api';

export interface MeterDto {
  id: string;
  _type: string[];
  area: { id: string };
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}

export interface MetersResponse {
  count: number;
  results: MeterDto[];
}

export interface FetchMetersParams {
  limit?: number;
  offset?: number;
}

export const fetchMeters = async ({
  limit = 20,
  offset = 0,
}: FetchMetersParams = {}): Promise<MetersResponse> => {
  const { data } = await apiClient.get<MetersResponse>('/meters/', {
    params: { limit, offset },
  });
  return data;
};
