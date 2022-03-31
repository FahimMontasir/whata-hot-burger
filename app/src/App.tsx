import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {Button, Icon as I} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  name?: string;
}

const Yo = styled.Text<IProps>`
  color: red;
`;

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View>
          <Text>hello world</Text>
          <Yo>you</Yo>
          <Button title="hello" />

          <I
            raised
            name="home"
            type="font-awesome"
            color="#f50"
            onPress={() => console.log('hello')}
          />
          <Icon name="rocket" size={30} color="#4F8EF7" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
