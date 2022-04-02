import {Input} from '@rneui/base';
import styled from 'styled-components/native';

interface IProps {
  rightIconName?: string;
  leftIconName?: string;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
  mh?: number;
  mv?: number;
  mt?: number;
}

const AppInput = styled(Input).attrs<IProps>(p => ({
  rightIcon: {
    type: p.rightIconName && 'font-awesome',
    name: p.rightIconName && p.rightIconName,
    size: p.rightIconName && 20,
    color: p.rightIconName && p.theme.colors.grayDark,
    onPress: p.rightIconName && p.onPressRightIcon,
  },
  leftIcon: {
    type: p.leftIconName && 'font-awesome',
    name: p.leftIconName && p.leftIconName,
    size: p.leftIconName && 20,
    color: p.leftIconName && p.theme.colors.grayDark,
    onPress: p.leftIconName && p.onPressLeftIcon,
  },
  inputContainerStyle: {
    backgroundColor: p.theme.colors.gray,
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    marginHorizontal: p.mh ? p.mh : 0,
    marginVertical: p.mv ? p.mv : 0,
    marginTop: p.mt ? p.mt : 0,
  },
}))<IProps>``;

export default AppInput;
