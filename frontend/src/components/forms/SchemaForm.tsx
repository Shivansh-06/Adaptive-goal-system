import React, { useState, useEffect } from 'react';
import type { GoalSchemaField } from '../../features/goals/goal.types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface SchemaFormProps {
    fields: GoalSchemaField[];
    initialValues?: Record<string, any>;
    onSubmit: (values: Record<string, any>) => void;
    submitLabel?: string;
    isLoading?: boolean;
}

const SchemaForm: React.FC<SchemaFormProps> = ({
    fields,
    initialValues = {},
    onSubmit,
    submitLabel = 'Submit',
    isLoading = false,
}) => {
    const [values, setValues] = useState<Record<string, any>>(initialValues);

    useEffect(() => {
        if (initialValues) {
            setValues(prev => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    const handleChange = (name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
                <div key={field.name}>
                    {field.type === 'select' ? (
                         <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <select
                                value={values[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                required={field.required}
                            >
                                <option value="">Select...</option>
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : field.type === 'boolean' ? (
                         <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={!!values[field.name]}
                                onChange={(e) => handleChange(field.name, e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                {field.label}
                            </label>
                        </div>
                    ) : field.type === 'scale' ? (
                        <div className="space-y-1">
                             <label className="block text-sm font-medium text-gray-700">
                                {field.label} (1-5)
                            </label>
                            <div className="flex space-x-4">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <label key={val} className="flex items-center">
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={val}
                                            checked={Number(values[field.name]) === val}
                                            onChange={() => handleChange(field.name, val)}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{val}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Input
                            label={field.label}
                            type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                            value={values[field.name] || ''}
                            onChange={(e) => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                            required={field.required}
                            min={field.validation?.min || field.min}
                            max={field.validation?.max || field.max}
                        />
                    )}
                </div>
            ))}
            <Button type="submit" isLoading={isLoading} className="w-full">
                {submitLabel}
            </Button>
        </form>
    );
};

export default SchemaForm;
