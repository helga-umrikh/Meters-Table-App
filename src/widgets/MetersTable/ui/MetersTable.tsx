import { type Area } from '@/entities/area';
import { type Meter } from '@/entities/meter';
import { Pagination } from '@/shared/ui';

import { MeterRow } from './MeterRow';
import { Table, THead, TBody, Th, TFooter, tableColumns } from './styles';

interface MetersTableProps {
  meters: Meter[];
  areas: Area[];
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDeleteMeter?: (meterId: string) => void;
  isMutating?: boolean;
}

export const MetersTable = ({
  meters,
  areas,
  total,
  pageSize,
  currentPage,
  onPageChange,
  onDeleteMeter,
  isMutating,
}: MetersTableProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const areaById = new Map(areas.map((a) => [a.id, a]));
  const startIndex = (currentPage - 1) * pageSize;

  const handlePageChange = (page: number) => {
    onPageChange(Math.min(Math.max(1, page), totalPages));
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
      <TBody>
        {meters.map((meter, index) => (
          <MeterRow
            key={meter.id}
            meter={meter}
            index={startIndex + index}
            area={areaById.get(meter.area.id)}
            onDelete={onDeleteMeter}
            disabled={isMutating}
          />
        ))}
      </TBody>
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
