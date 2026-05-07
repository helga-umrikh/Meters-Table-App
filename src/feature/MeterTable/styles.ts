import styled, { css } from 'styled-components';
import { Text } from '@/shared/ui';

const borderStyle = '1px solid var(--table-border)';

export const tableColumns = [
  { label: '№', width: '3.43%' },
  { label: 'Тип', width: '8.57%' },
  { label: 'Дата установки', width: '11.43%' },
  { label: 'Автоматический', width: '9.14%' },
  { label: 'Текущие показания', width: '10.43%' },
  { label: 'Адрес', width: '30.71%' },
  { label: 'Примечание', width: '26.29%' },
];

const columnWidthRules = css`
  ${tableColumns.map(
    ({ width }, i) => css`
      & > thead > tr > *:nth-child(${i + 1}),
      & > tbody > tr > *:nth-child(${i + 1}) {
        width: ${width};
      }
    `
  )}
`;

export const Table = styled.table`
  width: 100%;
  max-width: 1400px;
  overflow: hidden;
  background: var(--bg);

  ${columnWidthRules}
`;

export const THead = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
  border-radius: 12px 12px 0 0;
  border-collapse: separate;
  border-spacing: 0;
  border-top: ${borderStyle};
  border-left: ${borderStyle};
  border-right: ${borderStyle};
  background: var(--table-header-bg);
`;

export const TBody = styled.tbody`
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1;
  min-height: 0;
  max-height: 864px;
  border-left: ${borderStyle};
  border-right: ${borderStyle};

  & > tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`;

export const TFooter = styled.tfoot`
  display: table;
  width: 100%;
  table-layout: fixed;
  border-radius: 0 0 12px 12px;
  border-collapse: separate;
  border-spacing: 0;
  border-bottom: ${borderStyle};
  border-left: ${borderStyle};
  border-right: ${borderStyle};
  background: var(--bg);
`;

export const Th = styled(Text).attrs({
  forwardedAs: 'th',
  variant: 'heading4',
  color: 'secondary',
})`
  text-align: left;
  padding: 8px 16px;
  white-space: nowrap;
`;

export const Td = styled(Text).attrs<{ variant?: string; color?: string }>(
  ({ variant, color }) => ({
    forwardedAs: 'td',
    variant: variant ?? 'body',
    color: color ?? 'primary',
  })
)`
  padding: 10px 16px;
  border-bottom: ${borderStyle};
  white-space: normal;
`;
