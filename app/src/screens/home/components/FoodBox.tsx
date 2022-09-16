import React from 'react';
import {Icon} from '@rneui/base';
import styled from 'styled-components/native';
import {Touchable, Typography} from '../../../common';

interface IProps {
  iconName: string;
  iconType: string;
  title: string;
  onPress: () => void;
  higLighted?: boolean;
}

const FoodBox = ({
  iconName = 'hipchat',
  iconType = 'fontisto',
  title = 'Patient Portal',
  onPress,
  higLighted,
}: IProps) => {
  return (
    <Touchable
      pv="10px"
      ph="10px"
      mv="10px"
      mh="15px"
      radius="4px"
      elevation="3"
      width="120px"
      height="110px"
      color={higLighted ? 'primary' : 'white'}
      onPress={onPress}>
      <StyledIcon name={iconName} type={iconType} higLighted={higLighted} />
      <Typography h3 color={higLighted ? 'secondary' : 'heading'}>
        {title.replace(/^./, title[0].toUpperCase())}
      </Typography>
    </Touchable>
  );
};
export default FoodBox;

interface IconProp {
  higLighted?: boolean;
}

const StyledIcon = styled(Icon).attrs<IconProp>(p => ({
  tvParallaxProperties: true,
  size: 40,
  color: p.higLighted ? p.theme.colors.white : p.theme.colors.primary,
  containerStyle: {
    paddingBottom: 10,
  },
}))<IconProp>``;
