import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGoals } from '../../hooks/useGoals';
import { useProgressSchema } from '../../hooks/useSchemas';
import { submitProgress } from '../../features/progress/progressSlice';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import SchemaForm from '../../components/forms/SchemaForm';
import type { AppDispatch } from '../../store';

const ProgressEntry = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { goals } = useGoals();

    const [goalId, setGoalId] = useState(searchParams.get('goalId') || '');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedGoal = goals.find(g => g.id === goalId);
    const { schema, isLoading: isSchemaLoading } = useProgressSchema(selectedGoal?.type);

    const handleSubmit = async (values: any) => {
        if (!goalId) {
            setError('Please select a goal');
            return;
        }
        setIsSubmitting(true);
        setError('');

        try {
            // Map schema values to payload
            // For now, we assume 'value' exists or we use 1/0 for boolean
            let numericValue = 0;
            if (typeof values.value === 'number') {
                numericValue = values.value;
            } else if (values.value) { // if value is string but parseable
                 numericValue = Number(values.value);
            }
            
            if (values.completed) {
                numericValue = 1;
            }

            await dispatch(submitProgress({
                goalId,
                date,
                value: numericValue,
                comments: values.note || values.comments || '',
                data: values
            })).unwrap();

            navigate(`/goals/${goalId}`);
        } catch (err) {
            console.error(err);
             if (isAxiosError(err) && err.message) {
                setError(err.message);
            } else {
                setError('Failed to submit progress');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
             <h1 className="text-2xl font-bold text-gray-900 mb-6">Log Progress</h1>
             <Card className="p-6">
                <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Goal</label>
                        <select 
                            value={goalId} 
                            onChange={(e) => setGoalId(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        >
                            <option value="">-- Select a goal --</option>
                            {goals.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                        </select>
                     </div>

                     <Input type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} required />

                     {selectedGoal && schema ? (
                        <SchemaForm 
                            fields={schema.fields}
                            onSubmit={handleSubmit}
                            isLoading={isSubmitting}
                            submitLabel="Save Progress"
                        />
                     ) : selectedGoal && isSchemaLoading ? (
                         <div>Loading schema...</div>
                     ) : selectedGoal ? (
                         <div>No schema found for this goal type ({selectedGoal.type}).</div>
                     ) : null}
                     
                     {error && <div className="text-red-600">{error}</div>}
                </div>
             </Card>
        </div>
    );
};
export default ProgressEntry;
