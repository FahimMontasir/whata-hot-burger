import React from 'react';
import {useWindowDimensions} from 'react-native';

import {ServiceProps} from '../../types/routeTypes';
import {Container, OnlineImage} from '../../common';

interface IProps extends ServiceProps {
  uri: string;
}

const ServiceScreen = ({
  // route,
  uri = 'htps://www.truelifewellnessphysio.ca/wp-content/uploads/2019/01/True-Life-Wellness-and-Physiotherapy-Physiotherapy-Icon-PHOTO.jpg',
}: IProps) => {
  const {width} = useWindowDimensions();
  // const {serviceName} = route.params;

  return (
    <Container align="center">
      <OnlineImage source={{uri}} width={width} height={500} />
    </Container>
  );
};
export default ServiceScreen;
