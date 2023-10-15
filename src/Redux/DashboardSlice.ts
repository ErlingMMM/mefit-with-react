import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getWorkouts } from '../endpoints/dashboard_endpoints';

interface WorkoutData {
    id: number;
   name: string;
   duration: number;
   day: number;
   isCompleted: boolean;
}
// Create an asyncThunk for asynchronous operation (i.e fetching data from the API).
// Note that the thunk is exported as it is being defined. 
export const fetchWorkouts = createAsyncThunk('dashboard/fetchWorkouts', async () => {
    const response = await getWorkouts();
    return response;
  });


const initialState: { workouts: WorkoutData[] } = {
    workouts: []
};

//I'm naming the slice 'dashboardSlice' since it manages the global state of the dashboard of the app
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, // <= initialized further up
    reducers: {}, //All methods come from the API so only need Async thunk methods
    // Handle the resolution of the promise in the thunk 
    extraReducers: (builder) => {
      builder
        .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<WorkoutData[]>) => { //Specify that action.payload should be of the type WorkoutData[]
          // action.payload contains the returned data from the fulfilled promise.
          // Update the workouts with that data:
          state.workouts = action.payload;
        });
    },
})


export default dashboardSlice.reducer