import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useDeleteMeter, useMetersList } from '@/features/meters-list';
import { PageWrapper, Text } from '@/shared/ui';
import { MetersTable } from '@/widgets/MetersTable';

const PAGE_SIZE = 20;

export const HomePage = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const { meters, areas, total, isLoading, error } = useMetersList({
    limit: PAGE_SIZE,
    offset,
  });
  const { trigger: deleteMeter, isLoading: isMutating } = useDeleteMeter();

  const handleDelete = async (meterId: string) => {
    try {
      await deleteMeter(meterId);
    } catch (err) {
      console.error('[delete] failed', err);
    }
  };

  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>
        Список счётчиков
      </Text>

      <MetersTable
        meters={meters}
        areas={areas}
        total={total}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onDeleteMeter={handleDelete}
        isMutating={isMutating}
        isLoading={isLoading}
        error={error}
      />
    </PageWrapper>
  );
});
