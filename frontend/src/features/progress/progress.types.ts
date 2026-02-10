export interface ProgressEntry {
    id: string;
    goalId: string;
    date: string;
    value: number; // For numeric tracking
    comments?: string;
    milestonesCompleted?: string[]; // IDs of completed milestones
    data?: Record<string, unknown>; // Flexible data for schema-driven entries
}

export interface ProgressUpdatePayload {
    goalId: string;
    date: string;
    value: number;
    comments?: string;
    data?: Record<string, unknown>;
}
