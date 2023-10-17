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
    maxWeek: number;
};
  
const initialState: DashboardState = {
    workouts: [],
    currentWeek: 1, // Assuming the week starts from 1
    maxWeek: 1 //initialized to one but is updated immidiatly
};
  

//I'm naming the slice 'dashboardSlice' since it manages the global state of the dashboard of the app
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, // <= initialized further up
    reducers: {
        setCurrentWeek: (state, action: PayloadAction<number>) => {
            state.currentWeek = action.payload
        },
        setMaxWeek: (state, action: PayloadAction<number>) => {
            state.maxWeek = action.payload
        }
    }, 
    // Handle the resolution of the promise in the thunk 
    extraReducers: (builder) => {
      builder
        .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<WorkoutData[]>) => { //Specify that action.payload should be of the type WorkoutData[]
          // action.payload contains the returned data from the fulfilled promise.
          // Update the workouts with that data:
          state.workouts = action.payload;

          // Calculate the last week of the workout based on the day of the last workout:
          if (state.workouts.length) {
            const lastWorkout = state.workouts[state.workouts.length - 1];
            state.maxWeek = Math.ceil(lastWorkout.day / 7);
          }
        });
    },
})

export const { setCurrentWeek, setMaxWeek } = dashboardSlice.actions;

export default dashboardSlice.reducer