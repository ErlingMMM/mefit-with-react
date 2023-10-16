import { createSlice } from '@reduxjs/toolkit';

const workoutIdsInProgramSlice = createSlice({
  name: 'workoutIdsInProgram',
  initialState: [],
  reducers: {
    setWorkoutIdsInProgram: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWorkoutIdsInProgram } = workoutIdsInProgramSlice.actions;
export default workoutIdsInProgramSlice.reducer;
