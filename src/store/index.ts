import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalsReducer from '../features/goals/goalsSlice';
import progressReducer from '../features/progress/progressSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalsReducer,
        progress: progressReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
