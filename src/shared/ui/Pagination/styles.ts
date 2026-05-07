import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 8px 16px;
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--button-border);
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? 'var(--button-active-bg)' : 'var(--bg)'};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) =>
      $active ? 'var(--button-active-bg)' : 'var(--button-hover-bg)'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const DotsWrapper = styled.span`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--body-size);
  color: var(--text-secondary);
`;
