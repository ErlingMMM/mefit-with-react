import { createSlice } from '@reduxjs/toolkit';
//We need seperate Slices and not reuse just one, in case the user has Multiple tabs in a browser. In that case, we cant use the same stae for Id in general
const selectedDashboardWorkoutIdSlice = createSlice({
  name: 'selectedDashboardWorkoutId',
  initialState: 0,
  reducers: {
    setSelectedDashboardWorkoutId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedDashboardWorkoutId } = selectedDashboardWorkoutIdSlice.actions;
export default selectedDashboardWorkoutIdSlice.reducer;