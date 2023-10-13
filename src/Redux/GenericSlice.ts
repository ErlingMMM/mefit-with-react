import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keycloak from "../Keycloak";
import { time } from 'console';

interface UserData {
    id: number | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  bio: string | null;
  fitnessPreference: string | null;
  height: number | null;
  weight: number | null;
  age:number | null;
  gender: number | null;
  timesAWeek: number | null;
  DurationTimeFrame: number | null;
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
      firstName: null,
      lastName: null,
      picture: null,
      bio: null,
      fitnessPreference: null,
      height: null,
      weight: null,
      age:null,
      gender: null,
      DurationTimeFrame: null,
      timesAWeek: null,
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
      const accessToken = keycloak.token; 
      const resp = await fetch('https://mefit-backend.azurewebsites.net/api/Users/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json'
        }
      });

      if (resp.ok) {
        const user = await resp.json();
        if (user != null) {
          console.log("user is null")
          return { user };
        } else {
          throw new Error('Error. User not found');
        }
      } else {
        throw new Error('Error: Unvalid response from server.');
      }
    } catch (error) {
      throw new Error(`Error`);
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
          throw new Error('Error. User not found');
        }
      } else {
        throw new Error('Error: Unvalid response from server.');
      }
    } catch (error) {
      throw new Error(`Error`);
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
          throw new Error('Error. User not found.');
        }
      } else {
        throw new Error('Error: Unvalid response from server.');
      }
    } catch (error) {
      throw new Error(`Error`);
    }
  }
);




interface UserDatapostAPI {
  intensity: string;
  fitnessLvl: string;
  timeframe:string
}

export const RegisterUserOnboardingStatsAsync = createAsyncThunk(
  'RegisterUserOnboardStatsAsync',
  
  async ({ intensity,fitnessLvl,timeframe }: UserDatapostAPI) => {
    const timeframeInt = parseInt(timeframe);const intensityInt = parseInt(intensity);{
      
    }

    const response = await fetch(`https://mefit-backend.azurewebsites.net/api/users/register`, {
      headers: {
        'Authorization':`Bearer ${keycloak.token}`,
        'Content-Type':'application/json'
    },
      method: 'POST',
      body: JSON.stringify({
        fitnessPreference: fitnessLvl,
        timesAWeek: intensityInt,
        durationTimeframe: timeframeInt
      }),
    });
    console.log(response.text())
    if (response.ok) {
      const user = await response.json();
    }

    // Handles errors if the response is not ok
    throw new Error('Error: Unvalid response from server.');
  }
);
//------------------------------------------------------- async metode N

interface UserDataUpdateAPI {
  bio: string;
  age: string;
  height:string;
  weight:string;
  gender:String;

}

  export const updateUserProfile = createAsyncThunk(
    'updateUserProfile',
    async ({ bio, age, height, weight, gender }: UserDataUpdateAPI) => {
      const patchOps = [];
      if (bio !== null) {
        patchOps.push({
          op: 'replace',
          path: '/bio',
          value: bio,
        });
      }
      if (age !== null) {
        patchOps.push({
          op: 'replace',
          path: '/age',
          value: age,
        });
      }
      if (height !== null) {
        patchOps.push({
          op: 'replace',
          path: '/height',
          value: height,
        });
      }
      if (weight !== null) {
        patchOps.push({
          op: 'replace',
          path: '/weight',
          value: weight,
        });
      }
      if (gender !== null) {
        patchOps.push({
          op: 'replace',
          path: '/gender',
          value: gender,
        });
      }
  
      try {
        const response = await fetch('https://mefit-backend.azurewebsites.net/api/users/updateuser', {
          method: 'PATCH',
          headers: {
            'Authorization':`Bearer ${keycloak.token}`,
            'Content-Type': 'application/json-patch+json',
          },
          body: JSON.stringify(patchOps),
        });
        if(response.ok){
          console.log("det fungerer for faen!!!")
        }
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  );
  




const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    SetuserFName: (state, action) => {
      state.userData.firstName = action.payload
  },
  SetuserLName: (state, action) => {
    state.userData.lastName = action.payload
},
   SetUserFitnessLVL: (state, action) => {
   state.userData.fitnessPreference = action.payload
},
setUserTimesAWeek:(state, action) => {
  state.userData.timesAWeek = action.payload
},
setUserTimeFrame:(state, action) => {
  state.userData.DurationTimeFrame = action.payload
},
setUserBio:(state, action) => {
  state.userData.bio = action.payload
},
setUserHeight:(state, action) => {
  state.userData.height = action.payload
},
setUserWeight:(state, action) => {
  state.userData.weight = action.payload
},
setUserAge:(state, action) => {
  state.userData.age = action.payload
},
setUserGender:(state, action) => {
  state.userData.gender = action.payload
},

  },
  
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
      
      .addCase(getExcersiceInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExcersiceInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.exerciseData = action.payload.Excer;
        //console.log( state.exerciseData )
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
      
  },
});

export const {  SetuserFName,  setUserTimeFrame, SetuserLName, SetUserFitnessLVL, setUserTimesAWeek, setUserAge, setUserBio, setUserGender, setUserHeight, setUserWeight} = dataSlice.actions;

export default dataSlice.reducer;



