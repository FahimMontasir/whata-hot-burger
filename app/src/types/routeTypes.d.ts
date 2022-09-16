import {StackScreenProps} from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  Combo: {id: string; category: string; photoUrls: string[]};
};

export type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;
export type ComboProps = StackScreenProps<HomeStackParamList, 'Combo'>;
