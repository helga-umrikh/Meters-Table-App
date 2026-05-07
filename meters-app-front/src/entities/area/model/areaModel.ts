import { types, type Instance, type SnapshotIn } from 'mobx-state-tree';

export const HouseModel = types.model('House', {
  id: types.identifier,
  address: types.string,
  fias_addrobjs: types.optional(types.array(types.string), []),
});

export const AreaModel = types.model('Area', {
  id: types.identifier,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  house: HouseModel,
});

export type IHouse = Instance<typeof HouseModel>;
export type IArea = Instance<typeof AreaModel>;
export type AreaSnapshotIn = SnapshotIn<typeof AreaModel>;
