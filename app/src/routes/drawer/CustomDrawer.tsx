import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {Box, Typography} from '../../common';
import {Avatar, Icon} from '@rneui/base';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContainer>
      <ContentScrollView {...props}>
        <Box row color="primary" radius="10px" pv="20px" mh="5px" mv="50px">
          <Avatar
            source={{uri: 'https://www.cdc.go'}}
            rounded
            size="large"
            renderPlaceholderContent={
              <LinkIcon name="user" type="font-awesome" size={55} />
            }
          />

          <Box color="transparent" mh="14px">
            <Typography h2 color="secondary">
              Hero Alom
            </Typography>
            <Typography caption color="secondary">
              0170000000
            </Typography>
          </Box>
        </Box>

        <ListContainer>
          <DrawerItemList {...props} />
        </ListContainer>
      </ContentScrollView>

      <Box row justify="space-around" ph="10%" pv="5%">
        <LinkIcon name="facebook-square" type="font-awesome" />
        <LinkIcon name="web" type="material-community" />
        <LinkIcon name="youtube-play" type="font-awesome" />
      </Box>
    </DrawerContainer>
  );
};

export default CustomDrawer;

const DrawerContainer = styled.View`
  flex: 1;
`;
const ListContainer = styled.View`
  flex: 1;
  padding-top: 40px;
`;

const ContentScrollView = styled(DrawerContentScrollView).attrs(p => ({
  contentContainerStyle: {
    backgroundColor: p.theme.colors.white,
  },
}))``;

export const LinkIcon = styled(Icon).attrs(p => ({
  raised: true,
  tvParallaxProperties: true,
  color: p.theme.colors.primaryDark,
}))``;
