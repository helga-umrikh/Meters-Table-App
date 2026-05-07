import { types, type Instance } from 'mobx-state-tree';

import { MeterModel } from './meterModel';

export const MetersStore = types
  .model('MetersStore', {
    items: types.array(MeterModel),
    total: types.optional(types.number, 0),
    limit: types.optional(types.number, 20),
    offset: types.optional(types.number, 0),
  })
  .views((self) => ({
    get count() {
      return self.items.length;
    },
    getById(id: string) {
      return self.items.find((m) => m.id === id);
    },
  }))
  .actions((self) => ({
    setPage({ limit, offset }: { limit?: number; offset?: number }) {
      if (limit !== undefined) self.limit = limit;
      if (offset !== undefined) self.offset = offset;
    },
    setItems(items: unknown[], total: number) {
      self.items.replace(items as never);
      self.total = total;
    },
    appendItems(items: unknown[]) {
      for (const it of items) self.items.push(it as never);
    },
    removeById(id: string) {
      const idx = self.items.findIndex((m) => m.id === id);
      if (idx !== -1) {
        self.items.splice(idx, 1);
        if (self.total > 0) self.total -= 1;
      }
    },
    clear() {
      self.items.clear();
      self.total = 0;
    },
  }));

export type IMetersStore = Instance<typeof MetersStore>;
