import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from '@rneui/base';
import {Loader, SkeletonLoader} from './skeleton';

interface IProps {
  width: number;
  height: number;
  source: string;
  radius?: number;
}
interface SkeletonProps {
  width: number;
  height: number;
  radius: number;
}

export const ImgSkeleton = ({width, height, radius}: SkeletonProps) => {
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
      source={{uri: source}}
      style={{width: width, height: height, borderRadius: radius}}
      // eslint-disable-next-line react-native/no-inline-styles
      placeholderStyle={{backgroundColor: 'transparent'}}
      PlaceholderContent={
        <ImgSkeleton width={width} height={height} radius={radius} />
      }
    />
  );
};
export default OnlineImage;
