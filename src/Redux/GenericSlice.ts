import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserData {
    id: number | null;
  name: string | null;
  picture: string | null;
  bio: string | null;
  fitnessPreference: string | null;
  height: number | null;
  weight: number | null;
  isAdmin: boolean;
  isContributor: boolean;
  programs: any[] | null;
}

interface ExerciseData {
    id: number | null;
  name: string | null;
  description: string | null;
  muscleGroup: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  time: number | null;
  difficulty: number | null;
  sets: number | null;
  reps: number | null;
}

interface WorkoutData {
   id: number | null;
  name: string | null;
  description: string | null;
  recommendedFitness: string | null;
  image: string | null;
  exercises: any[] | null;
}

interface DataState {
  userData: UserData;
  exerciseData: ExerciseData;
  workoutData: WorkoutData;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  userData: {
        id: null,
      name: null,
      picture: null,
      bio: null,
      fitnessPreference: null,
      height: null,
      weight: null,
      isAdmin: false,
      isContributor: false,
      programs: null,
  },
  exerciseData: {
      id: null,
      name: null,
      description: null,
      muscleGroup: null,
      imageUrl: null,
      videoUrl: null,
      time: null,
      difficulty: null,
      sets: null,
      reps: null,
  },
  workoutData: {
       id:null,
    name: null,
    description: null,
    recommendedFitness: null,
    image: null,
    exercises: null,
  },
  loading: false,
  error: null,
};






export const getLoginAsync = createAsyncThunk(
  "getLoginAsync",
  async () => {
    try {
      const resp = await fetch(`https://mefit-backend.azurewebsites.net/api/users/1`);
      if (resp.ok) {
        const user = await resp.json();
        if (user.id != null) {
          return { user };
        } else {
          throw new Error('Feil: Bruker ikke funnet.');
        }
      } else {
        throw new Error('Feil: Ugyldig respons fra serveren.');
      }
    } catch (error) {
      throw new Error(`Feil: hehhee`);
    }
  }
);

//-------------------------------------------------------------------------------------------
//excersice data







export const getExcersiceInfo = createAsyncThunk(
  "getExcersiceInfo",
  async () => {
    try {
      const resp = await fetch(`https://mefit-backend.azurewebsites.net/api/exercises/`);
      if (resp.ok) {
        const Excer = await resp.json();
        if (Excer.length > 0) {

          return { Excer };
        } else {
          throw new Error('Feil: Bruker ikke funnet.');
        }
      } else {
        throw new Error('Feil: Ugyldig respons fra serveren.');
      }
    } catch (error) {
      throw new Error(`Feil: hehhee`);
    }
  }
);
//------------------------------------------------------------------------------------------------
// workouts data



export const getWorkoutInfo = createAsyncThunk(
  "getWorkoutInfo",
  async () => {
    try {
      const resp = await fetch(`https://mefit-backend.azurewebsites.net/api/workouts`);
      if (resp.ok) {
        const workout = await resp.json();
        if (workout.length > 0) {

          return {  workout };
        } else {
          throw new Error('Feil: Bruker ikke funnet.');
        }
      } else {
        throw new Error('Feil: Ugyldig respons fra serveren.');
      }
    } catch (error) {
      throw new Error(`Feil: hehhee`);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
      })
      .addCase(getLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      
      .addCase(getExcersiceInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExcersiceInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.exerciseData = action.payload.Excer;
        //console.log( state.exerciseData )
      })
      .addCase(getExcersiceInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        
      })
      .addCase(getWorkoutInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutData = action.payload.workout;
        //console.log(state.workoutData)
      })
      .addCase(getWorkoutInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        
      });
      
  },
});

export const { } = dataSlice.actions;

export default dataSlice.reducer;



