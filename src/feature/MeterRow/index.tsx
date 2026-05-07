import type { Meter, Area } from '@/types';
import { Td } from '../MeterTable/styles';
import FireIcon from '@/assets/fire.svg?react';
import ColdWaterIcon from '@/assets/cold-water.svg?react';
import HotWaterIcon from '@/assets/hot-water.svg?react';
import ElectricityIcon from '@/assets/electricity.svg?react';
import TrashIcon from '@/assets/trash.svg?react';
import type { ComponentType } from 'react';
import { Row, TypeCell, DescriptionCell, DeleteBtn } from './styles';

interface MeterRowProps {
  meter: Meter;
  index: number;
  area: Area | undefined;
  disabled?: boolean;
}

const TYPE_LABELS: Record<Meter['_type'], string> = {
  heatSupply: 'ТПЛ',
  coldWaterAreaMeter: 'ХВС',
  hotWaterAreaMeter: 'ГВС',
  electricitySupply: 'ЭЛДТ',
};

const TYPE_LOGOS: Record<Meter['_type'], ComponentType> = {
  heatSupply: FireIcon,
  coldWaterAreaMeter: ColdWaterIcon,
  hotWaterAreaMeter: HotWaterIcon,
  electricitySupply: ElectricityIcon,
};

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
};

const formatArea = (area: Area | undefined): string => area?.address ?? '—';

export const MeterRow = ({ meter, index, area, disabled }: MeterRowProps) => {
  const Logo = TYPE_LOGOS[meter._type];

  const handleDelete = () => {
    console.log('delete', meter.id);
  };

  return (
    <Row>
      <Td color="secondary">{index + 1}</Td>
      <Td>
        <TypeCell>
          <Logo />
          {TYPE_LABELS[meter._type]}
        </TypeCell>
      </Td>
      <Td>{formatDate(meter.installation_date)}</Td>
      <Td>{meter.is_automatic ? 'да' : 'нет'}</Td>
      <Td>{meter.initial_values}</Td>
      <Td>{formatArea(area)}</Td>
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
