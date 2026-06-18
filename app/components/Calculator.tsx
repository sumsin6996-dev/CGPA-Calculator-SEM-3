'use client';

import { useState, useRef, useCallback } from 'react';
import { Subject } from '../types';
import {
    getSubjects,
    getPracticalStartIndex,
    getAllSemesters,
    getBranchesForSemester,
    getTotalCredits,
} from '../subjects';
import { calculateGrade, calculateSGPA, checkMinimumMarks, getGradeColor } from '../grading';
import SubjectInput from './SubjectInput';
import Results from './Results';

type SemKey = string;
type BranchKey = string;

export default function Calculator() {
    const allSemesters = getAllSemesters();

    const [semester, setSemester] = useState<SemKey>('sem3');
    const [branch, setBranch] = useState<BranchKey>('computer');
    const [subjects, setSubjects] = useState<Subject[]>(getSubjects('sem3', 'computer'));

    const subjectRefs = useRef<{ [key: string]: { focusFirstInput: () => void } | null }>({});

    const availableBranches = getBranchesForSemester(semester);
    const totalCredits = getTotalCredits(semester);
    const practicalStart = getPracticalStartIndex(semester, branch);
    const theorySubjects = subjects.slice(0, practicalStart);
    const practicalSubjects = subjects.slice(practicalStart);
    const hasMarks = subjects.some((s) => s.totalMarks > 0);
    const hasFailures = subjects.some((s) => s.isFailed);
    const result = calculateSGPA(subjects);

    const semesterLabel = allSemesters.find((s) => s.key === semester)?.label ?? '';
    const branchLabel = availableBranches.find((b) => b.key === branch)?.label ?? '';

    const handleSemesterChange = (newSem: SemKey) => {
        setSemester(newSem);
        const branches = getBranchesForSemester(newSem);
        const firstBranch = branches[0]?.key ?? 'computer';
        setBranch(firstBranch);
        setSubjects(getSubjects(newSem, firstBranch));
    };

    const handleBranchChange = (newBranch: BranchKey) => {
        setBranch(newBranch);
        setSubjects(getSubjects(semester, newBranch));
    };

    const handleReset = () => {
        setSubjects(getSubjects(semester, branch));
    };

    const handleComponentChange = useCallback(
        (code: string, componentName: string, marks: number) => {
            setSubjects((prev) =>
                prev.map((subject) => {
                    if (subject.code !== code) return subject;

                    const updatedComponents = subject.components.map((comp) =>
                        comp.name === componentName ? { ...comp, marks } : comp
                    );

                    const totalMarks = updatedComponents.reduce((sum, c) => sum + c.marks, 0);
                    const maxTotal = updatedComponents.reduce((sum, c) => sum + c.maxMarks, 0);
                    const percentage = maxTotal > 0 ? (totalMarks / maxTotal) * 100 : 0;

                    const updatedSubject: Subject = {
                        ...subject,
                        components: updatedComponents,
                        totalMarks,
                        percentage,
                        grade: '-',
                        gradePoints: 0,
                        isFailed: false,
                    };

                    const isFailed = checkMinimumMarks(updatedSubject);
                    const { grade, points } = calculateGrade(percentage, isFailed);

                    return { ...updatedSubject, grade, gradePoints: points, isFailed };
                })
            );
        },
        []
    );

    const createNextSubjectCallback = (currentIndex: number) => () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < subjects.length) {
            const nextSubject = subjects[nextIndex];
            const nextRef = subjectRefs.current[nextSubject.code];
            if (nextRef) setTimeout(() => nextRef.focusFirstInput(), 50);
        }
    };

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
                    {semesterLabel} – {branchLabel}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Total Credits: {totalCredits}
                </p>
            </div>

            {/* Semester Selector */}
            <div className="mb-6 flex justify-center">
                <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700 gap-1">
                    {allSemesters.map((sem) => (
                        <button
                            key={sem.key}
                            onClick={() => handleSemesterChange(sem.key)}
                            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                semester === sem.key
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                        >
                            {sem.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Branch Selector (only shown when more than 1 branch) */}
            {availableBranches.length > 1 && (
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 shadow border border-gray-200 dark:border-gray-700 gap-1">
                        {availableBranches.map((b) => (
                            <button
                                key={b.key}
                                onClick={() => handleBranchChange(b.key)}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    branch === b.key
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                }`}
                            >
                                {b.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Failure Warning */}
            {hasFailures && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
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

                    {theorySubjects.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                                Theory Subjects
                            </h4>
                            <div className="space-y-3">
                                {theorySubjects.map((subject, index) => (
                                    <SubjectInput
                                        key={`${semester}-${branch}-${subject.code}`}
                                        ref={(el) => { subjectRefs.current[subject.code] = el; }}
                                        subject={subject}
                                        onComponentChange={handleComponentChange}
                                        onLastInputComplete={createNextSubjectCallback(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {practicalSubjects.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                                Practicals / TW
                            </h4>
                            <div className="space-y-3">
                                {practicalSubjects.map((subject, index) => (
                                    <SubjectInput
                                        key={`${semester}-${branch}-${subject.code}`}
                                        ref={(el) => { subjectRefs.current[subject.code] = el; }}
                                        subject={subject}
                                        onComponentChange={handleComponentChange}
                                        onLastInputComplete={createNextSubjectCallback(
                                            theorySubjects.length + index
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grading Scale Reference */}
                    <GradingScaleReference semester={semester} branch={branch} />
                </div>

                {/* Results Section */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <Results result={result} />
                        {hasMarks && (
                            <SubjectBreakdownTable subjects={subjects} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function GradingScaleReference({ semester, branch }: { semester: string; branch: string }) {
    const gradeItems = [
        { grade: 'O', range: '≥ 90', points: 10 },
        { grade: 'A+', range: '80–89', points: 9 },
        { grade: 'A', range: '70–79', points: 8 },
        { grade: 'B+', range: '60–69', points: 7 },
        { grade: 'B', range: '55–59', points: 6 },
        { grade: 'C', range: '50–54', points: 5 },
        { grade: 'D', range: '40–49', points: 4 },
        { grade: 'F', range: '< 40', points: 0 },
    ];

    const minMarkInfo: Record<string, string[]> = {
        'sem3-computer': [
            'Theory External: min 24 / 60',
            'Theory Internal: min 16 / 40',
            'Maths TW: min 10 / 25',
            'AOA / COA Lab TW & OR: min 10 / 25',
            'FSJP TW: min 20 / 50  |  OR: min 10 / 25',
            'ED / ESE TW: min 20 / 50',
        ],
        'sem3-it': [
            'Theory External: min 24 / 60',
            'Theory Internal: min 16 / 40',
            'Maths TW: min 10 / 25',
            'ADSA / SQL Lab TW & OR: min 10 / 25',
            'FSJP TW: min 20 / 50  |  OR: min 10 / 25',
            'ED / ES TW: min 20 / 50',
        ],
        'sem3-extc': [
            'Theory External: min 24 / 60',
            'Theory Internal: min 16 / 40',
            'Maths TW: min 10 / 25',
            'EDLC / DSD Lab TW & OR: min 10 / 25',
            'C++ & Java TW: min 20 / 50  |  OR: min 10 / 25',
            'ED / ESE TW: min 20 / 50',
        ],
        'sem4-computer': [
            'BFS External: min 12 / 30',
            'BFS Internal: min 8 / 20',
            'Other Theory External: min 24 / 60',
            'Other Theory Internal: min 16 / 40',
            'Labs (Oral & TW): min 10 / 25 each',
            'BMD / DT TW: min 20 / 50',
            'Mini Project Oral: min 10 / 25  |  TW: min 20 / 50',
        ],
    };

    const key = `${semester}-${branch}`;
    const minMarks = minMarkInfo[key] ?? [];

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                Mumbai University Grading Scale (Strict)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                {gradeItems.map((item, idx) => (
                    <div key={`${item.grade}-${idx}`} className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center">
                        <div className={`text-lg font-bold ${getGradeColor(item.grade)}`}>{item.grade}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.range}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">GP {item.points}</div>
                    </div>
                ))}
            </div>
            {minMarks.length > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold mb-1">
                        Minimum Marks Requirements:
                    </p>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 ml-4 list-disc space-y-0.5">
                        {minMarks.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── Subject Breakdown Table ──────────────────────────────────────────────────
function SubjectBreakdownTable({ subjects }: { subjects: Subject[] }) {
    const filledSubjects = subjects.filter((s) => s.totalMarks > 0);
    if (filledSubjects.length === 0) return null;

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                    Subject-wise Breakdown
                </h4>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                            <th className="text-left px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Subject</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">Marks</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">%</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">Grade</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">GP</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">Cr</th>
                            <th className="text-center px-2 py-2 font-semibold text-gray-600 dark:text-gray-300">Cr×GP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filledSubjects.map((s) => {
                            const maxTotal = s.components.reduce((sum, c) => sum + c.maxMarks, 0);
                            return (
                                <tr
                                    key={s.code}
                                    className={`border-t border-gray-100 dark:border-gray-700 ${
                                        s.isFailed ? 'bg-red-50 dark:bg-red-900/10' : ''
                                    }`}
                                >
                                    <td className="px-3 py-2 text-gray-800 dark:text-gray-200 font-medium truncate max-w-[120px]">
                                        {s.code}
                                    </td>
                                    <td className="text-center px-2 py-2 text-gray-600 dark:text-gray-400">
                                        {s.totalMarks}/{maxTotal}
                                    </td>
                                    <td className="text-center px-2 py-2 text-gray-600 dark:text-gray-400">
                                        {s.percentage.toFixed(1)}
                                    </td>
                                    <td className={`text-center px-2 py-2 font-bold ${getGradeColor(s.grade)}`}>
                                        {s.grade}
                                    </td>
                                    <td className="text-center px-2 py-2 text-gray-600 dark:text-gray-400">
                                        {s.gradePoints}
                                    </td>
                                    <td className="text-center px-2 py-2 text-gray-600 dark:text-gray-400">
                                        {s.credits}
                                    </td>
                                    <td className="text-center px-2 py-2 font-semibold text-gray-800 dark:text-gray-200">
                                        {(s.credits * s.gradePoints).toFixed(0)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
