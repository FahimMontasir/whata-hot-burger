import React from 'react';
import {Icon} from '@rneui/base';
import styled from 'styled-components/native';
import {Box} from '../../../common';

const LeftComponent = ({navigation}: any) => {
  return (
    <Box row>
      <StyledIcon
        name="menuunfold"
        type="antdesign"
        onPress={() => navigation.toggleDrawer()}
      />
    </Box>
  );
};
export default LeftComponent;

export const StyledIcon = styled(Icon).attrs(p => ({
  tvParallaxProperties: true,
  size: 28,
  color: p.theme.colors.black,
  containerStyle: {
    padding: 10,
  },
}))``;
