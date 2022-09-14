import React from 'react';

import {Container} from '../../common';
import {FlatList} from 'react-native';
import NotiBox from './components/NotiBox';

const DATA = [
  {
    id: 1,
    message: 'Your order is ready!',
    date: '1/2/2022 12am',
  },
  {
    id: 2,
    message: 'shipped to you address!',
    date: '1/2/2023 12am',
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
