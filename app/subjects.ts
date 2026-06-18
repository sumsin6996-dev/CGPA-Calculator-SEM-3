import { Subject, SemesterMeta } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// HELPER – creates a fresh copy of a subject so state mutations never
// bleed between renders / semester resets.
// ─────────────────────────────────────────────────────────────────────────────
function makeSubject(s: Omit<Subject, 'totalMarks' | 'grade' | 'gradePoints' | 'percentage' | 'isFailed'>): Subject {
    return {
        ...s,
        components: s.components.map((c) => ({ ...c, marks: 0 })),
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// SEMESTER 3 – COMPUTER ENGINEERING
// ─────────────────────────────────────────────────────────────────────────────
const SEM3_COMPUTER_RAW = [
    {
        code: 'Maths',
        name: 'Engineering Mathematics – III',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'DSGT',
        name: 'Discrete Structure and Graph Theory',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'AOA',
        name: 'Analysis of Algorithms',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'COA',
        name: 'Computer Organization & Architecture',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'AOA Lab',
        name: 'Analysis of Algorithms Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'COA Lab',
        name: 'Computer Organization & Architecture Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'FSJP',
        name: 'Full Stack Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'ED',
        name: 'Entrepreneurship Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
    {
        code: 'ESE',
        name: 'Environmental Science and Engineering',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEMESTER 3 – INFORMATION TECHNOLOGY
// ─────────────────────────────────────────────────────────────────────────────
const SEM3_IT_RAW = [
    {
        code: 'Maths',
        name: 'Applied Mathematics Thinking - I',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'ADSA',
        name: 'Advanced Data Structure & Analysis',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'DBMSA',
        name: 'Database Management System & Application',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'AT',
        name: 'Automata Theory',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'ADS Lab',
        name: 'Advanced Data Structure & Analysis Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'SQL Lab',
        name: 'SQL Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'FSJP',
        name: 'Full Stack Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'ED',
        name: 'Entrepreneurship Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
    {
        code: 'ES',
        name: 'Environmental Science',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEMESTER 3 – EXTC
// ─────────────────────────────────────────────────────────────────────────────
const SEM3_EXTC_RAW = [
    {
        code: 'Maths',
        name: 'Mathematics for Signal Analysis',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'EDLC',
        name: 'Electronic Devices and Linear Circuits',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'DSD',
        name: 'Digital System Design',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'NTCS',
        name: 'Network Theory and Control System',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'EDLC Lab',
        name: 'Electronic Devices and Linear Circuits Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'DSD Lab',
        name: 'Digital System Design Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'CPP_Java',
        name: 'C++ and Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
            { name: 'OR', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'ED',
        name: 'Entrepreneurship Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
    {
        code: 'ESE',
        name: 'Environmental Science',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEMESTER 4 – COMPUTER ENGINEERING (NEP 2020)
// Theory: External (60) + Internal (40) = 100  [except BFS: 30+20=50]
// Labs: Oral (25) + TW (25) = 50
// TW-only subjects: TW (50) = 50
// Mini Project: Oral (25) + TW (50) = 75
// Total Credits = 23
// ─────────────────────────────────────────────────────────────────────────────
const SEM4_COMPUTER_RAW = [
    // Theory Subjects
    {
        code: 'BFS',
        name: 'Basics of Financial Services',
        credits: 2,
        components: [
            { name: 'External', minMarks: 12, maxMarks: 30 },
            { name: 'Internal', minMarks: 8, maxMarks: 20 },
        ],
    },
    {
        code: 'CT',
        name: 'Computational Theory',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'DBMS',
        name: 'Database Management System',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'OS',
        name: 'Operating System',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    {
        code: 'IWT',
        name: 'Introduction to Web Technologies',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60 },
            { name: 'Internal', minMarks: 16, maxMarks: 40 },
        ],
    },
    // Lab Subjects
    {
        code: 'DBMS Lab',
        name: 'DBMS Lab',
        credits: 1,
        components: [
            { name: 'Oral', minMarks: 10, maxMarks: 25 },
            { name: 'TW', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'OS Lab',
        name: 'Operating System Lab',
        credits: 1,
        components: [
            { name: 'Oral', minMarks: 10, maxMarks: 25 },
            { name: 'TW', minMarks: 10, maxMarks: 25 },
        ],
    },
    {
        code: 'WT Lab',
        name: 'Web Technologies Lab',
        credits: 1,
        components: [
            { name: 'Oral', minMarks: 10, maxMarks: 25 },
            { name: 'TW', minMarks: 10, maxMarks: 25 },
        ],
    },
    // Term Work Only
    {
        code: 'BMD',
        name: 'Business Model Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
    {
        code: 'DT',
        name: 'Design Thinking',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
    // Mini Project
    {
        code: 'MP',
        name: 'Mini Project',
        credits: 2,
        components: [
            { name: 'Oral', minMarks: 10, maxMarks: 25 },
            { name: 'TW', minMarks: 20, maxMarks: 50 },
        ],
    },
];


// To add a new semester, insert a new key here with its branches.
// ─────────────────────────────────────────────────────────────────────────────
export const SEMESTER_CONFIG: Record<
    string,
    {
        meta: SemesterMeta;
        branches: Record<string, Subject[]>;
        practicalStartIndex: Record<string, number>;
    }
> = {
    sem3: {
        meta: {
            label: 'Semester 3',
            totalCredits: 22,
            branches: [
                { key: 'computer', label: 'Computer Engineering' },
                { key: 'it', label: 'Information Technology' },
                { key: 'extc', label: 'EXTC' },
            ],
        },
        branches: {
            computer: SEM3_COMPUTER_RAW.map(makeSubject),
            it: SEM3_IT_RAW.map(makeSubject),
            extc: SEM3_EXTC_RAW.map(makeSubject),
        },
        practicalStartIndex: {
            computer: 5,
            it: 5,
            extc: 5,
        },
    },
    sem4: {
        meta: {
            label: 'Semester 4',
            totalCredits: 23,
            branches: [
                { key: 'computer', label: 'Computer Engineering' },
            ],
        },
        branches: {
            computer: SEM4_COMPUTER_RAW.map(makeSubject),
        },
        practicalStartIndex: {
            computer: 5, // first 5 are theory subjects
        },
    },
    // ── ADD SEMESTER 5, 6, 7, 8 HERE ─────────────────────────────────────────
    // sem5: { meta: {...}, branches: { computer: [...] }, practicalStartIndex: {...} },
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Returns a fresh copy of subjects for the given semester + branch. */
export function getSubjects(semester: string, branch: string): Subject[] {
    const semConfig = SEMESTER_CONFIG[semester];
    if (!semConfig) return [];
    const subjects = semConfig.branches[branch];
    if (!subjects) return [];
    return subjects.map((s) => ({
        ...s,
        components: s.components.map((c) => ({ ...c, marks: 0 })),
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    }));
}

/** Returns the index where "practical" subjects start for the given semester + branch. */
export function getPracticalStartIndex(semester: string, branch: string): number {
    return SEMESTER_CONFIG[semester]?.practicalStartIndex[branch] ?? 5;
}

/** Returns all semester metadata (for rendering the selector). */
export function getAllSemesters() {
    return Object.entries(SEMESTER_CONFIG).map(([key, val]) => ({
        key,
        ...val.meta,
    }));
}

/** Returns branches available for a given semester. */
export function getBranchesForSemester(semester: string) {
    return SEMESTER_CONFIG[semester]?.meta.branches ?? [];
}

/** Returns total credits for a semester (useful for display). */
export function getTotalCredits(semester: string): number {
    return SEMESTER_CONFIG[semester]?.meta.totalCredits ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY EXPORTS (kept for backward compatibility)
// ─────────────────────────────────────────────────────────────────────────────
export type Branch = string;

export function getSubjectsByBranch(branch: Branch): Subject[] {
    return getSubjects('sem3', branch);
}

export const COMPUTER_SUBJECTS = SEM3_COMPUTER_RAW.map(makeSubject);
export const IT_SUBJECTS = SEM3_IT_RAW.map(makeSubject);
export const EXTC_SUBJECTS = SEM3_EXTC_RAW.map(makeSubject);
export const INITIAL_SUBJECTS = COMPUTER_SUBJECTS;
