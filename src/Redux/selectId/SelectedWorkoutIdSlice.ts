import { createSlice } from '@reduxjs/toolkit';
//We need seperate Slices and not reuse just one, in case the user has Multiple tabs in a browser. In that case, we cant use the same stae for Id in general
const selectedWorkoutIdSlice = createSlice({
  name: 'selectedWorkoutId',
  initialState: 0,
  reducers: {
    setSelectedWorkoutId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedWorkoutId } = selectedWorkoutIdSlice.actions;
export default selectedWorkoutIdSlice.reducer;
