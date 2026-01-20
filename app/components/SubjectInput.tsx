import { Subject, SubjectComponent } from '../types';
import { getGradeColor, getGradeBgColor } from '../grading';
import { useRef, useEffect } from 'react';

interface SubjectInputProps {
    subject: Subject;
    onComponentChange: (code: string, componentName: string, marks: number) => void;
}

export default function SubjectInput({ subject, onComponentChange }: SubjectInputProps) {
    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const getMaxDigits = (maxMarks: number): number => {
        return maxMarks.toString().length;
    };

    const handleChange = (component: SubjectComponent, value: string, index: number) => {
        const marks = value === '' ? 0 : Math.min(component.maxMarks, Math.max(0, parseInt(value) || 0));
        onComponentChange(subject.code, component.name, marks);

        // Auto-focus to next input if max digits reached
        const maxDigits = getMaxDigits(component.maxMarks);
        if (value.length >= maxDigits && index < subject.components.length - 1) {
            const nextComponent = subject.components[index + 1];
            const nextInputKey = `${subject.code}-${nextComponent.name}`;
            const nextInput = inputRefs.current[nextInputKey];
            if (nextInput) {
                setTimeout(() => nextInput.focus(), 0);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to next input on Enter key
        if (e.key === 'Enter' && index < subject.components.length - 1) {
            e.preventDefault();
            const nextComponent = subject.components[index + 1];
            const nextInputKey = `${subject.code}-${nextComponent.name}`;
            const nextInput = inputRefs.current[nextInputKey];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const maxTotal = subject.components.reduce((sum, comp) => sum + comp.maxMarks, 0);

    // Check if any component has marks below minimum
    const hasMinimumIssue = subject.components.some(
        (comp) => comp.marks > 0 && comp.marks < comp.minMarks
    );

    return (
        <div className={`group relative bg-white dark:bg-gray-800 rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-lg ${subject.isFailed
                ? 'border-red-500 dark:border-red-500'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-indigo-500/10'
            }`}>
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                {subject.code}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {subject.credits} {subject.credits === 1 ? 'credit' : 'credits'}
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {subject.name}
                        </h3>
                    </div>

                    {/* Grade Display */}
                    <div
                        className={`min-w-[90px] px-4 py-2 rounded-lg border-2 text-center font-bold transition-all ${getGradeBgColor(
                            subject.grade
                        )}`}
                    >
                        <div className={`text-xl ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                        </div>
                        {subject.gradePoints > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {subject.gradePoints} GP
                            </div>
                        )}
                    </div>
                </div>

                {/* Component Inputs */}
                <div className="flex flex-wrap items-center gap-4">
                    {subject.components.map((component, index) => {
                        const isBelowMin = component.marks > 0 && component.marks < component.minMarks;
                        const inputKey = `${subject.code}-${component.name}`;

                        return (
                            <div key={component.name} className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[70px]">
                                    {component.name}:
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={(el) => (inputRefs.current[inputKey] = el)}
                                        type="number"
                                        min="0"
                                        max={component.maxMarks}
                                        value={component.marks || ''}
                                        onChange={(e) => handleChange(component, e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        placeholder="0"
                                        className={`w-20 px-3 py-1.5 text-center font-semibold bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none ${isBelowMin
                                                ? 'border-red-500 text-red-600 dark:text-red-400'
                                                : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                                            }`}
                                    />
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        / {component.maxMarks}
                                    </span>
                                    {component.minMarks > 0 && (
                                        <span className={`text-xs whitespace-nowrap ${isBelowMin ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                                            (min: {component.minMarks})
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total and Percentage Row */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Total: </span>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {subject.totalMarks} / {maxTotal}
                            </span>
                        </div>
                        {subject.percentage > 0 && (
                            <div className="text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Percentage: </span>
                                <span className={`font-bold ${getGradeColor(subject.grade)}`}>
                                    {subject.percentage.toFixed(2)}%
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Warning for minimum marks */}
                    {hasMinimumIssue && (
                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-semibold">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Below minimum
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
