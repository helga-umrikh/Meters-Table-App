import { useEffect } from 'react';

import { useStore } from '@/app/store';
import { type Area } from '@/entities/area';
import { type Meter } from '@/entities/meter';

export interface UseMetersListParams {
  limit?: number;
  offset?: number;
  skip?: boolean;
}

export const useMetersList = ({ limit = 20, offset = 0, skip = false }: UseMetersListParams = {}) => {
  const store = useStore();

  useEffect(() => {
    if (skip) return;
    store.loadPage({ limit, offset });
  }, [store, limit, offset, skip]);

  return {
    meters: store.meters.items as unknown as Meter[],
    areas: store.areas.list as unknown as Area[],
    total: store.meters.total,
    isLoading: store.isLoadingPage,
    error: store.pageError,
    refetch: () => store.loadPage({ limit, offset }),
  };
};
