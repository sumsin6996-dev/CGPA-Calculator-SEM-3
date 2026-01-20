'use client';

import { useState, useRef, useEffect } from 'react';
import { Subject } from '../types';
import { getSubjectsByBranch, Branch } from '../subjects';
import { calculateGrade, calculateSGPA, checkMinimumMarks } from '../grading';
import SubjectInput from './SubjectInput';
import Results from './Results';

export default function Calculator() {
    const [branch, setBranch] = useState<Branch>('computer');
    const [subjects, setSubjects] = useState<Subject[]>(getSubjectsByBranch('computer'));
    const subjectRefs = useRef<{ [key: string]: { focusFirstInput: () => void } | null }>({});

    const handleComponentChange = (code: string, componentName: string, marks: number) => {
        setSubjects((prev) =>
            prev.map((subject) => {
                if (subject.code === code) {
                    // Update the specific component
                    const updatedComponents = subject.components.map((comp) =>
                        comp.name === componentName ? { ...comp, marks } : comp
                    );

                    // Calculate total marks
                    const totalMarks = updatedComponents.reduce((sum, comp) => sum + comp.marks, 0);

                    // Calculate max total
                    const maxTotal = updatedComponents.reduce((sum, comp) => sum + comp.maxMarks, 0);

                    // Calculate percentage
                    const percentage = maxTotal > 0 ? (totalMarks / maxTotal) * 100 : 0;

                    // Check if failed due to minimum marks requirement
                    const updatedSubject = {
                        ...subject,
                        components: updatedComponents,
                        totalMarks,
                        percentage,
                        grade: '-',
                        gradePoints: 0,
                        isFailed: false,
                    };

                    const isFailed = checkMinimumMarks(updatedSubject);

                    // Get grade and points based on percentage and fail status
                    const { grade, points } = calculateGrade(percentage, isFailed);

                    return {
                        ...updatedSubject,
                        grade,
                        gradePoints: points,
                        isFailed,
                    };
                }
                return subject;
            })
        );
    };

    const handleReset = () => {
        setSubjects(getSubjectsByBranch(branch));
    };

    const handleBranchChange = (newBranch: Branch) => {
        setBranch(newBranch);
        setSubjects(getSubjectsByBranch(newBranch));
    };

    // Create callback for moving to next subject
    const createNextSubjectCallback = (currentIndex: number) => {
        return () => {
            const nextIndex = currentIndex + 1;
            if (nextIndex < subjects.length) {
                const nextSubject = subjects[nextIndex];
                const nextRef = subjectRefs.current[nextSubject.code];
                if (nextRef) {
                    setTimeout(() => nextRef.focusFirstInput(), 50);
                }
            }
        };
    };

    const result = calculateSGPA(subjects);
    const hasMarks = subjects.some((s) => s.totalMarks > 0);
    const hasFailures = subjects.some((s) => s.isFailed);

    // Separate theory and practical subjects
    const theorySubjects = subjects.slice(0, 5);
    const practicalSubjects = subjects.slice(5);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full px-6 py-2 text-sm font-bold mb-4 shadow-lg">
                    NEP 2020
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Mumbai University
                </h1>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    CGPA Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Third Semester - {branch === 'computer' ? 'Computer Engineering' : branch === 'it' ? 'Information Technology' : 'Electronics & Telecommunication'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Total Credits: 22
                </p>
            </div>

            {/* Branch Selector */}
            <div className="mb-8 flex justify-center">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => handleBranchChange('computer')}
                        className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${branch === 'computer'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                    >
                        Computer Engineering
                    </button>
                    <button
                        onClick={() => handleBranchChange('it')}
                        className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${branch === 'it'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                    >
                        Information Technology
                    </button>
                    <button
                        onClick={() => handleBranchChange('extc')}
                        className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${branch === 'extc'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                    >
                        EXTC
                    </button>
                </div>
            </div>

            {/* Failure Warning */}
            {hasFailures && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">
                            Warning: One or more subjects have marks below the minimum requirement!
                        </span>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Subjects Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            Enter Your Marks
                        </h3>
                        {hasMarks && (
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Reset All
                            </button>
                        )}
                    </div>

                    {/* Theory Subjects */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            Theory Subjects
                        </h4>
                        <div className="space-y-3">
                            {theorySubjects.map((subject, index) => (
                                <SubjectInput
                                    key={subject.code}
                                    ref={(el) => {
                                        subjectRefs.current[subject.code] = el;
                                    }}
                                    subject={subject}
                                    onComponentChange={handleComponentChange}
                                    onLastInputComplete={createNextSubjectCallback(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Practical Subjects */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                            Practicals / TW
                        </h4>
                        <div className="space-y-3">
                            {practicalSubjects.map((subject, index) => (
                                <SubjectInput
                                    key={subject.code}
                                    ref={(el) => {
                                        subjectRefs.current[subject.code] = el;
                                    }}
                                    subject={subject}
                                    onComponentChange={handleComponentChange}
                                    onLastInputComplete={createNextSubjectCallback(theorySubjects.length + index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Grading Scale Reference */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                            Mumbai University Grading Scale (Strict)
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                            {[
                                { grade: 'O', range: '≥ 90', points: 10 },
                                { grade: 'A+', range: '80-89', points: 9 },
                                { grade: 'A', range: '70-79', points: 8 },
                                { grade: 'B+', range: '60-69', points: 7 },
                                { grade: 'B', range: '55-59', points: 6 },
                                { grade: 'C', range: '50-54', points: 5 },
                                { grade: 'F', range: '< 50', points: 0 },
                            ].map((item) => (
                                <div
                                    key={item.grade}
                                    className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center"
                                >
                                    <div className={`text-lg font-bold ${getGradeColor(item.grade)}`}>
                                        {item.grade}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {item.range}%
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                        GP {item.points}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-xs text-blue-800 dark:text-blue-300">
                                    <strong>Minimum Marks Requirements:</strong>
                                </p>
                                <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 ml-4 list-disc space-y-0.5">
                                    <li>Theory External: Minimum 24/60</li>
                                    <li>Theory Internal: Minimum 16/40</li>
                                    {branch === 'computer' && (
                                        <>
                                            <li>AOA/COA Labs TW: Minimum 10/25</li>
                                            <li>AOA/COA Labs OR: Minimum 10/25</li>
                                            <li>FSJP TW: Minimum 20/50</li>
                                            <li>FSJP OR: Minimum 10/25</li>
                                        </>
                                    )}
                                    {branch === 'it' && (
                                        <>
                                            <li>ADSA/DBMS Labs TW: Minimum 10/25</li>
                                            <li>ADSA/DBMS Labs OR: Minimum 10/25</li>
                                            <li>FSJP TW: Minimum 20/50</li>
                                            <li>FSJP OR: Minimum 10/25</li>
                                        </>
                                    )}
                                    {branch === 'extc' && (
                                        <>
                                            <li>EDLC/DSD Labs TW: Minimum 10/25</li>
                                            <li>EDLC/DSD Labs OR: Minimum 10/25</li>
                                            <li>C++ & Java TW: Minimum 20/50</li>
                                            <li>C++ & Java OR: Minimum 10/25</li>
                                        </>
                                    )}
                                    <li>ED/ES TW: Minimum 20/50</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <p className="text-xs text-purple-800 dark:text-purple-300">
                                    <strong>Subject Structure:</strong>
                                </p>
                                <ul className="text-xs text-purple-700 dark:text-purple-300 mt-1 ml-4 list-disc space-y-0.5">
                                    <li>Theory: External (60) + Internal (40) = 100</li>
                                    <li>Maths: External (60) + Internal (40) + TW (25) = 125</li>
                                    {branch === 'computer' && (
                                        <>
                                            <li>AOA/COA Labs: TW (25) + OR (25) = 50</li>
                                            <li>FSJP: TW (50) + OR (25) = 75</li>
                                        </>
                                    )}
                                    {branch === 'it' && (
                                        <>
                                            <li>AOA/DBMS Labs: TW (25) + OR (25) = 50</li>
                                            <li>FSJP: TW (50) + OR (25) = 75</li>
                                        </>
                                    )}
                                    {branch === 'extc' && (
                                        <>
                                            <li>EDLC/DSD Labs: TW (25) + OR (25) = 50</li>
                                            <li>C++ & Java: TW (50) + OR (25) = 75</li>
                                        </>
                                    )}
                                    <li>ED/ES: TW (50) = 50</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-1">
                    {hasMarks && (
                        <div className="sticky top-8">
                            <Results result={result} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function getGradeColor(grade: string): string {
    const colors: { [key: string]: string } = {
        'O': 'text-emerald-500',
        'A+': 'text-green-500',
        'A': 'text-lime-500',
        'B+': 'text-yellow-500',
        'B': 'text-orange-500',
        'C': 'text-amber-600',
        'F': 'text-red-600',
    };
    return colors[grade] || 'text-gray-400';
}
