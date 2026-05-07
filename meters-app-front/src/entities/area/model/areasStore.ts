import { types, type Instance } from 'mobx-state-tree';

import { AreaModel } from './areaModel';

export const AreasStore = types
  .model('AreasStore', {
    items: types.map(AreaModel),
  })
  .views((self) => ({
    getById(id: string) {
      return self.items.get(id);
    },
    get list() {
      return Array.from(self.items.values());
    },
  }))
  .actions((self) => ({
    upsertMany(areas: Instance<typeof AreaModel>[] | unknown[]) {
      for (const area of areas as { id: string }[]) {
        self.items.put(area as never);
      }
    },
    clear() {
      self.items.clear();
    },
  }));

export type IAreasStore = Instance<typeof AreasStore>;
