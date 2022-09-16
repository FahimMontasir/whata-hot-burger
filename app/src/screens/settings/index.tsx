import React from 'react';
import {Box, Container, Input} from '../../common';
import AppAvatar from './components/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getToken,
  login,
  logout,
} from '../../store/redux/slices/localStorageAuth';
import {Button} from '@rneui/base';

const SettingScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  console.log('token', token);

  const loginAsync = () => {
    dispatch(login({token: '12a34'}));
    console.log('cli');
  };

  const logoutAsync = async () => {
    dispatch(logout());
  };
  return (
    <Container>
      <Box>
        <AppAvatar />
        <Input shake={() => ''} placeholder="Hero Alom" rightIconName="save" />
        <Input
          shake={() => ''}
          mh={30}
          placeholder="01876309927"
          rightIconName="save"
        />
      </Box>
      <Button title="log in" onPress={loginAsync} />
      <Button title="log out" onPress={logoutAsync} />
      {/* {list.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          tvParallaxProperties
          hasTVPreferredFocus>
          <Icon name={item.icon} tvParallaxProperties />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <Switch />
        </ListItem>
      ))} */}
    </Container>
  );
};
export default SettingScreen;
