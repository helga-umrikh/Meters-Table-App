import { type CSSProperties, type ElementType, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'body' | 'heading2' | 'heading4' | 'button';
type Color = 'primary' | 'secondary';

const colors: Record<Color, string> = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)',
};

const variants: Record<Variant, ReturnType<typeof css>> = {
  body: css`
    font-size: var(--body-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
  `,
  heading2: css`
    font-size: var(--h2-size);
    font-weight: var(--h-weight);
    line-height: var(--h2-line-height);
  `,
  heading4: css`
    font-size: var(--h4-size);
    font-weight: var(--h-weight);
    line-height: var(--h4-line-height);
    vertical-align: middle;
  `,
  button: css`
    font-size: var(--button-size);
    font-weight: var(--button-weight);
    text-align: center;
    vertical-align: middle;
  `,
};

const defaultTag: Record<Variant, ElementType> = {
  body: 'p',
  heading2: 'h2',
  heading4: 'h4',
  button: 'span',
};

interface TextProps {
  variant?: Variant;
  color?: Color;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const StyledText = styled.span<{ $variant: Variant; $color: Color }>`
  font-family: var(--font);
  letter-spacing: 0;
  margin: 0;
  color: ${({ $color }) => colors[$color]};
  ${({ $variant }) => variants[$variant]}
`;

export default function Text({
  variant = 'body',
  color = 'primary',
  as,
  children,
  className,
  style,
}: TextProps) {
  return (
    <StyledText
      as={as ?? defaultTag[variant]}
      $variant={variant}
      $color={color}
      className={className}
      style={style}
    >
      {children}
    </StyledText>
  );
}
