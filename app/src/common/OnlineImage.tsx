import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from '@rneui/base';
import {Loader, SkeletonLoader} from './skeleton';

interface IProps {
  width: number;
  height: number;
  source: object;
  radius?: number;
}
interface SkeletonProps {
  width: number;
  height: number;
  radius: number;
}

const Skeleton = ({width, height, radius}: SkeletonProps) => {
  return (
    <SafeAreaView>
      <SkeletonLoader>
        <Loader style={{width: width, height: height, borderRadius: radius}} />
      </SkeletonLoader>
    </SafeAreaView>
  );
};

const OnlineImage = ({width, height, source, radius = 0}: IProps) => {
  return (
    <Image
      source={source}
      style={{width: width, height: height, borderRadius: radius}}
      // eslint-disable-next-line react-native/no-inline-styles
      placeholderStyle={{backgroundColor: 'transparent'}}
      PlaceholderContent={
        <Skeleton width={width} height={height} radius={radius} />
      }
    />
  );
};
export default OnlineImage;
