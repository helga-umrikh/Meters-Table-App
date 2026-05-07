import type { ComponentType } from 'react';

import { type Area } from '@/entities/area';
import { type KnownMeterKind, type Meter } from '@/entities/meter';
import ColdWaterIcon from '@/shared/assets/cold-water.svg?react';
import HotWaterIcon from '@/shared/assets/hot-water.svg?react';
import TrashIcon from '@/shared/assets/trash.svg?react';

import { Row, TypeCell, DescriptionCell, DeleteBtn } from './MeterRow.styles';
import { Td } from './styles';

interface MeterRowProps {
  meter: Meter;
  index: number;
  area: Area | undefined;
  disabled?: boolean;
  onDelete?: (meterId: string) => void;
}

const TYPE_LABELS: Partial<Record<KnownMeterKind, string>> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
};

const TYPE_LOGOS: Partial<Record<KnownMeterKind, ComponentType>> = {
  ColdWaterAreaMeter: ColdWaterIcon,
  HotWaterAreaMeter: HotWaterIcon,
};

const getPrimaryKind = (types: string[]): KnownMeterKind | undefined =>
  types.find((t) => t !== 'AreaMeter') as KnownMeterKind | undefined;

const formatDate = (date: string): string => {
  const d = date.split('T')[0];
  const [year, month, day] = d.split('-');
  return `${day}.${month}.${year}`;
};

const formatAddress = (area: Area | undefined): string => {
  if (!area) return '—';
  return `${area.house.address}, ${area.str_number_full}`;
};

export const MeterRow = ({ meter, index, area, disabled, onDelete }: MeterRowProps) => {
  const kind = getPrimaryKind(meter._type);
  const Logo = kind ? TYPE_LOGOS[kind] : undefined;
  const label = kind ? TYPE_LABELS[kind] : '—';

  const handleDelete = () => onDelete?.(meter.id);

  return (
    <Row>
      <Td color="secondary">{index + 1}</Td>
      <Td>
        <TypeCell>
          {Logo && <Logo />}
          {label}
        </TypeCell>
      </Td>
      <Td>{formatDate(meter.installation_date)}</Td>
      <Td>{meter.is_automatic ? 'да' : 'нет'}</Td>
      <Td>{meter.initial_values.join(', ')}</Td>
      <Td>{formatAddress(area)}</Td>
      <Td color="secondary">
        <DescriptionCell>
          <span>{meter.description}</span>
          <DeleteBtn
            className="delete-btn"
            onClick={handleDelete}
            disabled={disabled}
            aria-label="Удалить"
          >
            <TrashIcon />
          </DeleteBtn>
        </DescriptionCell>
      </Td>
    </Row>
  );
};
