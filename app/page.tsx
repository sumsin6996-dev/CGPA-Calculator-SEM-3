import Calculator from './components/Calculator';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Calculator />

            <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Mumbai University Third Semester Computer Engineering</p>
                <p className="mt-1">Calculate your SGPA based on official grading criteria</p>
            </footer>
        </main>
    );
}
