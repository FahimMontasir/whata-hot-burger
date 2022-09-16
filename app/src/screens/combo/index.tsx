import React from 'react';
import {useWindowDimensions} from 'react-native';

import {ComboProps} from '../../types/routeTypes';
import {Container, OnlineImage} from '../../common';

const ComboScreen = ({route}: ComboProps) => {
  const {width} = useWindowDimensions();
  const {id, photoUrls} = route.params;
  console.log(id);

  return (
    <Container align="center">
      <OnlineImage source={photoUrls[0]} width={width} height={500} />
    </Container>
  );
};
export default ComboScreen;
