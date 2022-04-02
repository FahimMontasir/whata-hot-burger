import {Button} from '@rneui/base';
import styled from 'styled-components/native';

interface IProps {
  color?: string;
  variant?: string;
  width?: string;
}

//attention!
const AppButton = styled(Button).attrs<IProps>(p => ({
  raised: true,
  titleStyle: {
    color: p.theme.colors[p.color || 'white'],
    fontFamily: 'sans-serif-small',
  },
  buttonStyle: {
    backgroundColor: p.theme.colors[p.variant || 'primary'],
  },
  containerStyle: {
    width: p.width || '95%',
    borderRadius: 5,
  },
}))<IProps>``;
export default AppButton;
