import styled from 'styled-components';

export const Row = styled.tr`
  height: 52px;

  &:hover {
    background: var(--grey-10);
  }

  &:hover .delete-btn {
    opacity: 1;
  }
`;

export const TypeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DescriptionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const DeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  gap: 8px;
  width: 40px;
  min-width: 40px;
  height: 40px;
  background: var(--delete-button);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s,
    background-color 0.15s;

  &:hover:not(:disabled) {
    background: var(--delete-button-hover);
  }

  &:disabled {
    background: var(--grey-25);
    cursor: default;
  }

  &:disabled svg path {
    fill: var(--disabled-delete-button);
  }
`;
