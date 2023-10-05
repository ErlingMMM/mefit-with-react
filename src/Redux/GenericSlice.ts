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

interface DataState {
  data: UserData;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: {
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
        if (user.length === 1) {
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
        state.data = action.payload.user;
      })
      .addCase(getLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null; 
      });
  },
});

export const { } = dataSlice.actions;

export default dataSlice.reducer;