import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Goal } from './goal.types';
import apiClient from '../../services/apiClient';

interface GoalsState {
    list: Goal[];
    currentGoal: Goal | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: GoalsState = {
    list: [],
    currentGoal: null,
    status: 'idle',
    error: null,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
    const response = await apiClient.get<{ data: Goal[] }>('/goals');
    return response.data.data;
});

export const fetchGoalById = createAsyncThunk('goals/fetchGoalById', async (id: string) => {
    const response = await apiClient.get<{ data: Goal }>(`/goals/${id}`);
    return response.data.data;
});

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch goals';
            })
            .addCase(fetchGoalById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGoalById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentGoal = action.payload;
            })
            .addCase(fetchGoalById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch goal details';
            });
    },
});

export default goalsSlice.reducer;
