import { useParams, Link } from 'react-router-dom';
import { useGoal } from '../../hooks/useGoals';
import { useGoalSchema } from '../../hooks/useSchemas';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressChart from '../../components/charts/ProgressChart';
import { ArrowLeft, Edit, Target, Calendar, Loader2 } from 'lucide-react';

const GoalDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { goal, status } = useGoal(id);
    const { schema } = useGoalSchema(goal?.type);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!goal) {
        return (
            <div className="space-y-6">
                <Link to="/dashboard">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="p-8 text-center bg-white rounded-lg shadow text-red-600">
                    Goal not found
                </div>
            </div>
        );
    }

    // Mock chart data if not available in goal
    const chartData = [
        { date: 'Jan 1', value: 10 },
        { date: 'Jan 8', value: 25 },
        { date: 'Jan 15', value: 40 },
        { date: 'Jan 22', value: 35 },
        { date: 'Jan 29', value: 55 },
        { date: 'Feb 5', value: goal.progress },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/dashboard">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{goal.title}</h1>
                        <p className="text-sm text-gray-500">{goal.description}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Link to="/progress">
                        <Button>Update Progress</Button>
                    </Link>
                    <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Chart */}
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Trend</h3>
                        <ProgressChart data={chartData} />
                    </Card>

                    {/* Goal Configuration (Schema Driven) */}
                    {schema && goal?.data && (
                         <Card className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Goal Configuration</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {schema.fields.map(field => (
                                    <div key={field.name}>
                                        <p className="text-sm font-medium text-gray-500">{field.label}</p>
                                        <p className="mt-1 text-sm text-gray-900 font-semibold">
                                             {String(goal.data?.[field.name] ?? '-')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Targets */}
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Targets</h3>
                        <div className="space-y-4">
                            {goal.targets.map((target) => (
                                <div key={target.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                                            <Target className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{target.label}</p>
                                            <p className="text-sm text-gray-500">Target: {target.targetValue} {target.unit}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-indigo-600">{target.currentValue} {target.unit}</p>
                                        {target.dueDate && (
                                            <p className="text-xs text-gray-500 flex items-center justify-end mt-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(target.dueDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Key Metrics */}
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">At a Glance</h3>
                        <div className="space-y-4">
                            {goal.metrics.map(metric => (
                                <div key={metric.key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-600">{metric.label}</span>
                                    <span className="font-medium">{metric.value}</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="capitalize px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                        {goal.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Stats / Adjustment History Placeholder */}
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity</h3>
                        <div className="flow-root">
                            <ul className="-mb-8">
                                <li className="relative pb-8">
                                    <div className="relative flex space-x-3">
                                        <div>
                                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                <Target className="h-4 w-4 text-white" />
                                            </span>
                                        </div>
                                        <div className="min-w-0 flex-1 pt-1.5 justify-between space-x-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Goal started <span className="font-medium text-gray-900">1 month ago</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default GoalDetail;
