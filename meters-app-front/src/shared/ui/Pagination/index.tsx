import { Text } from '../Text';

import { PageBtn, PaginationWrapper, DotsWrapper } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BOUNDARY_COUNT = 1;
const SIBLING_COUNT = 1;

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const siblingsStart = Math.max(
    Math.min(
      current - SIBLING_COUNT,
      total - BOUNDARY_COUNT - SIBLING_COUNT * 2 - 1
    ),
    BOUNDARY_COUNT + 2
  );
  const siblingsEnd = Math.min(
    Math.max(current + SIBLING_COUNT, BOUNDARY_COUNT + SIBLING_COUNT * 2 + 2),
    total - BOUNDARY_COUNT - 1
  );

  const items: (number | '...')[] = [];

  for (let i = 1; i <= BOUNDARY_COUNT; i++) items.push(i);

  if (siblingsStart > BOUNDARY_COUNT + 2) {
    items.push('...');
  } else if (BOUNDARY_COUNT + 1 < total - BOUNDARY_COUNT) {
    items.push(BOUNDARY_COUNT + 1);
  }

  for (let i = siblingsStart; i <= siblingsEnd; i++) items.push(i);

  if (siblingsEnd < total - BOUNDARY_COUNT - 1) {
    items.push('...');
  } else if (total - BOUNDARY_COUNT > BOUNDARY_COUNT) {
    items.push(total - BOUNDARY_COUNT);
  }

  for (let i = total - BOUNDARY_COUNT + 1; i <= total; i++) items.push(i);

  return items;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <PaginationWrapper>
    {buildPages(currentPage, totalPages).map((page, index) =>
      page === '...' ? (
        <DotsWrapper key={`dots-${index}`}>...</DotsWrapper>
      ) : (
        <PageBtn
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          <Text variant="button">{page}</Text>
        </PageBtn>
      )
    )}
  </PaginationWrapper>
);
