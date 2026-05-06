import PageWrapper from '../../components/PageWrapper';
import Text from '../../components/Text';

export default function HomePage() {
  return (
    <PageWrapper>
      <Text variant="heading2">Список счётчиков</Text>
      <Text variant="heading4">Холодная вода</Text>
      <Text variant="body">Введите показания</Text>
      <Text variant="body" color="secondary">Обязательное поле</Text>
    </PageWrapper>
  );
}
