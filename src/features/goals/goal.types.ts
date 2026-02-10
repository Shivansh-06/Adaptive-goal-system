export interface GoalTarget {
    id: string;
    label: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    dueDate?: string;
}

export interface GoalMetric {
    key: string;
    label: string;
    value: string | number;
    change?: number; // percentage change
    trend?: 'up' | 'down' | 'neutral';
}

export interface Goal {
    id: string;
    title: string;
    description: string;
    type: string; // e.g., 'numeric_milestone', 'boolean_habit'
    status: 'active' | 'completed' | 'archived';
    createdAt: string;
    updatedAt: string;
    targets: GoalTarget[];
    progress: number; // 0-100
    metrics: GoalMetric[];
    // Schema-driven fields can be stored here or fetched separately
    schemaId?: string;
    data?: Record<string, unknown>;
}

export interface GoalSchemaField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'scale';
    required?: boolean;
    options?: { label: string; value: string | number }[]; // For select type
    validation?: {
        min?: number;
        max?: number;
        regex?: string;
    };
    min?: number; // Direct min/max for convenience
    max?: number;
}

export interface GoalSchema {
    id: string;
    name: string;
    fields: GoalSchemaField[];
}
