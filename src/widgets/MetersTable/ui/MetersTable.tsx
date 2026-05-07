import { useState } from 'react';

import { type Area } from '@/entities/area';
import { type Meter } from '@/entities/meter';
import { Pagination } from '@/shared/ui';

import { MeterRow } from './MeterRow';
import { Table, THead, TBody, Th, TFooter, tableColumns } from './styles';

interface MetersTableProps {
  meters: Meter[];
  areas: Area[];
}

const PAGE_SIZE = 20;

export const MetersTable = ({ meters, areas }: MetersTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(meters.length / PAGE_SIZE));
  const pageMeters = meters.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getArea = (areaId: number): Area | undefined =>
    areas.find((area) => area.id === areaId);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
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
        {pageMeters.map((meter, index) => (
          <MeterRow
            key={meter.id}
            meter={meter}
            index={(currentPage - 1) * PAGE_SIZE + index}
            area={getArea(meter.area_id)}
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
