import PageWrapper from '@/components/PageWrapper';
import Text from '@/shared/ui/Text';

import { MetersTable } from '@/feature/MeterTable';
import { mockMeters } from '@/mocks/meters';

export default function HomePage() {
  return (
    <PageWrapper>
      <Text variant="heading2" style={{ marginBottom: 16 }}>Список счётчиков</Text>

      <MetersTable meters={mockMeters} />
    </PageWrapper>
  );
}
