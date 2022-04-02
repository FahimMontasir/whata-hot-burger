import React from 'react';

import {Container} from '../../common';
import {FlatList} from 'react-native';
import NotiBox from './components/NotiBox';

const DATA = [
  {
    id: 1,
    message: 'Your medical report is ready',
    date: '1/2/2021 12am',
  },
  {
    id: 2,
    message: 'Welcome to the app',
    date: '1/2/2021 12am',
  },
];

const NotificationScreen = () => {
  return (
    <Container>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <NotiBox message={item.message} date={item.date} />
        )}
        keyExtractor={item => item.id + ''}
      />
    </Container>
  );
};
export default NotificationScreen;
