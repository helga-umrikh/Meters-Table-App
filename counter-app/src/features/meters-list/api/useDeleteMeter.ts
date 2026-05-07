import { useCallback } from 'react';

import { useStore } from '@/app/store';

export const useDeleteMeter = () => {
  const store = useStore();

  const trigger = useCallback(
    (meterId: string) => store.deleteMeter(meterId),
    [store]
  );

  return {
    trigger,
    isLoading: store.isMutating,
    error: store.mutationError,
  };
};
