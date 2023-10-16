import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keycloak from "../Keycloak";
import { Url } from 'url';


/**
 * Represents the user data object.
 * @interface
 */
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

/**
 * Represents the data for a fitness program.
 * @interface
 */
interface programData {
  name:null|string
  description:string|null;
  image:Url|null;
  workoutIds : []|null;
  programDuration:null|number;
  programDifficulty:null|number;
  userIds:[]|null;
  orderOfWorkouts: number | null;
  workoutDates: number | null;
  currentWorkoutId : number | null;
}


/**
 * Represents the data for a given exercise.
 * @interface
 */
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

/**
 * Represents the data for a given workout.
 * @interface
 */
interface WorkoutData {
   id: number | null;
  name: string | null;
  description: string | null;
  recommendedFitness: string | null;
  image: string | null;
  exercises: any[] | null;
}

/**
 * Represents the state of data in the Redux store.
 * @interface
 */
interface DataState {
  userData: UserData;
  exerciseData: ExerciseData;
  workoutData: WorkoutData;
  programData:programData
  loading: boolean;
  error: string | null;
  selectedSearchOption: string | null;
}

/**
 * Represents the initial state of the data in the Redux store.
 */
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
  programData: {
    name:null,
    description:null,
    image: null,
    workoutIds: null,
    programDuration:null,
    programDifficulty:null,
    userIds:null,
    orderOfWorkouts:null,
    workoutDates:null,
    currentWorkoutId :null,
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
  selectedSearchOption: "name",
  loading: false,
  error: null,
};






/**
 * Async function to get user login details.
 * @returns Promise containing user details.
 * @throws Error if user is not found or if there is an invalid response from the server.
 */
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
          console.log("user is  not null")
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







/**
 * Async thunk to fetch exercise information from the server.
 * @returns A promise that resolves to an object containing the exercise information.
 * @throws An error if the response from the server is not valid or if an error occurs during the fetch.
 */
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



/**
 * Async thunk to fetch workout information from the server.
 * @returns {Promise<{workout: any}>} A promise that resolves to an object containing workout information.
 * @throws {Error} If there is an error fetching the data or if the response is invalid.
 */
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

/**
 * Registers user onboarding stats asynchronously.
 * @param {UserDatapostAPI} data - The user data to be posted to the API.
 * @returns {Promise<void>} - A promise that resolves when the user is registered successfully.
 * @throws {Error} - Throws an error if the response from the server is not valid.
 */
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

  /**
   * Updates the user profile data on the server.
   * @param {UserDataUpdateAPI} - An object containing the user data to update.
   * @returns {Promise<any>} - A promise that resolves with the updated user data.
   */
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
          console.log("it works!")
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

  //-------------------------------------------------------------------------------------
  
  export const getProgramInfo = createAsyncThunk(
    "getProgramInfo",
    async () => {
      try {
        const resp = await fetch(`https://mefit-backend.azurewebsites.net/api/Plan`);
        if (resp.ok) {
          const program = await resp.json();
          if (program.length > 0) {
            return {  program };
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
  
  



/**
 * Redux slice for managing user data, exercise data, workout data, and program data.
 * @name dataSlice
 * @type {Slice}
 */
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

setSelectedSearchOption: (state, action) => {
  state.selectedSearchOption = action.payload;
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
      .addCase(getProgramInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgramInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.programData = action.payload.program;

      })
      
  },
});

export const {  SetuserFName,  setUserTimeFrame, SetuserLName, SetUserFitnessLVL, setUserTimesAWeek, setUserAge, setUserBio, setUserGender, setUserHeight, setUserWeight, setSelectedSearchOption} = dataSlice.actions;

export default dataSlice.reducer;



