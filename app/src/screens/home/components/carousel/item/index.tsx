import React from 'react';
import {LongPressGestureHandler} from 'react-native-gesture-handler';

import Animated, {AnimateProps} from 'react-native-reanimated';
import type {StyleProp, ViewStyle} from 'react-native';
import type {ViewProps} from 'react-native';
import {SBImageItem} from './image';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index: number;
  pretty?: boolean;
}

export const SBItem: React.FC<Props> = ({style, index}) => {
  return (
    <LongPressGestureHandler>
      <Animated.View style={{flex: 1}}>
        <SBImageItem style={style} index={index} />
      </Animated.View>
    </LongPressGestureHandler>
  );
};
