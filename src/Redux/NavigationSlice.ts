import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    activeComponent: 'dashboard',
  },
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
  },
});

export const { setActiveComponent } = navigationSlice.actions;
export default navigationSlice.reducer;
