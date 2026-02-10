import { useGoals } from '../../hooks/useGoals';
import GoalCard from './GoalCard';
import Button from '../../components/ui/Button';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { goals, status, error } = useGoals();

    if (status === 'loading' && goals.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600 p-8 bg-white rounded-lg shadow">Error loading goals: {error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>

            {goals.length === 0 && status === 'succeeded' && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <Plus className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No active goals</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new goal.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
