const { createSlice } = require("@reduxjs/toolkit");

const toComboIdsSlice = createSlice({
  name: "toComboIds",
  initialState: {
    ids: [],
  },
  reducers: {
    addIdToCombo(state, action) {
      state.ids = [...state, action.payload.id];
    },
    removeIdToCombo(state, action) {
      state.ids = state.ids.filter((id) => action.payload._id !== id);
    },
  },
});

export const getToComboIds = (state) => state.toComboIds.ids;

export const { addIdToCombo } = toComboIdsSlice.actions;
export default toComboIdsSlice.reducer;
