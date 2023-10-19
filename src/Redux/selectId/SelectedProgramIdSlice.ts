import { createSlice } from '@reduxjs/toolkit';
//We need seperate Slices and not reuse just one, in case the user has Multiple tabs in a browser. In that case, we cant use the same stae for Id in general
const selectedProgramIdSlice = createSlice({
  name: 'selectedProgramId',
  initialState: 0,
  reducers: {
    setSelectedProgramId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedProgramId } = selectedProgramIdSlice.actions;
export default selectedProgramIdSlice.reducer;
