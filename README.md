# AI-Powered Calculator

A modern, intelligent calculator application combining traditional calculator functionality with AI-powered natural language processing. Based on PRD v1.0 targeting Q3 2026 launch.

## Features

### Core Features (P0)
- **Standard Calculator UI** - Full arithmetic operations (+, -, ×, ÷), percentages, parentheses support
- **Natural Language Input** - Ask math questions in plain English (future: LLM integration)
- **Step-by-Step Explanations** - Understand how calculations work with detailed breakdowns
- **Calculation History** - Keep track of recent calculations with persistent session memory
- **Unit Conversion** - Convert between length, weight, temperature, and currency

### Technology Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Math Engine**: math.js for reliable computation validation
- **Styling**: Tailwind CSS 4
- **Accessibility**: WCAG 2.1 AA compliant

## Project Structure

```
calc/
├── src/
│   ├── components/        # React components
│   │   └── Calculator.tsx # Main calculator component
│   ├── services/          # API integrations (future LLM API calls)
│   ├── utils/
│   │   ├── calculator.ts  # Math computation utilities
│   │   └── converter.ts   # Unit conversion logic
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Root component
│   └── main.tsx           # React DOM entry point
├── public/                # Static assets
├── dist/                  # Production build output
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn

### Installation

```bash
# Clone or navigate to the project
cd c:\Users\Rhea Sushanth\calc

# Install dependencies
npm install
```

### Development

```bash
# Start development server (running at http://localhost:5173/)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Development Guide

### Available Commands
- `npm run dev` - Start Vite dev server with hot module replacement
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

### Component Architecture

#### Calculator Component (`src/components/Calculator.tsx`)
Main calculator UI with:
- Display panel showing current input/result
- Numeric keypad (0-9)
- Operation buttons (+, -, ×, ÷, %)
- Clear, equals, and decimal buttons
- Calculation history panel
- History management (stores up to 50 recent calculations)

### Utility Functions

#### Calculator Utilities (`src/utils/calculator.ts`)
- `evaluateExpression()` - Safely evaluate math expressions
- `formatNumber()` - Format numbers with appropriate precision
- `parseNaturalLanguage()` - Placeholder for NL parsing (future LLM integration)
- `isValidExpression()` - Validate expression syntax
- `generateSteps()` - Generate step-by-step breakdown

#### Converter Utilities (`src/utils/converter.ts`)
- `convertUnits()` - Convert between different units
- `getUnitsForCategory()` - Get available units for a conversion category
- Support for: length, weight, temperature conversions

## Type System

Core TypeScript interfaces defined in `src/types/index.ts`:
- `CalculatorState` - Calculator state management
- `CalculationHistory` - History entry structure
- `LLMResponse` - Expected LLM API response format
- `ConversionResult` - Unit conversion result structure
- `UserSettings` - User preferences and settings

## Performance Targets

Based on PRD requirements:
- **Standard operations**: < 50ms response time
- **AI query response (P50)**: < 1.2 seconds
- **AI query response (P95)**: < 2.0 seconds
- **Initial load**: < 2.5 seconds on 4G
- **Uptime SLA**: 99.9% for calculator core

## Accessibility

- WCAG 2.1 AA compliant UI
- Minimum touch target size: 44x44px
- Keyboard navigation support
- Screen reader compatible with ARIA labels
- High-contrast mode support
- Focus visible indicators on all interactive elements

## Security & Privacy

- All API traffic: TLS 1.3 encryption (future)
- No sensitive data stored beyond session
- GDPR/CCPA compliance ready (future)
- AI query logs: 7-day automatic purge (future)

## Environmental Setup

### Tailwind CSS
The project uses Tailwind CSS v4 with the new PostCSS-based setup:
- Configuration: `tailwind.config.js`
- PostCSS config: `postcss.config.js`
- Base styles: `src/index.css`

### TypeScript Configuration
Strict mode enabled with:
- Type verbosity enforcement
- Unused variable warnings
- Type-only imports requirement

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome 88+

## Future Enhancements (P1+)

- Voice input for queries (STT integration)
- Graphing/visualization modes
- Conversational multi-turn sessions
- Formula suggestion as user types
- Result export (PDF, formatted copy)
- User authentication & history sync (v1.1)
- LLM integration for natural language processing (v1.1)

## Contributing

When adding new features:
1. Ensure TypeScript strict mode compliance
2. Add appropriate JSDoc comments
3. Follow established Tailwind CSS patterns
4. Update type definitions as needed
5. Test accessibility with keyboard navigation
6. Run `npm run lint` before committing

## Build Information

- **Build Tool**: Vite 8 with Rolldown
- **Bundle Information**: See `dist/` after building
- **Code Splitting**: Configured via Vite defaults
- **CSS Minification**: Handled by Vite

## Testing

**Coming Soon**: Testing setup with Vitest + React Testing Library
- Unit tests: `src/**/*.test.ts(x)`
- Integration tests: `src/**/*.integration.test.ts(x)`

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000  # Use alternative port
```

### TypeScript errors with type imports
Ensure you're using `type` keyword for type-only imports:
```typescript
import type { MyType } from './types'
```

### Tailwind CSS styles not rebuilding
Clear the `.vite` cache:
```bash
rm -r .vite
npm run dev
```

## Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [math.js API](https://mathjs.org/docs/index.html)

## License

[Add License Here]

---

**Last Updated**: April 8, 2026  
**Project Status**: In Development (v0.0.0)  
**Target Launch**: Q3 2026

      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
