import { Link } from 'react-router-dom';
import type { Goal } from '../../features/goals/goal.types';
import Card from '../../components/ui/Card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface GoalCardProps {
    goal: Goal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
    return (
        <Link to={`/goals/${goal.id}`} className="block hover:opacity-90 transition-opacity">
            <Card className="h-full hover:shadow-md transition-shadow">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{goal.title}</h3>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{goal.description}</p>
                        </div>
                        <span className={clsx(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                            goal.status === 'active' ? "bg-green-100 text-green-800" :
                                goal.status === 'completed' ? "bg-blue-100 text-blue-800" :
                                    "bg-gray-100 text-gray-800"
                        )}>
                            {goal.status}
                        </span>
                    </div>

                    <div className="mt-4">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                        Progress
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-indigo-600">
                                        {goal.progress}%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                <div style={{ width: `${goal.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-3 gap-2">
                            {goal.metrics.slice(0, 3).map((metric) => (
                                <div key={metric.key} className="flex flex-col">
                                    <span className="text-xs text-gray-500 truncate" title={metric.label}>{metric.label}</span>
                                    <span className="text-sm font-semibold text-gray-900 flex items-center">
                                        {metric.value}
                                        {metric.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500 ml-1" />}
                                        {metric.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-500 ml-1" />}
                                        {metric.trend === 'neutral' && <Minus className="w-3 h-3 text-gray-400 ml-1" />}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default GoalCard;
