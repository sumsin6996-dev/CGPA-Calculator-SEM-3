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
    totalCredits: number;
    earnedCredits: number;
    gradeDistribution: { [key: string]: number };
}
