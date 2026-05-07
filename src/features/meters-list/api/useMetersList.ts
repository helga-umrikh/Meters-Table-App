import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchAreasByIds, type AreaDto } from '@/entities/area';
import { fetchMeters, type MeterDto } from '@/entities/meter';

export interface MetersListData {
  meters: MeterDto[];
  areas: AreaDto[];
  total: number;
}

export interface UseMetersListParams {
  limit?: number;
  offset?: number;
  skip?: boolean;
}

export interface UseMetersListResult {
  data: MetersListData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => void;
}

export const useMetersList = ({
  limit = 20,
  offset = 0,
  skip = false,
}: UseMetersListParams = {}): UseMetersListResult => {
  const [data, setData] = useState<MetersListData>();
  const [error, setError] = useState<unknown>();
  const [isFetching, setIsFetching] = useState(false);
  const reqIdRef = useRef(0);

  const fetcher = useCallback(async () => {
    const reqId = ++reqIdRef.current;
    setIsFetching(true);
    setError(undefined);
    try {
      const meters = await fetchMeters({ limit, offset });
      const areaIds = [...new Set(meters.results.map((m) => m.area.id))];
      const areas = await fetchAreasByIds(areaIds);

      if (reqId !== reqIdRef.current) return;
      setData({ meters: meters.results, areas: areas.results, total: meters.count });
    } catch (err) {
      if (reqId !== reqIdRef.current) return;
      setError(err);
    } finally {
      if (reqId === reqIdRef.current) setIsFetching(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    if (skip) return;
    fetcher();
  }, [fetcher, skip]);

  return {
    data,
    isLoading: isFetching && data === undefined,
    isFetching,
    error,
    refetch: fetcher,
  };
};
