import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Mumbai University CGPA Calculator | Sem 3 Computer, IT & EXTC | NEP 2020 | Free SGPA Calculator',
    description: 'Free Mumbai University CGPA Calculator for Semester 3 - Computer Engineering, IT & EXTC. Calculate SGPA instantly with NEP 2020 grading. Component-wise marks (External, Internal, TW, OR). Accurate credit-weighted results. Official MU grading criteria.',
    keywords: [
        // Primary Keywords - High Search Volume
        'Mumbai University CGPA Calculator',
        'MU CGPA Calculator',
        'Mumbai University SGPA Calculator',
        'NEP 2020 CGPA Calculator',
        'Mumbai University Semester 3 Calculator',

        // Branch-Specific Keywords - Computer Engineering
        'Computer Engineering CGPA Calculator',
        'COMPS CGPA Calculator Mumbai University',
        'Computer Engineering Sem 3 CGPA',
        'Mumbai University Computer Engineering Calculator',
        'COMPS Third Semester CGPA',
        'Computer Engineering NEP 2020 Calculator',
        'BE Computer CGPA Calculator',
        'Computer Engineering Grade Calculator MU',

        // Branch-Specific Keywords - Information Technology
        'IT CGPA Calculator Mumbai University',
        'Information Technology CGPA Calculator',
        'IT Sem 3 CGPA Calculator',
        'Mumbai University IT Calculator',
        'Information Technology Third Semester CGPA',
        'IT NEP 2020 Grade Calculator',
        'BE IT CGPA Calculator',
        'IT Engineering CGPA Mumbai University',

        // Branch-Specific Keywords - EXTC
        'EXTC CGPA Calculator Mumbai University',
        'Electronics and Telecommunication CGPA',
        'EXTC Sem 3 Calculator',
        'Electronics Engineering CGPA Calculator',
        'EXTC Third Semester Grade Calculator',
        'Mumbai University EXTC Calculator',
        'BE EXTC CGPA Calculator',
        'Telecommunication Engineering CGPA',

        // Semester-Specific Keywords
        'Third Semester CGPA Calculator',
        'Sem 3 Grade Calculator Mumbai University',
        'Third Semester Grade Point Calculator',
        'Semester 3 SGPA Calculator',
        'Third Year First Semester Calculator',
        'SE Sem 1 CGPA Calculator',
        'Second Year CGPA Calculator Mumbai University',

        // NEP 2020 Specific Keywords
        'NEP 2020 Grading System Mumbai University',
        'New Education Policy CGPA Calculator',
        'NEP 2020 Grade Point Calculator',
        'Mumbai University NEP Grading',
        'NEP 2020 Semester Calculator',

        // Feature-Based Keywords
        'CGPA Calculator with Credit System',
        'Component-wise Marks Calculator',
        'External Internal TW OR Calculator',
        'Mumbai University Grade Point Average',
        'Credit-weighted CGPA Calculator',
        'Percentage to CGPA Converter Mumbai University',
        'CGPA to Percentage Calculator MU',

        // Academic Keywords
        'Engineering Mathematics 3 Calculator',
        'Discrete Structure CGPA Calculator',
        'Analysis of Algorithms Grade Calculator',
        'Computer Organization CGPA',
        'Full Stack Java Programming Calculator',
        'Mumbai University Engineering Calculator',

        // Location-Based Keywords
        'Mumbai University Calculator',
        'MU Engineering CGPA',
        'Maharashtra Engineering CGPA Calculator',
        'Mumbai Engineering College Calculator',

        // Long-Tail Keywords
        'How to calculate CGPA Mumbai University',
        'Mumbai University CGPA calculation formula',
        'Calculate semester CGPA Mumbai University',
        'Free CGPA Calculator Mumbai University',
        'Online SGPA Calculator Mumbai University',
        'Mumbai University result calculator online',

        // Comparison Keywords
        'Best CGPA Calculator Mumbai University',
        'Accurate CGPA Calculator MU',
        'Official Mumbai University CGPA Calculator',
        'Mumbai University Grade Calculator 2024',
        'Mumbai University Calculator 2025',

        // Problem-Solving Keywords
        'Check if passed Mumbai University',
        'Minimum marks required Mumbai University',
        'Mumbai University passing criteria calculator',
        'Calculate fail subjects Mumbai University',

        // Generic High-Volume Keywords
        'CGPA Calculator',
        'SGPA Calculator',
        'Grade Point Calculator',
        'Engineering CGPA Calculator',
        'University CGPA Calculator',
        'Online Grade Calculator',
        'Free CGPA Calculator',
        'Student Grade Calculator',

        // Alternative Spellings & Variations
        'MU Sem 3 Calculator',
        'Mumbai Uni CGPA',
        'Mumbai University Sem III Calculator',
        'MU Third Semester Calculator',
        'Mumbai University SE Calculator',

        // Mobile & Voice Search Keywords
        'calculate my CGPA Mumbai University',
        'what is my CGPA Mumbai University',
        'Mumbai University CGPA calculator online free',
        'instant CGPA calculator Mumbai University'
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
        url: 'https://cgpa-calculator-sem-3.vercel.app',
        title: 'Mumbai University CGPA Calculator | Sem 3 Computer, IT & EXTC | NEP 2020',
        description: 'Free CGPA Calculator for Mumbai University Semester 3 students (Computer Engineering, IT, EXTC). Calculate SGPA instantly with NEP 2020 grading. Component-wise marks input. Accurate results.',
        siteName: 'MU CGPA Calculator - Computer, IT & EXTC',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mumbai University CGPA Calculator | Sem 3 Computer, IT & EXTC',
        description: 'Free Mumbai University CGPA Calculator for Semester 3. Computer Engineering, IT & EXTC. Calculate SGPA with NEP 2020 grading instantly.',
        creator: '@sumitsingh',
    },
    category: 'Education',
    classification: 'Education Tool',
    other: {
        'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID || '',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

    return (
        <html lang="en">
            <head>
                {adsenseId && (
                    <Script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                )}
            </head>
            <body>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
