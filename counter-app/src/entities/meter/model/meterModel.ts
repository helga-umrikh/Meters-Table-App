import { types, type Instance, type SnapshotIn } from 'mobx-state-tree';

const AreaRef = types.model('MeterAreaRef', {
  id: types.string,
});

export const MeterModel = types.model('Meter', {
  id: types.identifier,
  _type: types.array(types.string),
  area: AreaRef,
  is_automatic: types.maybeNull(types.boolean),
  communication: types.maybe(types.string),
  description: types.optional(types.string, ''),
  serial_number: types.optional(types.string, ''),
  installation_date: types.string,
  brand_name: types.maybeNull(types.string),
  model_name: types.maybeNull(types.string),
  initial_values: types.optional(types.array(types.number), []),
});

export type IMeter = Instance<typeof MeterModel>;
export type MeterSnapshotIn = SnapshotIn<typeof MeterModel>;
