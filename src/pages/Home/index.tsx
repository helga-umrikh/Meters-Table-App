import PageWrapper from '@/components/PageWrapper';
import { MetersTable } from '@/feature/MeterTable';
import { mockMeters } from '@/mocks/meters';
import { Text } from '@/shared/ui';

export default function HomePage() {
  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>
        Список счётчиков
      </Text>

      <MetersTable meters={mockMeters} />
    </PageWrapper>
  );
}
