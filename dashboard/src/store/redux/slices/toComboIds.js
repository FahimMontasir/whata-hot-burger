const { createSlice } = require("@reduxjs/toolkit");

const toComboIdsSlice = createSlice({
  name: "toComboIds",
  initialState: {
    ids: [],
  },
  reducers: {
    addIdToCombo(state, action) {
      state.ids = [...state.ids, action.payload._id];
    },
    removeIdToCombo(state, action) {
      state.ids = state.ids.filter((id) => action.payload._id !== id);
    },
    removeAllIdToCombo(state) {
      state.ids = [];
    },
  },
});

export const getToComboIds = (state) => state.toComboIds.ids;

export const { addIdToCombo, removeIdToCombo, removeAllIdToCombo } =
  toComboIdsSlice.actions;
export default toComboIdsSlice.reducer;
