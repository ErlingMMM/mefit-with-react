import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getWorkouts, completeWorkout } from '../endpoints/dashboard_endpoints';


interface ExerciseData {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  imageUrl?: string;
  time: number;
  difficulty: number;
  sets: number;
  reps: number;
}

interface WorkoutData {
  id: number;
  name: string;
  description?: string;
  recommendedFitness: number;
  image?: string;
  duration: number;
  day: number;
  isCompleted: boolean;
  exercises: ExerciseData[];
}


// Create an asyncThunk for asynchronous operation (i.e fetching data from the API).
// Note that the thunk is exported as it is being defined. 
export const fetchWorkouts = createAsyncThunk('dashboard/fetchWorkouts', async () => {
    const response = await getWorkouts();
    return response;
});

export const completeWorkoutAction = createAsyncThunk('dashboard/completeWorkout', async (wId : number) => {
  await completeWorkout(wId);
});

type DashboardState = {
    workouts: WorkoutData[];
    currentWeek: number;
    maxWeek: number;
};
  
const initialState: DashboardState = {
    workouts: [],
    currentWeek: 1, // Assuming the week starts from 1
    maxWeek: 1 //initialized to one but is updated immidiately
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
        })
        .addCase(completeWorkoutAction.fulfilled, (state, action) => {
          // For demonstration purposes, let's say you just want to log a success message.
          console.log("Workout completion status marked successfully.");
        })
        .addCase(completeWorkoutAction.rejected, (state, action) => {
          // Handle the error. For now, just logging it.
          console.error("Failed to mark the workouts completion status.", action.error);
        }); 
    },
})

export const { setCurrentWeek, setMaxWeek } = dashboardSlice.actions;

export default dashboardSlice.reducer