import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import styled from 'styled-components/native';
//components
import CustomDrawer from './CustomDrawer';
import {StyledIcon} from './components/LeftIcon';
import RightIcon from './components/RightIcon';
import NotiIcon from './components/NotiIcon';
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//screens
import HomeStack from '../homeStack';
import NotificationScreen from '../../screens/notification';
import SettingScreen from '../../screens/settings';
import PrivacyPolicyScreen from '../../screens/privacyPolicy';
import AboutScreen from '../../screens/about';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <DrawerContainer>
      <Drawer.Screen
        name="Explore"
        component={HomeStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialIcons name="explore" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          drawerIcon: ({color}) => <NotiIcon color={color} value={2} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="security" size={30} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle" size={30} color={color} />
          ),
        }}
      />
    </DrawerContainer>
  );
};
export default DrawerNavigator;

//attention!
const DrawerContainer = styled(Drawer.Navigator).attrs(p => ({
  drawerContent: props => <CustomDrawer {...props} />,
  screenOptions: ({navigation}) => ({
    drawerActiveBackgroundColor: p.theme.colors.primaryDark,
    drawerActiveTintColor: p.theme.colors.white,
    drawerInactiveTintColor: p.theme.colors.primaryDark,
    headerLeft: () => (
      <StyledIcon
        type="antdesign"
        name="arrowleft"
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: () => <RightIcon />,
    headerStyle: {
      backgroundColor: p.theme.colors.white,
    },
    headerTitleStyle: {
      color: p.theme.colors.black,
    },
    headerTitleAlign: 'center',
    drawerStyle: {
      backgroundColor: p.theme.colors.white,
    },
    drawerLabelStyle: {
      marginLeft: -25,
      fontSize: 16,
    },
  }),
}))``;
