import { mockAreas } from '@/entities/area';
import { mockMeters } from '@/entities/meter';
import { PageWrapper, Text } from '@/shared/ui';
import { MetersTable } from '@/widgets/MetersTable';

export function HomePage() {
  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>
        Список счётчиков
      </Text>

      <MetersTable meters={mockMeters} areas={mockAreas} />
    </PageWrapper>
  );
}
