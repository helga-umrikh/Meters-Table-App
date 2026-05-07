import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { createRootStore, type IRootStore } from './rootStore';

const StoreContext = createContext<IRootStore | null>(null);

interface StoreProviderProps {
  children: ReactNode;
  store?: IRootStore;
}

export const StoreProvider = ({ children, store }: StoreProviderProps) => {
  const value = useMemo(() => store ?? createRootStore(), [store]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): IRootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

export const useMetersStore = () => useStore().meters;
export const useAreasStore = () => useStore().areas;
