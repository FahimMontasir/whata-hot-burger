import React from 'react';

import {Touchable, Typography, OnlineImage} from '../../../common';

interface IProps {
  onPress?: () => void;
  uri?: string;
  title?: string;
}

const ServiceBox = ({
  onPress,
  uri = 'htps://www.truelifewellnessphysio.ca/wp-content/uploads/2019/01/True-Life-Wellness-and-Physiotherapy-Physiotherapy-Icon-PHOTO.jpg',
  title = 'Physiotherapy',
}: IProps) => {
  return (
    <Touchable
      pv="10px"
      ph="10px"
      mv="5px"
      mh="10px"
      radius="4px"
      elevation="3"
      width="155px"
      height="100px"
      onPress={onPress}>
      <OnlineImage source={{uri}} width={55} height={55} />
      <Typography h3 numberOfLines={1}>
        {title}
      </Typography>
    </Touchable>
  );
};
export default ServiceBox;
