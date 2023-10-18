import { createSlice } from '@reduxjs/toolkit';


const searchOptionSlice = createSlice({
  name: 'searchOption',
  initialState: "name",
  reducers: {
    setSelectedSearchOption: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedSearchOption } = searchOptionSlice.actions;
export default searchOptionSlice.reducer;
