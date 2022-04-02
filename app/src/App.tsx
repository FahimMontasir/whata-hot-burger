import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {main} from './theme';

import Navigator from './routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={main}>
        <Navigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
export default App;
