import { types, type Instance } from 'mobx-state-tree';

import { AreasStore } from '@/entities/area/model/areasStore';
import { MetersStore } from '@/entities/meter/model/metersStore';

export const RootStore = types.model('RootStore', {
  meters: types.optional(MetersStore, {}),
  areas: types.optional(AreasStore, { items: {} }),
});

export type IRootStore = Instance<typeof RootStore>;

export const createRootStore = (): IRootStore => RootStore.create({});
