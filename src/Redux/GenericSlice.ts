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
  startDate: string | null;
  applicationText: string | null;
  
}

interface UserApplication {
  id: string | null;
fitnessPreference: string | null;
applicationText: string | null;
}

interface RegistrationValidation {
  isRegistered: boolean;
}

interface startingDateUser {
  startingDate: String | null;
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
  duration:null|number;
  difficulty:null|number;
  userIds:[]|null;
  orderOfWorkouts: number | null;
  workoutDates: number | null;
  currentWorkoutId : number | null;
}

interface programId {
  id:number |null,
}
interface workoutId {
  id:number |null,
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
  difficulty: string | null;
  image: string | null;
  exercises: any[] | null;
}

/**
 * Represents the state of data in the Redux store.
 * @interface
 */
interface DataState {
  userData: UserData;
  userApplication: UserApplication;
  exerciseData: ExerciseData;
  workoutData: WorkoutData;
  programData:programData;
  programId:programId;
  workoutId: workoutId;
  loading: boolean;
  RegistrationValidation: RegistrationValidation;
  error: string | null;
  selectedSearchOption: string | null;
  selectedSortOption: string | null;
  startingDateUser: startingDateUser;
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
    age: null,
    gender: null,
    DurationTimeFrame: null,
    timesAWeek: null,
    startDate: null,
    applicationText: null,
  },
  programData: {
    name: null,
    description: null,
    image: null,
    workoutIds: null,
    duration: null,
    difficulty: null,
    userIds: null,
    orderOfWorkouts: null,
    workoutDates: null,
    currentWorkoutId: null,
  },
  programId:{
    id: null,
  },
  workoutId : {
    id: null,
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
    id: null,
    name: null,
    description: null,
    difficulty: null,
    image: null,
    exercises: null,
  },
  RegistrationValidation: {
    isRegistered: false,
  },
  startingDateUser: {
  startingDate: null,
  },

  selectedSearchOption: "name",
  selectedSortOption: "most recent",
  loading: false,

  error: null,
  userApplication: {
    id: null,
    fitnessPreference: null,
    applicationText: null,
  }
  
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
          throw new Error('Error. workout not found.');
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
        firstName: keycloak.tokenParsed?.given_name,
        lastName: keycloak.tokenParsed?.family_name,
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
  intensity: string;
  fitnessLvl: string;
  picture:string

}

  /**
   * Updates the user profile data on the server.
   * @param {UserDataUpdateAPI} - An object containing the user data to update.
   * @returns {Promise<any>} - A promise that resolves with the updated user data.
   */
  export const updateUserProfile = createAsyncThunk(
    'updateUserProfile',
    async ({ bio, age, height, weight, gender, intensity, fitnessLvl, picture}: UserDataUpdateAPI) => 
    {
      
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

      if (intensity !== null) {
        const timesAWeek = intensity
        patchOps.push({
          op: 'replace',
          path: '/timesAWeek',
          value: timesAWeek,
        });
        
      }

      if ( fitnessLvl !== null) {
        console.log(fitnessLvl)
        const fitnessPreference = fitnessLvl
        patchOps.push({
          op: 'replace',
          path: '/fitnessPreference',
          value: fitnessPreference,
        });
      }
      
       if (picture !== null) {
        console.log(picture)
        patchOps.push({
          op: 'replace',
          path: '/picture',
          value: picture,
        });
      }
      /*
      if ( timeframe !== null) {
        console.log(timeframe)
        const duratiomTimeframe = timeframe
        patchOps.push({
          op: 'replace',
          path: '/duratiomTimeframe',
          value: duratiomTimeframe,
        });
      }
      */
  
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
          console.log(response.text)
          throw new Error('Network response was not ok');
        }
  
 
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
  
  //-------------------------------------------------------------------------------------
  interface UserExercisePostAPI{
    EXname: string;
    EXdescpription: string;
    EXmusclegroup:string;
    EXimgUrl:string;
    EXvidurl:string;
    EXTime:string;
    EXSets:string;
    EXReps:string;
  }
  
  /**
   * Registers user onboarding stats asynchronously.
   * @param {UserDatapostAPI} data - The user data to be posted to the API.
   * @returns {Promise<void>} - A promise that resolves when the user is registered successfully.
   * @throws {Error} - Throws an error if the response from the server is not valid.
   */
  export const AddExcersiceAsync = createAsyncThunk(
    'AddExcersiceAsync',
    
    async ({ EXname, EXdescpription, EXmusclegroup, EXimgUrl, EXvidurl, EXTime, EXSets, EXReps }: UserExercisePostAPI ) => {{
        console.log(EXname,EXdescpription,EXmusclegroup,typeof(EXimgUrl),typeof(EXvidurl),EXTime,EXSets,EXReps)
      }
  
      const response = await fetch(`https://mefit-backend.azurewebsites.net/api/Exercises`, {
        headers: {
          'Authorization':`Bearer ${keycloak.token}`,
          'Content-Type':'application/json'
      },
        method: 'POST',
        body: JSON.stringify({
          name: EXname,
          description: EXdescpription,
          muscleGroup: EXmusclegroup,
          image: EXimgUrl,
          video: EXvidurl,
          sets: EXSets,
          reps: EXReps,
          time: EXTime,
          difficulty: 2,
        }),
      });
      console.log(response)
      if (response.ok) {
        console.log("Gard mann1!")
      }
  
      // Handles errors if the response is not ok
      throw new Error('Error: Unvalid response from server.');
    }
  );
//------------------------------------------------------- async metode N

interface UserWorkoutAPI {
  WRname: string;
  WRdescription: string;
  WRfintessLVL:string;
  WRimgUrl:string;
  WRDuration: number;
}

/**
 * Registers user onboarding stats asynchronously.
 * @param {UserDatapostAPI} data - The user data to be posted to the API.
 * @returns {Promise<void>} - A promise that resolves when the user is registered successfully.
 * @throws {Error} - Throws an error if the response from the server is not valid.
 */
export const AddWorkoutAsync = createAsyncThunk(
  'AddWorkoutAsync',
  
  async ({  WRname, WRdescription, WRfintessLVL, WRimgUrl, WRDuration}: UserWorkoutAPI) => {{   
    }
    const response = await fetch(`https://mefit-backend.azurewebsites.net/api/Workouts`, {
      headers: {
        'Authorization':`Bearer ${keycloak.token}`,
        'Content-Type':'application/json'
    },
      method: 'POST',
      body: JSON.stringify({
        name: WRname,
        description: WRdescription,
        recommendedFitness: WRfintessLVL,
        image: WRimgUrl,
        duration: WRDuration,
      }),
    });
    if (response.ok) {
      console.log("du vet at livet smiler for mefit boysen")
      const workout = await response.json();
      return workout.id;
    }

    // Handles errors if the response is not ok
    throw new Error('Error: Unvalid response from server.');
  }
);

//-----------------------------------------------------------------------------

interface ProgramPostAPI {
  name:string,
  description:string,
  image:string,
  duration:number,
  difficulty:number,
}

export const AddProgramAsync = createAsyncThunk(
  'AddProgramAsync',

  async ({name, description, image, duration, difficulty}: ProgramPostAPI) => {

    const response = await fetch(`https://mefit-backend.azurewebsites.net/api/Plan`, {
      headers: {
        'Authorization':`Bearer ${keycloak.token}`,
        'Content-Type':'application/json'
    },
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        image: image,
        difficulty:difficulty,
        duration:duration,
      }),
    });
    
    if (response.ok) {
      const jsonrespons = await response.json();
      const id = jsonrespons.id;
      return id;
    }

    // Handles errors if the response is not ok
    throw new Error('Error: Unvalid response from server.');
  }
);

