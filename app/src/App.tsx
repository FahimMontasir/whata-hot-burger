import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components/native';
import {main} from './theme';

import Navigator from './routes';
import {persistor, store} from './store/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <ThemeProvider theme={main}>
            <Navigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
