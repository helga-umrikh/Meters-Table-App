import { useCallback, useState } from 'react';

import { deleteMeter } from '@/entities/meter';

export interface UseDeleteMeterState {
  isLoading: boolean;
  error: unknown;
  deletedId: string | undefined;
}

export type UseDeleteMeterTrigger = (meterId: string) => Promise<void>;

export const useDeleteMeter = (): [UseDeleteMeterTrigger, UseDeleteMeterState] => {
  const [state, setState] = useState<UseDeleteMeterState>({
    isLoading: false,
    error: undefined,
    deletedId: undefined,
  });

  const trigger = useCallback<UseDeleteMeterTrigger>(async (meterId) => {
    setState({ isLoading: true, error: undefined, deletedId: undefined });
    try {
      await deleteMeter(meterId);
      setState({ isLoading: false, error: undefined, deletedId: meterId });
    } catch (err) {
      setState({ isLoading: false, error: err, deletedId: undefined });
      throw err;
    }
  }, []);

  return [trigger, state];
};
