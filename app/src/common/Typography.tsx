import styled, {css} from 'styled-components/native';

interface IProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  caption?: boolean;
  body?: boolean;
  color?: 'secondary' | 'heading';
  center?: boolean;
  m?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
}

//attention!
const Typography = styled.Text<IProps>`
  color: ${p =>
    p.color
      ? p.theme.typography.color[p.color]
      : p.theme.typography.color.primary};

  ${p => p.align && {alignSelf: p.align}};

  ${p =>
    p.m &&
    css`
      margin: ${p.m};
    `};

  ${p =>
    p.h1 &&
    css`
      font-size: ${p.theme.typography.size.h1};
      font-weight: 400;
    `};

  ${p =>
    p.h2 &&
    css`
      font-size: ${p.theme.typography.size.h2};
    `};

  ${p =>
    p.h3 &&
    css`
      font-size: ${p.theme.typography.size.h3};
    `};

  ${p =>
    p.body &&
    css`
      font-size: ${p.theme.typography.size.body};
    `};

  ${p =>
    p.caption &&
    css`
      font-size: ${p.theme.typography.size.caption};
      color: ${p.theme.typography.color.caption};
    `};
`;
export default Typography;
