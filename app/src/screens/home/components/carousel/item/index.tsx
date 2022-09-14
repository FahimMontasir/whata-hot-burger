import React from 'react';
import {LongPressGestureHandler} from 'react-native-gesture-handler';

import Animated, {AnimateProps} from 'react-native-reanimated';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import type {ViewProps} from 'react-native';
import {CaroImageItem} from './image';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
}

export const Item: React.FC<Props> = ({style, source}) => {
  return (
    <LongPressGestureHandler>
      <Animated.View style={styles.container}>
        <CaroImageItem style={style} source={source} />
      </Animated.View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
