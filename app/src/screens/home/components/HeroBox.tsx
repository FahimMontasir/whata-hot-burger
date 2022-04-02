/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {Avatar} from '@rneui/base';
import styled, {css} from 'styled-components/native';

import {Box, Button, Typography} from '../../../common';

const {width} = Dimensions.get('window');
const boxWidth = `${width / 1.1}px`;

//attention!
const HeroBox = () => {
  return (
    <Box
      justify="space-evenly"
      align="flex-start"
      color="secondaryLite"
      height="165px"
      width={boxWidth}
      mv="15px"
      ph="15px"
      pv="15px"
      radius="17px">
      <Typography numberOfLines={2} h1>
        Early protection for family health and safety
      </Typography>
      <Button title="Read more" width="40%" />

      <Avatar
        source={{
          uri: 'https://www.cdc.gov/diabetes/images/library/spotlights/Male-doctor-smiling-portrait-close-up-Med-Res-72991363.jpg',
        }}
        rounded
        size="large"
        containerStyle={{
          position: 'absolute',
          right: 40,
          bottom: 15,
        }}
        renderPlaceholderContent={
          <Avatar
            size="large"
            rounded
            source={require('../../../assets/images/doctor.png')}
          />
        }
        placeholderStyle={{backgroundColor: 'transparent'}}
      />

      <Particle top />
      <Particle bottom />
    </Box>
  );
};
export default HeroBox;

//attention!
interface IParticle {
  top?: boolean;
  bottom?: boolean;
}
const Particle = styled.Image.attrs({
  source: require('../../../assets/images/squareParticle.png'),
})<IParticle>`
  position: absolute;
  z-index: -1;
  ${p =>
    p.top &&
    css`
      top: 20px;
      left: 20px;
    `}
  ${p =>
    p.bottom &&
    css`
      bottom: 20px;
      right: 20px;
    `}
`;
