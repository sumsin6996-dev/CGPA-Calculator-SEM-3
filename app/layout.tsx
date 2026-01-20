import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'NEP 2020 Mumbai University Sem 3 CGPA Calculator',
    description: 'Calculate your CGPA for Mumbai University Third Semester (Computer, IT & EXTC) under NEP 2020. Free online SGPA calculator with official grading criteria, component-wise marks input, and instant results.',
    keywords: [
        'Mumbai University CGPA Calculator',
        'NEP 2020 CGPA Calculator',
        'Mumbai University Semester 3 Calculator',
        'Computer Engineering CGPA',
        'IT CGPA Calculator',
        'Information Technology CGPA',
        'EXTC CGPA Calculator',
        'Electronics and Telecommunication CGPA',
        'SGPA Calculator Mumbai University',
        'Third Semester Grade Calculator',
        'MU CGPA Calculator',
        'Engineering CGPA Calculator',
        'NEP 2020 Grading System',
        'Mumbai University Grade Calculator',
        'Semester Grade Point Calculator',
        'Computer Engineering Sem 3',
        'Mumbai University Result Calculator',
        'CGPA to Percentage Calculator',
        'Engineering Marks Calculator',
        'Mumbai University Third Year',
        'Grade Point Average Calculator',
        'University SGPA Calculator',
        'Online CGPA Calculator',
        'Free Grade Calculator'
    ],
    authors: [{ name: 'Sumit Singh' }],
    creator: 'Sumit Singh',
    publisher: 'Sumit Singh',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://yourdomain.com',
        title: 'NEP 2020 Mumbai University Sem 3 CGPA Calculator',
        description: 'Free online CGPA calculator for Mumbai University Third Semester (Computer, IT & EXTC) students. Calculate SGPA instantly with official NEP 2020 grading criteria.',
        siteName: 'Mumbai University CGPA Calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NEP 2020 Mumbai University Sem 3 CGPA Calculator',
        description: 'Calculate your CGPA for Mumbai University Third Semester (Computer, IT & EXTC) under NEP 2020',
        creator: '@sumitsingh',
    },
    category: 'Education',
    classification: 'Education Tool',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
