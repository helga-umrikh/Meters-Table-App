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

const cache = new Map<string, MetersListData>();
const subscribers = new Set<() => void>();

const cacheKey = (limit: number, offset: number) => `${limit}:${offset}`;

export const invalidateMetersCache = () => {
  cache.clear();
  subscribers.forEach((notify) => notify());
};

export const useMetersList = ({
  limit = 20,
  offset = 0,
  skip = false,
}: UseMetersListParams = {}): UseMetersListResult => {
  const key = cacheKey(limit, offset);
  const [data, setData] = useState<MetersListData | undefined>(() => cache.get(key));
  const [error, setError] = useState<unknown>();
  const [isFetching, setIsFetching] = useState(false);
  const reqIdRef = useRef(0);

  const fetcher = useCallback(
    async ({ force = false }: { force?: boolean } = {}) => {
      if (!force) {
        const cached = cache.get(key);
        if (cached) {
          setData(cached);
          setError(undefined);
          return;
        }
      }

      const reqId = ++reqIdRef.current;
      setIsFetching(true);
      setError(undefined);
      try {
        const meters = await fetchMeters({ limit, offset });
        const areaIds = [...new Set(meters.results.map((m) => m.area.id))];
        const areas = await fetchAreasByIds(areaIds);

        if (reqId !== reqIdRef.current) return;
        const next: MetersListData = {
          meters: meters.results,
          areas: areas.results,
          total: meters.count,
        };
        cache.set(key, next);
        setData(next);
      } catch (err) {
        if (reqId !== reqIdRef.current) return;
        setError(err);
      } finally {
        if (reqId === reqIdRef.current) setIsFetching(false);
      }
    },
    [key, limit, offset]
  );

  useEffect(() => {
    if (skip) return;
    fetcher();
  }, [fetcher, skip]);

  useEffect(() => {
    const onInvalidate = () => {
      setData(undefined);
      if (!skip) fetcher({ force: true });
    };
    subscribers.add(onInvalidate);
    return () => {
      subscribers.delete(onInvalidate);
    };
  }, [fetcher, skip]);

  return {
    data,
    isLoading: isFetching && data === undefined,
    isFetching,
    error,
    refetch: () => fetcher({ force: true }),
  };
};
