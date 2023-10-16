import { createSlice } from '@reduxjs/toolkit';

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
