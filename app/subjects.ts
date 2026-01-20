import { Subject } from './types';

export type Branch = 'computer' | 'it' | 'extc';

// Third Semester Computer Engineering - Mumbai University
export const COMPUTER_SUBJECTS: Subject[] = [
    // Theory Subjects with External (60) + Internal (40) = 100
    {
        code: 'Maths',
        name: 'Engineering Mathematics – III',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'DSGT',
        name: 'Discrete Structure and Graph Theory',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'AOA',
        name: 'Analysis of Algorithms',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'COA',
        name: 'Computer Organization & Architecture',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // Practicals / TW (Labs with TW + OR)
    {
        code: 'AOA Lab',
        name: 'Analysis of Algorithms Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'COA Lab',
        name: 'Computer Organization & Architecture Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'FSJP',
        name: 'Full Stack Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // ED and ESE - Only TW (50)
    {
        code: 'ED',
        name: 'Entreprenuership Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'ESE',
        name: 'Environemental Science and Engineering',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
];

// Third Semester IT - Mumbai University
export const IT_SUBJECTS: Subject[] = [
    // Theory Subjects with External (60) + Internal (40) = 100
    {
        code: 'Maths',
        name: 'Applied Mathematics Thinking - I',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'ADSA',
        name: 'Advanced Data Structure & Analysis',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'DBMSA',
        name: 'Database Management System & Application',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'AT',
        name: 'Automata Theory',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // Practicals / TW (Labs with TW + OR)
    {
        code: 'ADS Lab',
        name: 'Advanced Data Structure & Analysis Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'SQL Lab',
        name: 'SQL Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'FSJP',
        name: 'Full Stack Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // ED and ESE - Only TW (50)
    {
        code: 'ED',
        name: 'Entreprenuership Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'ES',
        name: 'Environemental Science',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
];

// Third Semester EXTC (Electronics and Telecommunication) - Mumbai University
export const EXTC_SUBJECTS: Subject[] = [
    // Theory Subjects
    {
        code: 'Maths',
        name: 'Mathematics for Signal Analysis',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
            { name: 'Term Work', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'EDLC',
        name: 'Electronic Devices and Linear Circuits',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'DSD',
        name: 'Digital System Design',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'NTCS',
        name: 'Network Theory and Control System',
        credits: 3,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'OE',
        name: 'Open Elective',
        credits: 2,
        components: [
            { name: 'External', minMarks: 24, maxMarks: 60, marks: 0 },
            { name: 'Internal', minMarks: 16, maxMarks: 40, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // Practicals / TW (Labs with TW + OR)
    {
        code: 'EDLC Lab',
        name: 'Electronic Devices and Linear Circuits Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'DSD Lab',
        name: 'Digital System Design Lab',
        credits: 1,
        components: [
            { name: 'TW', minMarks: 10, maxMarks: 25, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'CPP_Java',
        name: 'C++ and Java Programming',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
            { name: 'OR', minMarks: 10, maxMarks: 25, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    // ED and ESE - Only TW (50)
    {
        code: 'ED',
        name: 'Entrepreneurship Development',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
    {
        code: 'ESE',
        name: 'Environmental Science',
        credits: 2,
        components: [
            { name: 'TW', minMarks: 20, maxMarks: 50, marks: 0 },
        ],
        totalMarks: 0,
        grade: '-',
        gradePoints: 0,
        percentage: 0,
        isFailed: false,
    },
];



// Helper function to get subjects by branch
export function getSubjectsByBranch(branch: Branch): Subject[] {
    switch (branch) {
        case 'computer':
            return COMPUTER_SUBJECTS;
        case 'it':
            return IT_SUBJECTS;
        case 'extc':
            return EXTC_SUBJECTS;
        default:
            return COMPUTER_SUBJECTS;
    }
}

// For backward compatibility
export const INITIAL_SUBJECTS = COMPUTER_SUBJECTS;

