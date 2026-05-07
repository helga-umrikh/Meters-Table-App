import { AxiosError } from '@/shared/api';
import { type Area } from '@/entities/area';
import { type Meter } from '@/entities/meter';
import { Pagination } from '@/shared/ui';

import { MeterRow } from './MeterRow';
import {
  Table,
  THead,
  TBody,
  Th,
  TFooter,
  PlaceholderRow,
  PlaceholderCell,
  tableColumns,
} from './styles';

interface MetersTableProps {
  meters: Meter[];
  areas: Area[];
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDeleteMeter?: (meterId: string) => void;
  isMutating?: boolean;
  isLoading?: boolean;
  error?: unknown;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status
      ? `Ошибка ${status}: ${error.message}`
      : `Сетевая ошибка: ${error.message}`;
  }
  if (error instanceof Error) return error.message;
  return 'Неизвестная ошибка при загрузке данных';
};

export const MetersTable = ({
  meters,
  areas,
  total,
  pageSize,
  currentPage,
  onPageChange,
  onDeleteMeter,
  isMutating,
  isLoading,
  error,
}: MetersTableProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const areaById = new Map(areas.map((a) => [a.id, a]));
  const startIndex = (currentPage - 1) * pageSize;

  const handlePageChange = (page: number) => {
    onPageChange(Math.min(Math.max(1, page), totalPages));
  };

  const renderBodyContent = () => {
    if (error) {
      return (
        <PlaceholderRow>
          <PlaceholderCell colSpan={tableColumns.length} tone="error">
            {getErrorMessage(error)}
          </PlaceholderCell>
        </PlaceholderRow>
      );
    }
    if (isLoading && meters.length === 0) {
      return (
        <PlaceholderRow>
          <PlaceholderCell colSpan={tableColumns.length}>Загрузка…</PlaceholderCell>
        </PlaceholderRow>
      );
    }
    if (meters.length === 0) {
      return (
        <PlaceholderRow>
          <PlaceholderCell colSpan={tableColumns.length}>No data</PlaceholderCell>
        </PlaceholderRow>
      );
    }
    return meters.map((meter, index) => (
      <MeterRow
        key={meter.id}
        meter={meter}
        index={startIndex + index}
        area={areaById.get(meter.area.id)}
        onDelete={onDeleteMeter}
        disabled={isMutating}
      />
    ));
  };

  return (
    <Table>
      <THead>
        <tr>
          {tableColumns.map(({ label }) => (
            <Th key={label}>{label}</Th>
          ))}
        </tr>
      </THead>
      <TBody>{renderBodyContent()}</TBody>
      <TFooter>
        <tr>
          <td colSpan={tableColumns.length}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </td>
        </tr>
      </TFooter>
    </Table>
  );
};
