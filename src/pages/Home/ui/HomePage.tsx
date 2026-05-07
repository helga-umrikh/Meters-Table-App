import { useEffect } from 'react';

import { mockAreas } from '@/entities/area';
import { mockMeters } from '@/entities/meter';
import { useDeleteMeter, useMetersList } from '@/features/meters-list';
import { PageWrapper, Text } from '@/shared/ui';
import { MetersTable } from '@/widgets/MetersTable';

export function HomePage() {
  const { data, isLoading, error, refetch } = useMetersList({ limit: 20, offset: 0 });
  const [deleteMeter, deleteState] = useDeleteMeter();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      console.error('[useMetersList] error', error);
      return;
    }
    if (!data) return;

    const addressByAreaId = new Map(data.areas.map((a) => [a.id, a]));
    const rows = data.meters.map((m) => {
      const area = addressByAreaId.get(m.area.id);
      return {
        meterId: m.id,
        street: area?.house.address ?? '—',
        houseId: area?.house.id ?? '—',
        apartment: area?.str_number_full ?? '—',
      };
    });

    console.log('[useMetersList] data', data);
    console.table(rows);
  }, [data, isLoading, error]);

  const handleDeleteFirst = async () => {
    if (!data || data.meters.length === 0) return;
    const target = data.meters[0];
    console.log('[useDeleteMeter] deleting', target.id);
    await deleteMeter(target.id);
    console.log('[useDeleteMeter] deleted', target.id);
    refetch();
  };

  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>
        Список счётчиков
      </Text>

      <button
        type="button"
        onClick={handleDeleteFirst}
        disabled={!data || deleteState.isLoading}
        style={{ marginBottom: 12 }}
      >
        {deleteState.isLoading ? 'Удаление…' : 'Удалить первый счётчик (тест)'}
      </button>

      <MetersTable meters={mockMeters} areas={mockAreas} />
    </PageWrapper>
  );
}
