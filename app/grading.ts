import { GradeRange, Subject, CalculationResult } from './types';

// Mumbai University Grading System (STRICT - based on percentage)
export const GRADE_RANGES: GradeRange[] = [
    { min: 90, max: 100, grade: 'O', points: 10 },
    { min: 80, max: 89.99, grade: 'A+', points: 9 },
    { min: 70, max: 79.99, grade: 'A', points: 8 },
    { min: 60, max: 69.99, grade: 'B+', points: 7 },
    { min: 55, max: 59.99, grade: 'B', points: 6 },
    { min: 50, max: 54.99, grade: 'C', points: 5 },
    { min: 0, max: 49.99, grade: 'F', points: 0 },
];

export function calculateGrade(
    percentage: number,
    isFailed: boolean
): { grade: string; points: number } {
    if (percentage < 0 || percentage > 100) {
        return { grade: '-', points: 0 };
    }

    // If failed due to minimum marks requirement, return F regardless of percentage
    if (isFailed) {
        return { grade: 'F', points: 0 };
    }

    const gradeRange = GRADE_RANGES.find(
        (range) => percentage >= range.min && percentage <= range.max
    );

    return gradeRange
        ? { grade: gradeRange.grade, points: gradeRange.points }
        : { grade: '-', points: 0 };
}

export function checkMinimumMarks(subject: Subject): boolean {
    // Check if any component fails to meet minimum marks requirement
    return subject.components.some((comp) => comp.marks < comp.minMarks && comp.marks > 0);
}

export function calculateSGPA(subjects: Subject[]): CalculationResult {
    let totalCredits = 0;
    let weightedSum = 0;
    let earnedCredits = 0;
    const gradeDistribution: { [key: string]: number } = {};

    subjects.forEach((subject) => {
        totalCredits += subject.credits;
        weightedSum += subject.credits * subject.gradePoints;

        if (subject.gradePoints > 0) {
            earnedCredits += subject.credits;
        }

        // Track grade distribution
        if (subject.grade !== '-') {
            gradeDistribution[subject.grade] = (gradeDistribution[subject.grade] || 0) + 1;
        }
    });

    const sgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

    return {
        sgpa: Math.round(sgpa * 100) / 100,
        totalCredits,
        earnedCredits,
        gradeDistribution,
    };
}

export function getGradeColor(grade: string): string {
    const colors: { [key: string]: string } = {
        'O': 'text-emerald-500',
        'A+': 'text-green-500',
        'A': 'text-lime-500',
        'B+': 'text-yellow-500',
        'B': 'text-orange-500',
        'C': 'text-amber-600',
        'F': 'text-red-600',
        '-': 'text-gray-400',
    };
    return colors[grade] || 'text-gray-400';
}

export function getGradeBgColor(grade: string): string {
    const colors: { [key: string]: string } = {
        'O': 'bg-emerald-500/10 border-emerald-500/30',
        'A+': 'bg-green-500/10 border-green-500/30',
        'A': 'bg-lime-500/10 border-lime-500/30',
        'B+': 'bg-yellow-500/10 border-yellow-500/30',
        'B': 'bg-orange-500/10 border-orange-500/30',
        'C': 'bg-amber-600/10 border-amber-600/30',
        'F': 'bg-red-600/10 border-red-600/30',
        '-': 'bg-gray-500/10 border-gray-500/30',
    };
    return colors[grade] || 'bg-gray-500/10 border-gray-500/30';
}
