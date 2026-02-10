import { useQuery } from '@tanstack/react-query';
import { goalService } from '../services/goalService';

export const useProgressSchema = (goalType: string | undefined) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['schema', 'progress', goalType],
        queryFn: () => goalService.getProgressSchema(goalType!),
        enabled: !!goalType,
    });

    return { schema: data, isLoading, error };
};

export const useGoalSchema = (goalType: string | undefined) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['schema', 'goal', goalType],
        queryFn: () => goalService.getGoalSchema(goalType!),
        enabled: !!goalType,
    });

    return { schema: data, isLoading, error };
};