//---------------------------------------------------------------------------------------

interface UserPostApplicationAPI {
  ApplicationText : string;
}

export const AddApplicationUserAsync = createAsyncThunk(
  'AddApplicationUserAsync',
  async ({ApplicationText}: UserPostApplicationAPI) => {

    const response = await fetch(`https://mefit-backend.azurewebsites.net/api/Users/user/application`, {  
      method: 'PATCH',
      headers: {
        'Authorization':`Bearer ${keycloak.token}`,
        'Content-Type':'application/json'
    },
    body:JSON.stringify(ApplicationText)
    });
    console.log(response.text())
    if (response.ok) {
      console.log("Forespørselen var vellykket!");
    } else {  
      throw new Error('Error: Unvalid response from server.');
    }
  }
);

//---------------------------------------------------------------------------------------
export const getUserApplicationsAsync = createAsyncThunk(
  "getUserApplicationsAsync",
  async () => {
    try {
      const accessToken = keycloak.token; 
      const resp = await fetch('https://mefit-backend.azurewebsites.net/api/Users/applications', {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json'
        }
      });

      if (resp.ok) {
        const users = await resp.json();
        if (users.length != null) {
          console.log(users)
          return { users };
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


//---------------------------------------------------------------------------------------
export const getAllUsersAsync = createAsyncThunk(
  "getAllUsersAsync",
  async () => {
    try {
      const accessToken = keycloak.token; 
      const resp = await fetch('https://mefit-backend.azurewebsites.net/api/Users/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/json'
        }
      });

      if (resp.ok) {
        const users_array = await resp.json();
        if (users_array.length > 0) {
          console.log(users_array)
          return { users_array };
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



export const DeleteUserAsync = createAsyncThunk(
  'DeleteUserAsync',
  async ({GUID}: {GUID: string}) => {

    const response = await fetch(`https://mefit-backend.azurewebsites.net/api/Users/${GUID}`, {  
      method: 'DELETE',
      headers: {
        'Authorization':`Bearer ${keycloak.token}`,
        'Content-Type':'application/json'
    },
    });
    console.log(response.text())
    if (response.ok) {
      console.log("Forespørselen var vellykket!");
    } else {  
      throw new Error('Error: Unvalid response from server.');
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
setUserPicture:(state, action) => {
  state.userData.picture = action.payload
},

setSelectedSearchOption: (state, action) => {
  state.selectedSearchOption = action.payload;
},
setSelectedSortOption: (state, action) => {
  state.selectedSortOption = action.payload;
},
setRegistrationBoolean: (state, action) => {
  state.RegistrationValidation.isRegistered = action.payload;
},
setNameExcersice: (state, action) => {
  state.exerciseData.name = action.payload;
},
setDescriptionExcersice: (state, action) => {
  state.exerciseData.description = action.payload;
},
setMusclegGroupExcersice: (state, action) => {
  state.exerciseData.muscleGroup = action.payload;
},
setImgUrlExcersice: (state, action) => {
  state.exerciseData.imageUrl = action.payload;
},
setVideoUrlExcersice: (state, action) => {
  state.exerciseData.videoUrl = action.payload;
},
setTimeExcersice: (state, action) => {
  state.exerciseData.time = action.payload;
},
setSetsExcersice: (state, action) => {
  state.exerciseData.sets = action.payload;
},
setRepsExcersice: (state, action) => {
  state.exerciseData.reps = action.payload;
},
setNameWorkout: (state, action) => {
  state.workoutData.name = action.payload;
},
setDescriptionWorkout: (state, action) => { 
  state.workoutData.description = action.payload;
},
setRecommendedFitnessWorkout: (state, action) => { 
  state.workoutData.difficulty = action.payload;
},
setRecommendedImage: (state, action) => { 
  state.workoutData.image = action.payload;
},
setProgramName:(state, action) => {
  state.programData.name = action.payload;
},
setProgramDesc:(state, action) => {
  state.programData.description = action.payload;
},
setProgramImg:(state, action) => {
  state.programData.image = action.payload;
},
setProgramDur:(state, action) => {
  state.programData.duration = action.payload;
},
setProgramOrd:(state, action) => {
  state.programData.orderOfWorkouts = action.payload;
},
setPlanId: (state, action) => {
  state.programId.id = action.payload;
},
setApplicationTextUser:(state, action) => {
  state.userData.applicationText = action.payload;
},
setWorkoutId: (state, action) => {
  state.workoutId.id = action.payload;
},
setStartingDateUser: (state, action) => {
  state.startingDateUser = action.payload;
}






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

      .addCase( getUserApplicationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( getUserApplicationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userApplication = action.payload.users;
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
      .addCase(AddWorkoutAsync.fulfilled, (state, action) => {
        state.workoutId.id = action.payload; // Assuming you have workoutId.id in your initial state
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.users_array;
        console.log(state.userData)

      })
  },
});

export const {setStartingDateUser, setUserPicture,setPlanId, setApplicationTextUser, setProgramDur, setProgramOrd,setProgramImg,setProgramDesc,setProgramName, setRecommendedImage,setRecommendedFitnessWorkout,setDescriptionWorkout,setNameWorkout,setTimeExcersice, setNameExcersice,setDescriptionExcersice, setImgUrlExcersice, setMusclegGroupExcersice, setRepsExcersice, setSetsExcersice, setVideoUrlExcersice,  SetuserFName,  setRegistrationBoolean, setUserTimeFrame, SetuserLName, SetUserFitnessLVL, setUserTimesAWeek, setUserAge, setUserBio, setUserGender, setUserHeight, setUserWeight, setSelectedSearchOption, setSelectedSortOption} = dataSlice.actions;

export default dataSlice.reducer;