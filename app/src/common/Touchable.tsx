import styled from 'styled-components/native';

interface IProps {
  mv?: string;
  mh?: string;
  pv?: string;
  ph?: string;
  row?: boolean;
  radius?: string;
  width?: string;
  height?: string;
  elevation?: string;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  color?:
    | 'secondary'
    | 'secondaryLite'
    | 'primary'
    | 'transparent'
    | 'gray'
    | 'grayDark'
    | 'white';
}

//attention!
const TouchableBox = styled.Pressable.attrs(p => ({
  android_ripple: {
    color: p.theme.colors.ripple,
  },
}))<IProps>`
  flex-direction: ${p => (p.row ? 'row' : 'column')};
  justify-content: ${p => (p.justify ? p.justify : 'center')};
  align-items: ${p => (p.align ? p.align : 'center')};
  background-color: ${p =>
    p.color ? p.theme.colors[p.color] : p.theme.colors.white};
  ${p =>
    p.elevation && {
      elevation: p.elevation,
    }}
  ${p =>
    p.height && {
      height: p.height,
    }}
  ${p =>
    p.width && {
      width: p.width,
    }}
      ${p =>
    p.radius && {
      borderRadius: p.radius,
    }}
      ${p =>
    p.mv && {
      marginTop: p.mv,
      marginBottom: p.mv,
    }}
      ${p =>
    p.mh && {
      marginRight: p.mh,
      marginLeft: p.mh,
    }}
      ${p =>
    p.pv && {
      paddingTop: p.pv,
      paddingBottom: p.pv,
    }}
      ${p =>
    p.ph && {
      paddingRight: p.ph,
      paddingLeft: p.ph,
    }};
`;
export default TouchableBox;
