export interface ProgressSchema {
    id: string;
    goalTypeId: string;
    fields: {
        name: string;
        label: string;
        type: 'number' | 'boolean' | 'text' | 'scale';
        required: boolean;
        min?: number;
        max?: number;
    }[];
}

export const NUMERIC_PROGRESS_SCHEMA: ProgressSchema = {
    id: 'numeric_progress',
    goalTypeId: 'numeric_milestone',
    fields: [
        {
            name: 'value',
            label: 'Current Value',
            type: 'number',
            required: true,
        },
        {
            name: 'note',
            label: 'Note',
            type: 'text',
            required: false,
        },
    ],
};

export const HABIT_PROGRESS_SCHEMA: ProgressSchema = {
    id: 'habit_progress',
    goalTypeId: 'boolean_habit',
    fields: [
        {
            name: 'completed',
            label: 'Completed?',
            type: 'boolean',
            required: true,
        },
        {
            name: 'mood',
            label: 'Mood (1-5)',
            type: 'scale',
            required: false,
            min: 1,
            max: 5,
        },
    ],
};

export const PROGRESS_SCHEMAS: Record<string, ProgressSchema> = {
    numeric_milestone: NUMERIC_PROGRESS_SCHEMA,
    boolean_habit: HABIT_PROGRESS_SCHEMA,
};
