import React from 'react';
import {Box, Container, Input} from '../../common';
import AppAvatar from './components/Avatar';

const SettingScreen = () => {
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
