import React from 'react';
import {Avatar} from '@rneui/base';
import {LinkIcon} from '../../../routes/drawer/CustomDrawer';

const AppAvatar = () => {
  return (
    <Avatar
      rounded
      size="xlarge"
      renderPlaceholderContent={
        <LinkIcon name="user" type="font-awesome" size={75} />
      }
      source={{
        uri: 'https://www.cdc.go/diabetes/images/library/spotlights/Male-doctor-smiling-portrait-close-up-Med-Res-72991363.jpg',
      }}>
      <Avatar.Accessory size={40} />
    </Avatar>
  );
};
export default AppAvatar;
