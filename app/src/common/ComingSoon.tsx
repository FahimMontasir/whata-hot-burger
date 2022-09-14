import React from 'react';
import Lottie from 'lottie-react-native';
export default function ComingSoon() {
  return (
    <Lottie source={require('../assets/json/coming-soon.json')} autoPlay loop />
  );
}
