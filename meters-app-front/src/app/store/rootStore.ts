import { flow, types, type Instance } from 'mobx-state-tree';

import { fetchAreasByIds } from '@/entities/area';
import { AreasStore } from '@/entities/area/model/areasStore';
import { deleteMeter as apiDeleteMeter, fetchMeters } from '@/entities/meter';
import { MetersStore } from '@/entities/meter/model/metersStore';

export const RootStore = types
  .model('RootStore', {
    meters: types.optional(MetersStore, {}),
    areas: types.optional(AreasStore, { items: {} }),
  })
  .volatile(() => ({
    isLoadingPage: false,
    pageError: undefined as unknown,
    isMutating: false,
    mutationError: undefined as unknown,
  }))
  .actions((self) => {
    const loadPage = flow(function* (params: { limit?: number; offset?: number } = {}) {
      const limit = params.limit ?? self.meters.limit;
      const offset = params.offset ?? self.meters.offset;
      self.meters.setPage({ limit, offset });
      self.isLoadingPage = true;
      self.pageError = undefined;
      try {
        const metersRes = (yield fetchMeters({ limit, offset })) as Awaited<
          ReturnType<typeof fetchMeters>
        >;
        const areaIds = [...new Set(metersRes.results.map((m) => m.area.id))];
        const areasRes = (yield fetchAreasByIds(areaIds)) as Awaited<
          ReturnType<typeof fetchAreasByIds>
        >;
        self.meters.setItems(metersRes.results, metersRes.count);
        self.areas.upsertMany(areasRes.results);
      } catch (err) {
        self.pageError = err;
      } finally {
        self.isLoadingPage = false;
      }
    });

    const deleteMeter = flow(function* (meterId: string) {
      self.isMutating = true;
      self.mutationError = undefined;
      try {
        yield apiDeleteMeter(meterId);
        self.meters.removeById(meterId);
      } catch (err) {
        self.mutationError = err;
        throw err;
      } finally {
        self.isMutating = false;
      }
    });

    return { loadPage, deleteMeter };
  });

export type IRootStore = Instance<typeof RootStore>;

export const createRootStore = (): IRootStore => RootStore.create({});
