import React from 'react';
import styled from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types/routeTypes';
//components
import LeftIcon from '../drawer/components/LeftIcon';
import RightIcon from '../drawer/components/RightIcon';
//screens
import HomeScreen from '../../screens/home';
import ComboScreen from '../../screens/combo';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <StackContainer>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => <LeftIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Combo"
        initialParams={{category: 'Special deals'}}
        component={ComboScreen}
        options={({route}) => ({
          headerTitle: route.params.category,
        })}
      />
    </StackContainer>
  );
};
export default HomeStack;

const StackContainer = styled(Stack.Navigator).attrs(p => ({
  screenOptions: {
    headerRight: () => <RightIcon />,
    headerStyle: {
      backgroundColor: p.theme.colors.white,
    },
    headerTitleStyle: {
      color: p.theme.colors.black,
    },
    headerTitleAlign: 'center',
  },
}))``;
