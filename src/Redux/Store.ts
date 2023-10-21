import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './GenericSlice'
import dashboardReducer from './DashboardSlice'
import navigationReducer from './NavigationSlice';
import selectedProgramIdReducer from './selectId/SelectedProgramIdSlice';
import selectedWorkoutIdReducer from './selectId/SelectedWorkoutIdSlice';



export const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    navigation: navigationReducer,
    selectedProgramId: selectedProgramIdReducer,
    selectedWorkoutId: selectedWorkoutIdReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



//This allows you to correctly type your global state and access the 
//dashboard state with state.dashboard or state.data in your components or any other
//part of your app where you use the Redux state.