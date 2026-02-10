import type { GoalSchema } from './goal.types';

export const NUMERIC_MILESTONE_SCHEMA: GoalSchema = {
    id: 'numeric_milestone',
    name: 'Numeric Milestone',
    fields: [
        {
            name: 'targetValue',
            label: 'Target Value',
            type: 'number',
            required: true,
            validation: {
                min: 1,
            },
        },
        {
            name: 'unit',
            label: 'Unit',
            type: 'text',
            required: true,
        },
        {
            name: 'deadline',
            label: 'Deadline',
            type: 'date',
            required: true,
        },
    ],
};

export const BOOLEAN_HABIT_SCHEMA: GoalSchema = {
    id: 'boolean_habit',
    name: 'Daily Habit',
    fields: [
        {
            name: 'frequency',
            label: 'Frequency',
            type: 'select',
            required: true,
            options: [
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
            ],
        },
        {
            name: 'streakTarget',
            label: 'Streak Target',
            type: 'number',
            required: false,
        },
    ],
};

export const GOAL_SCHEMAS: Record<string, GoalSchema> = {
    numeric_milestone: NUMERIC_MILESTONE_SCHEMA,
    boolean_habit: BOOLEAN_HABIT_SCHEMA,
};
