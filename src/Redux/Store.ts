import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './GenericSlice'
import dashboardReducer from './DashboardSlice'


export const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer
  },
});


export type RootState = {
  data: ReturnType<typeof dataReducer>,
  dashboard: ReturnType<typeof dashboardReducer>,
};

//This allows you to correctly type your global state and access the 
//dashboard state with state.dashboard or state.data in your components or any other
//part of your app where you use the Redux state.