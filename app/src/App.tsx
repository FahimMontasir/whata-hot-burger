import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {main} from './theme';

import Navigator from './routes';
import {store} from './store/redux/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={main}>
          <Navigator />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
