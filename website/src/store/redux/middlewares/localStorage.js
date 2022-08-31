const TOKEN_NAME = "whbWebToken";

const reHydrateStore = () => {
  if (localStorage.getItem(TOKEN_NAME) !== null) {
    return { token: localStorage.getItem(TOKEN_NAME) }; // re-hydrate the store
  }
  return { token: null };
};

export { reHydrateStore, TOKEN_NAME };
