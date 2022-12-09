import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './usersReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
  }
});