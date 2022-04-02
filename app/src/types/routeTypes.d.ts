import {StackScreenProps} from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  Service: {serviceName: string};
};

export type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;
export type ServiceProps = StackScreenProps<HomeStackParamList, 'Service'>;
