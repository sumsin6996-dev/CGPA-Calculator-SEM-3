export interface SubjectComponent {
    name: string;
    minMarks: number;
    maxMarks: number;
    marks: number;
}

export interface Subject {
    code: string;
    name: string;
    credits: number;
    components: SubjectComponent[];
    totalMarks: number;
    grade: string;
    gradePoints: number;
    percentage: number;
    isFailed: boolean;
}

export interface GradeRange {
    min: number;
    max: number;
    grade: string;
    points: number;
}

export interface CalculationResult {
    sgpa: number;
    percentage: number;
    totalCredits: number;
    earnedCredits: number;
    gradeDistribution: { [key: string]: number };
}

// Semester selector type
export type Semester = 'sem3' | 'sem4';

// Metadata about each semester config entry
export interface SemesterMeta {
    label: string;         // Display label e.g. "Semester 3"
    totalCredits: number;  // Total credits for quick display
    branches: BranchMeta[];
}

export interface BranchMeta {
    key: string;
    label: string;
}
