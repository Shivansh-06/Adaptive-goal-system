// import apiClient from './apiClient';
import type { Goal, GoalSchema } from '../features/goals/goal.types';
import { GOAL_SCHEMAS } from '../features/goals/goal.schemas';
import { PROGRESS_SCHEMAS } from '../features/progress/progress.schemas';
import type { ProgressSchema } from '../features/progress/progress.schemas';

// Mock data
const MOCK_GOALS: Goal[] = [
    {
        id: '1',
        title: 'Read 12 Books',
        description: 'Read one book per month',
        type: 'numeric_milestone',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        targets: [
            {
                id: 't1',
                label: 'Books Read',
                targetValue: 12,
                currentValue: 3,
                unit: 'books',
                dueDate: '2023-12-31',
            },
        ],
        progress: 25,
        metrics: [
            { key: 'pace', label: 'Pace', value: '1 book/month', trend: 'neutral' },
        ],
        schemaId: 'numeric_milestone',
        data: {
            targetValue: 12,
            unit: 'books',
            deadline: '2023-12-31'
        }
    },
    {
        id: '2',
        title: 'Morning Jog',
        description: 'Jog 30 mins every morning',
        type: 'boolean_habit',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        targets: [
            {
                id: 't2',
                label: 'Streak',
                targetValue: 30,
                currentValue: 5,
                unit: 'days',
            },
        ],
        progress: 16,
        metrics: [
            { key: 'streak', label: 'Current Streak', value: 5, trend: 'up' },
        ],
        schemaId: 'boolean_habit',
        data: {
            frequency: 'daily',
            streakTarget: 30
        }
    },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const goalService = {
    getGoals: async (): Promise<Goal[]> => {
        // Mocking API call
        // const response = await apiClient.get<{ data: Goal[] }>('/goals');
        // return response.data.data;
        await delay(500);
        return MOCK_GOALS;
    },

    getGoalById: async (id: string): Promise<Goal> => {
        // const response = await apiClient.get<{ data: Goal }>(`/goals/${id}`);
        // return response.data.data;
        await delay(500);
        const goal = MOCK_GOALS.find((g) => g.id === id);
        if (!goal) throw new Error('Goal not found');
        return goal;
    },

    createGoal: async (data: Partial<Goal>): Promise<Goal> => {
        // const response = await apiClient.post<{ data: Goal }>('/goals', data);
        // return response.data.data;
        await delay(500);
        const newGoal: Goal = {
            ...MOCK_GOALS[0], // Copy mock structure for simplicity
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            createdAt: new Date().toISOString(),
        } as Goal;
        return newGoal;
    },

    getGoalSchema: async (type: string): Promise<GoalSchema> => {
        // const response = await apiClient.get<{ data: GoalSchema }>(`/schemas/goals/${type}`);
        // return response.data.data;
        await delay(300);
        const schema = GOAL_SCHEMAS[type];
        if (!schema) throw new Error('Schema not found');
        return schema;
    },

    getProgressSchema: async (type: string): Promise<ProgressSchema> => {
        await delay(300);
        const schema = PROGRESS_SCHEMAS[type];
        if (!schema) throw new Error('Progress schema not found');
        return schema;
    },
};
