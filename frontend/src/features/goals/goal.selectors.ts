import type { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllGoals = (state: RootState) => state.goals.list;
export const selectGoalById = (state: RootState, goalId: string) =>
    state.goals.list.find(goal => goal.id === goalId);
export const selectGoalsStatus = (state: RootState) => state.goals.status;
export const selectGoalsError = (state: RootState) => state.goals.error;

export const selectActiveGoals = createSelector(
    [selectAllGoals],
    (goals) => goals.filter(goal => goal.status === 'active')
);

export const selectCompletedGoals = createSelector(
    [selectAllGoals],
    (goals) => goals.filter(goal => goal.status === 'completed')
);
