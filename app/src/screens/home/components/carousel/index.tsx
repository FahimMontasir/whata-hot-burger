import * as React from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import {AnimatedStyleProp, interpolate} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {Item} from './item';

type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;
const PAGE_WIDTH = Dimensions.get('window').width;

const data = [
  require('../../../../assets/images/caro2.png'),
  require('../../../../assets/images/caro1.jpeg'),
  require('../../../../assets/images/caro3.jpg'),
];

export default function CarouselBox() {
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{scale}],
      zIndex,
      opacity,
    };
  }, []);

  return (
    <View>
      <Carousel
        loop
        autoPlay
        style={styles.container}
        width={PAGE_WIDTH * 0.9}
        height={280 * 0.7}
        data={data}
        renderItem={({item}) => {
          return <Item key={item} source={item} />;
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
