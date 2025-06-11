import { configureStore  } from '@reduxjs/toolkit';
import UserFormSlice from './Slices/UserFormSlice';


export const store = configureStore({
  reducer: {
    userForm: UserFormSlice,
  },
 
});
