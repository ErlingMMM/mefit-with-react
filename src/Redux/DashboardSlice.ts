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

type DashboardState = {
    workouts: WorkoutData[];
    currentWeek: number;
};
  
const initialState: DashboardState = {
    workouts: [],
    currentWeek: 1 // Assuming the week starts from 1
};
  

//I'm naming the slice 'dashboardSlice' since it manages the global state of the dashboard of the app
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, // <= initialized further up
    reducers: {
        setCurrentWeek: (state, action: PayloadAction<number>) => {
            state.currentWeek = action.payload;
        }
    }, 
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

export const { setCurrentWeek } = dashboardSlice.actions;

export default dashboardSlice.reducer