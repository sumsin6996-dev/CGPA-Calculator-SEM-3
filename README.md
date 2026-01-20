# Mumbai University CGPA Calculator

A modern, interactive CGPA calculator for Mumbai University Third Semester Computer Engineering students.

## Features

- **Component-based Input**: Separate fields for External, Internal, TW, and OR marks
- **Auto-focus Navigation**: Automatically moves to next field when max digits are entered
- **Minimum Marks Validation**: Enforces Mumbai University minimum requirements
- **Real-time Calculation**: Instant SGPA calculation as you enter marks
- **Percentage-based Grading**: Strict grading system (O: ≥90%, A+: 80-89%, etc.)
- **Visual Feedback**: Color-coded grades and warning indicators
- **Dark Mode Support**: Automatic dark/light theme switching
- **Responsive Design**: Works on desktop, tablet, and mobile

## Subject Structure

### Theory Subjects (14 credits)
- Engineering Mathematics – III: External (60) + Internal (40) + TW (25) = 125 marks
- Discrete Structure and Graph Theory: External (60) + Internal (40) = 100 marks
- Analysis of Algorithms: External (60) + Internal (40) = 100 marks
- Computer Organization & Architecture: External (60) + Internal (40) = 100 marks
- Open Elective: External (60) + Internal (40) = 100 marks

### Practicals / TW (8 credits)
- AOA Lab: TW (25) + OR (25) = 50 marks
- COA Lab: TW (25) + OR (25) = 50 marks
- Full Stack Java Programming: TW (50) + OR (25) = 75 marks
- Entrepreneurship Development: TW (50) = 50 marks
- Environmental Science and Engineering: TW (50) = 50 marks

**Total Credits: 22**

## Minimum Marks Requirements

- Theory External: Minimum 24/60
- Theory Internal: Minimum 16/40
- Maths TW: Minimum 10/25
- AOA/COA Labs TW: Minimum 10/25
- AOA/COA Labs OR: Minimum 10/25
- FSJP TW: Minimum 20/50
- FSJP OR: Minimum 10/25
- ED/ESE TW: Minimum 20/50

## Grading Scale

| Grade | Percentage | Grade Points |
|-------|------------|--------------|
| O     | ≥ 90%      | 10           |
| A+    | 80-89%     | 9            |
| A     | 70-79%     | 8            |
| B+    | 60-69%     | 7            |
| B     | 55-59%     | 6            |
| C     | 50-54%     | 5            |
| F     | < 50%      | 0            |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mu-cgpa-calculator.git
cd mu-cgpa-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. Enter your marks for each subject component (External, Internal, TW, OR)
2. The system automatically validates minimum requirements
3. Grades are calculated based on percentage
4. SGPA is computed using credit-weighted formula
5. View your complete grade distribution and performance summary

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── Calculator.tsx      # Main calculator component
│   │   ├── SubjectInput.tsx    # Individual subject input
│   │   └── Results.tsx         # SGPA results display
│   ├── grading.ts              # Grading logic and calculations
│   ├── subjects.ts             # Subject definitions
│   ├── types.ts                # TypeScript interfaces
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

Built for Mumbai University students

## Acknowledgments

- Mumbai University for the grading system specifications
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
