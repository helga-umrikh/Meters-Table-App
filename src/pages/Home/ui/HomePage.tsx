import { useState } from 'react';

import { useDeleteMeter, useMetersList } from '@/features/meters-list';
import { PageWrapper, Text } from '@/shared/ui';
import { MetersTable } from '@/widgets/MetersTable';

const PAGE_SIZE = 20;

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const { data, isLoading, error, refetch } = useMetersList({
    limit: PAGE_SIZE,
    offset,
  });
  const [deleteMeter, deleteState] = useDeleteMeter();

  const handleDelete = async (meterId: string) => {
    try {
      await deleteMeter(meterId);
      refetch();
    } catch (err) {
      console.error('[delete] failed', err);
    }
  };

  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>
        Список счётчиков
      </Text>

      {Boolean(error) && (
        <Text variant="body" color="secondary" style={{ marginBottom: 12 }}>
          Не удалось загрузить данные
        </Text>
      )}

      {isLoading && !data ? (
        <Text variant="body" color="secondary">
          Загрузка…
        </Text>
      ) : (
        <MetersTable
          meters={data?.meters ?? []}
          areas={data?.areas ?? []}
          total={data?.total ?? 0}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onDeleteMeter={handleDelete}
          isMutating={deleteState.isLoading}
        />
      )}
    </PageWrapper>
  );
}
