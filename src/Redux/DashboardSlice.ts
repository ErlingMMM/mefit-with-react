import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getWorkouts, completeWorkout, getStartDate, getPlan } from '../endpoints/dashboard_endpoints';


interface ExerciseData {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  image?: string;
  duration: number;
  difficulty: number;
  sets: number;
  reps: number;
}

interface WorkoutData {
  id: number;
  name: string;
  description?: string;
  difficulty: number;
  image?: string;
  duration: number;
  day: number;
  isCompleted: boolean;
  exercises: ExerciseData[];
}

interface PlanData {
  id: number;
  name: string;
  image?: string;
  difficulty: number;
}

interface CompleteWorkoutDTO {
  workoutId: number;
  day: number;
}


// Create an asyncThunk for asynchronous operation (i.e fetching data from the API).
// Note that the thunk is exported as it is being defined. 
export const fetchWorkouts = createAsyncThunk('dashboard/fetchWorkouts', async () => {
    const response = await getWorkouts();
    return response;
});

export const completeWorkoutAction = createAsyncThunk('dashboard/completeWorkout', async (data : CompleteWorkoutDTO) => {
  await completeWorkout(data);
});

export const getStartDateAction = createAsyncThunk('dashboard/getStartDate', async () => {
  const response = await getStartDate();
  return response;
});

export const getPlanAction = createAsyncThunk('dashboard/getPlan', async () => {
  const response = await getPlan();
  return response;
});

type DashboardState = {
    workouts: WorkoutData[];
    displayedWorkout: WorkoutData | null;
    currentWeek: number;
    maxWeek: number;
    startDate: string;
    plan: PlanData | null;
};
  
const initialState: DashboardState = {
    workouts: [],
    displayedWorkout: null,
    currentWeek: 1, // Assuming the week starts from 1
    maxWeek: 1, //initialized to one but is updated immidiately
    startDate: "2023-12-04", //some arbitrary default date
    plan: null
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
        },
        setDisplayedWorkout: (state, action: PayloadAction<WorkoutData>) => {
            state.displayedWorkout = action.payload
        }
    }, 
    // Handle the resolution of the promise in the thunk 
    extraReducers: (builder) => {
      builder
        .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<WorkoutData[]>) => { //Specify that action.payload should be of the type WorkoutData[]
          // action.payload contains the returned data from the fulfilled promise.
          // Update the workouts with that data:
          state.workouts = action.payload;

          // Find the maximum day value among the workouts:
          if (state.workouts.length) {
          state.maxWeek = Math.ceil(Math.max(...state.workouts.map(workout => workout.day)) / 7);
          }
        })
        .addCase(completeWorkoutAction.fulfilled, (state, action) => {
          // For demonstration purposes, let's say you just want to log a success message.
          console.log("Workout completion status marked successfully.");
        })
        .addCase(completeWorkoutAction.rejected, (state, action) => {
          // Handle the error. For now, just logging it.
          console.error("Failed to mark the workouts completion status.", action.error);
        })
        .addCase(getStartDateAction.fulfilled, (state, action) => {
          state.startDate = action.payload;
        })
        .addCase(getPlanAction.fulfilled, (state, action) => {
          state.plan = action.payload;
        });
    },
})

export const { setCurrentWeek, setMaxWeek, setDisplayedWorkout } = dashboardSlice.actions;

export default dashboardSlice.reducer