import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ProgressEntry, ProgressUpdatePayload } from './progress.types';
import apiClient from '../../services/apiClient';

interface ProgressState {
    history: ProgressEntry[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProgressState = {
    history: [],
    status: 'idle',
    error: null,
};

export const submitProgress = createAsyncThunk('progress/submit', async (payload: ProgressUpdatePayload) => {
    const response = await apiClient.post<{ data: ProgressEntry }>('/progress', payload);
    return response.data.data;
});

export const fetchProgressHistory = createAsyncThunk('progress/fetchHistory', async (goalId: string) => {
    const response = await apiClient.get<{ data: ProgressEntry[] }>(`/goals/${goalId}/progress`);
    return response.data.data;
});

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitProgress.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitProgress.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.history.unshift(action.payload);
            })
            .addCase(submitProgress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to submit progress';
            })
            .addCase(fetchProgressHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            });
    },
});

export default progressSlice.reducer;
