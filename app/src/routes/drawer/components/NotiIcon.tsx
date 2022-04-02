import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Badge} from '@rneui/base';

interface IProps {
  color: string;
  value: number;
}

const NotiIcon = ({color, value}: IProps) => {
  return (
    <>
      <Ionicons name="notifications" size={30} color={color} />
      <Badge
        value={value}
        status="error"
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          position: 'absolute',
          top: 4,
          left: 4,
        }}
      />
    </>
  );
};
export default NotiIcon;
