import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './GenericSlice'
export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});


export type RootState = ReturnType<typeof dataReducer>;