import { CalculationResult } from '../types';
import { getGradeColor } from '../grading';

interface ResultsProps {
    result: CalculationResult;
}

export default function Results({ result }: ResultsProps) {
    const getSGPAColor = (sgpa: number) => {
        if (sgpa >= 9) return 'text-emerald-500';
        if (sgpa >= 8) return 'text-green-500';
        if (sgpa >= 7) return 'text-lime-500';
        if (sgpa >= 6) return 'text-yellow-500';
        if (sgpa >= 5) return 'text-orange-500';
        return 'text-red-500';
    };

    const getSGPAGrade = (sgpa: number) => {
        if (sgpa >= 9) return 'Outstanding';
        if (sgpa >= 8) return 'Excellent';
        if (sgpa >= 7) return 'Very Good';
        if (sgpa >= 6) return 'Good';
        if (sgpa >= 5) return 'Average';
        if (sgpa >= 4) return 'Pass';
        return 'Fail';
    };

    return (
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-2xl">
            <div className="text-center mb-6">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold mb-3">
                    NEP 2020
                </div>
                <h2 className="text-2xl font-bold mb-2">Your SGPA</h2>
                <div className="flex items-center justify-center gap-2">
                    <div className={`text-7xl font-black ${getSGPAColor(result.sgpa)} drop-shadow-lg`}>
                        {result.sgpa.toFixed(2)}
                    </div>
                    <div className="text-3xl font-bold text-white/60 mt-4">
                        /10
                    </div>
                </div>
                <p className="text-xl font-semibold mt-3 text-white/90">
                    {getSGPAGrade(result.sgpa)}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">{result.totalCredits}</div>
                    <div className="text-sm text-white/80 mt-1">Total Credits</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">{result.earnedCredits}</div>
                    <div className="text-sm text-white/80 mt-1">Credits Earned</div>
                </div>
            </div>

            {Object.keys(result.gradeDistribution).length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-semibold mb-3 text-center">Grade Distribution</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(result.gradeDistribution)
                            .sort(([a], [b]) => {
                                const order = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'E', 'F'];
                                return order.indexOf(a) - order.indexOf(b);
                            })
                            .map(([grade, count]) => (
                                <div
                                    key={grade}
                                    className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2"
                                >
                                    <span className={`text-lg font-bold ${getGradeColor(grade)}`}>
                                        {grade}
                                    </span>
                                    <span className="text-sm">×{count}</span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
