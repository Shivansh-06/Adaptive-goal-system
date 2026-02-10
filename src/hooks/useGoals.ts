import { useQuery } from '@tanstack/react-query';
import { goalService } from '../services/goalService';

export const useGoals = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['goals'],
        queryFn: goalService.getGoals,
    });

    const status = isLoading ? 'loading' : isError ? 'failed' : 'succeeded';

    return {
        goals: data || [],
        status,
        error: error ? (error as Error).message : null,
    };
};

export const useGoal = (id: string | undefined) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['goals', id],
        queryFn: () => goalService.getGoalById(id!),
        enabled: !!id,
    });

    const status = isLoading ? 'loading' : isError ? 'failed' : 'succeeded';

    return {
        goal: data || null,
        status,
        error: error ? (error as Error).message : null,
    };
};
