import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
}

export const CaroImageItem: React.FC<Props> = ({style, source}) => {
  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});
