import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_NAME = 'whbAppToken';

// warning: do not work
const reHydrateStore = () => {
  AsyncStorage.getItem(TOKEN_NAME)
    .then(data => {
      const token = data;
      if (token !== null) {
        return {token: token}; // re-hydrate the store
      }
      return {token: null};
    })
    .catch(() => {
      return {
        token: null,
      };
    });
};

export {reHydrateStore, TOKEN_NAME};
