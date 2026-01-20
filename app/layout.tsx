import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Mumbai University CGPA Calculator',
    description: 'Calculate your CGPA for Mumbai University Third Semester Computer Engineering',
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
