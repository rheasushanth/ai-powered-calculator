# AI-Powered Calculator

[![GitHub](https://img.shields.io/badge/GitHub-rheasushanth%2Fai--powered--calculator-blue)](https://github.com/rheasushanth/ai-powered-calculator)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow)]()
[![Launch Target](https://img.shields.io/badge/Target%20Launch-Q3%202026-green)]()

A full-stack intelligent calculator combining traditional calculator UI with AI-powered natural language processing and a production-grade Express backend. Designed to serve students, professionals, and power users who need more than just numbers—they need understanding.

## 🎯 Features

### Core Features (P0)
- ✅ **Standard Calculator** - Full arithmetic (+, -, ×, ÷), percentages, parentheses
- ✅ **Natural Language Queries** - "What is 15% of 200?" or "If I invest $1000 at 7% annually..."
- ✅ **Step-by-Step Explanations** - Understand exactly how calculations work
- ✅ **Unit Conversion** - Length, weight, temperature conversions
- ✅ **Rich API** - Production-ready Express backend with rate limiting
- ✅ **LLM Integration** - Claude (Anthropic) or OpenAI support
- ✅ **WCAG 2.1 AA** - Fully accessible interface

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Vite + Tailwind CSS |
| **Backend** | Express + TypeScript + Node.js |
| **Math Engine** | math.js (safe expression evaluation) |
| **AI** | Claude API (Anthropic) or OpenAI |
| **Build** | Vite (frontend), TypeScript (backend) |

## 📁 Project Structure

```
ai-powered-calculator/
├── README.md                          # This file
├── .github/
│   └── copilot-instructions.md       # AI copilot guidelines
│
├── 📂 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calculator.tsx        # Main calculator UI
│   │   │   └── ...
│   │   ├── services/                 # API client services
│   │   ├── utils/
│   │   │   ├── calculator.ts         # Math utilities
│   │   │   └── converter.ts          # Unit conversion
│   │   ├── types/index.ts            # TypeScript types
│   │   ├── App.tsx                   # Root component
│   │   └── main.tsx                  # Entry point
│   ├── public/                       # Static assets
│   ├── dist/                         # Production build
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md                     # Frontend docs
│
├── 📂 Backend (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/              # Request handlers
│   │   │   ├── calculationController.ts
│   │   │   ├── conversionController.ts
│   │   │   └── healthController.ts
│   │   ├── services/                 # Business logic
│   │   │   ├── calculationService.ts
│   │   │   ├── conversionService.ts
│   │   │   └── llmService.ts
│   │   ├── routes/                   # API routes
│   │   ├── middleware/               # Express middleware
│   │   ├── utils/                    # Utilities
│   │   ├── types/                    # TypeScript types
│   │   ├── config.ts                 # Configuration
│   │   └── index.ts                  # Express app entry
│   ├── dist/                         # Compiled output
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example                  # Configuration template
│   ├── .gitignore
│   ├── README.md                     # API documentation
│   └── QUICKSTART.md                 # Quick start guide
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm** 9+
- **(Optional)** Claude API key or OpenAI API key for LLM features

### Installation & Development

**1. Clone the repository:**
```bash
git clone https://github.com/rheasushanth/ai-powered-calculator.git
cd ai-powered-calculator
```

**2. Frontend setup (Terminal 1):**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs on http://localhost:5173
```

**3. Backend setup (Terminal 2):**
```bash
cd backend

# Install dependencies
npm install

# Configure environment (optional for LLM)
cp .env.example .env
# Edit .env and add LLM_API_KEY if desired

# Start development server
npm run dev
# Runs on http://localhost:5000
```

**4. Access the application:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Calculation Endpoints

**POST /calculate** - Auto-detect query type
```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "expression": "2+2*3",
    "naturalLanguageQuery": "What is 15% of 200?",
    "includeSteps": true
  }'
```

**POST /calculate/standard** - Math expressions only
```bash
curl -X POST http://localhost:5000/api/calculate/standard \
  -H "Content-Type: application/json" \
  -d '{"expression": "sqrt(16) + 5", "includeSteps": true}'
```

**POST /calculate/natural-language** - Natural language queries (requires LLM)
```bash
curl -X POST http://localhost:5000/api/calculate/natural-language \
  -H "Content-Type: application/json" \
  -d '{"query": "If I invest $1000 at 7% annually for 10 years, what do I get?"}'
```

### Conversion Endpoints

**POST /convert** - Convert units
```bash
curl -X POST http://localhost:5000/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "value": 5,
    "fromUnit": "miles",
    "toUnit": "kilometers",
    "category": "length"
  }'
```

**GET /convert/categories** - Get all conversion categories
```bash
curl http://localhost:5000/api/convert/categories
```

**GET /convert/units/:category** - Get available units for a category
```bash
curl http://localhost:5000/api/convert/units/length
```

### Health Endpoints

**GET /health** - Service health status
```bash
curl http://localhost:5000/api/health
```

**GET /info** - API information
```bash
curl http://localhost:5000/api/info
```

## 📝 Available Commands

### Frontend
```bash
npm run dev       # Start development server (Vite with HMR)
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Backend
```bash
npm run dev       # Start development server (auto-reload)
npm run build     # Compile TypeScript
npm start         # Run production build
npm run lint      # Run ESLint
npm test          # Run tests (coming soon)
```

## ⚙️ Configuration

### Frontend
- **Vite Config**: `vite.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind CSS**: `tailwind.config.js`
- **ESLint**: `eslint.config.js`

### Backend
- **Environment Variables**: `backend/.env` (copy from `.env.example`)
- **Configuration**: `backend/src/config.ts`

**Important Backend Environment Variables:**
```bash
PORT=5000                              # Server port
NODE_ENV=development                   # Environment
CORS_ORIGIN=http://localhost:5173     # Frontend origin

# LLM Configuration (optional)
LLM_PROVIDER=claude                   # 'claude' or 'openai'
LLM_API_KEY=your_api_key_here        # API key
LLM_MODEL=claude-3.5-sonnet-20241022  # Model version

# Rate Limiting
RATE_LIMIT_MAX=100                    # Requests per 15 min
AI_RATE_LIMIT_MAX=200                # AI requests per 15 min
```

## 🤖 Enabling LLM Features

To enable natural language processing with AI:

1. **Get an API key:**
   - Claude (Anthropic): https://console.anthropic.com/
   - OpenAI: https://platform.openai.com/api-keys

2. **Configure the backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your API key
   ```

3. **Restart the backend server:**
   ```bash
   npm run dev
   ```

## 📊 Supported Units

### Length
mm, cm, m, km, inch, ft, yard, mile

### Weight
mg, g, kg, oz, lb, ton

### Temperature
celsius, fahrenheit, kelvin

### Currency
*Coming in v1.1 with live exchange rates*

## 🎨 Frontend Architecture

### Component Structure
- **Calculator** - Main UI component with state management
- **Display** - Shows calculation results
- **Keypad** - Numeric input buttons
- **History** - Tracks recent calculations

### State Management
- React Context API (for phase 1)
- Redux (planned for phase 2 if needed)

### Styling
- Tailwind CSS v4
- Responsive design
- Dark mode support (planned)

## 🔧 Backend Architecture

### Layered Design
```
Routes (HTTP Endpoints)
  ↓
Controllers (Request Handlers)
  ↓
Services (Business Logic)
  ↓
Models/Utils (Data & Utilities)
```

### Middleware
- Request ID tracking
- CORS support
- Rate limiting
- Error handling
- Logging

### Error Handling
All errors return consistent JSON responses:
```json
{
  "error": "Error Type",
  "message": "Descriptive message",
  "statusCode": 400,
  "timestamp": "2026-04-08T...",
  "requestId": "550e8400-..."
}
```

## 📈 Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| **Standard Calc** | < 50ms | Client-side only |
| **AI Query (P50)** | < 1.2s | LLM response time |
| **AI Query (P95)** | < 2.0s | 95th percentile |
| **Initial Load** | < 2.5s | On 4G connection |
| **API Uptime** | 99.9% | SLA target |

## ♿ Accessibility

✅ **WCAG 2.1 Level AA** compliance  
✅ Keyboard navigation throughout  
✅ Screen reader support with ARIA labels  
✅ High contrast mode compatible  
✅ Minimum touch target size: 44x44px  
✅ Focus visible indicators  

## 🔒 Security

- TLS 1.3 encrypted connections
- No sensitive data stored beyond session
- Input validation on all endpoints
- Express rate limiting middleware
- GDPR/CCPA compliance ready
- Request tracking for debugging

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| iOS Safari | 12+ |
| Chrome Mobile | 88+ |

## 📚 Documentation

- **[Frontend README](./README.md)** - React & Vite documentation
- **[Backend README](./backend/README.md)** - API & Express documentation
- **[Backend Quick Start](./backend/QUICKSTART.md)** - Backend setup guide
- **[Product Requirements](./docs/PRD.md)** - Original PRD (v1.0)

## 🚀 Deployment

### Frontend Deployment
Suitable for: Vercel, Netlify, Cloudflare Pages, AWS Amplify
```bash
npm run build
# Deploy the 'dist' folder to your hosting
```

### Backend Deployment
Suitable for: Railway, Render, Heroku, AWS Lambda, DigitalOcean
```bash
npm run build
npm start
# Set environment variables in production
```

## 🔮 Future Enhancements (v1.1+)

### Short Term
- [ ] Database integration for persistent history
- [ ] User authentication (OAuth 2.0)
- [ ] Advanced caching strategies
- [ ] Currency conversion with live rates
- [ ] Better error recovery

### Medium Term
- [ ] Voice input (STT)
- [ ] Graphing/visualization
- [ ] Export results (PDF, images)
- [ ] Custom formula library
- [ ] Multi-language support

### Long Term
- [ ] Mobile apps (React Native)
- [ ] Symbolic algebra solver
- [ ] Calculus functions
- [ ] Collaborative sessions
- [ ] Third-party API integrations

## 🤝 Contributing

We welcome contributions! When adding features:

**Code Quality:**
- Follow TypeScript strict mode
- Add JSDoc comments
- Include error handling
- Write tests where applicable

**Frontend:**
- Use existing component patterns
- Maintain Tailwind CSS conventions
- Test keyboard & screen reader accessibility

**Backend:**
- Follow REST conventions
- Validate all inputs
- Document API changes
- Update tests

**General:**
- Create feature branches
- Write descriptive commit messages
- Include tests for new features
- Update relevant documentation

## 📝 License

[License information coming soon]

## 👤 Author

**Rhea Sushanth**  
GitHub: [@rheasushanth](https://github.com/rheasushanth)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rheasushanth/ai-powered-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rheasushanth/ai-powered-calculator/discussions)
- **Email**: [Add email if desired]

## 📋 Changelog

### v0.0.0 - April 8, 2026 (Initial Release)
- ✅ Full-stack project structure
- ✅ Frontend calculator with UI
- ✅ Backend API with routing
- ✅ LLM integration scaffolding
- ✅ Unit conversion service
- ✅ Rate limiting middleware
- ✅ CORS support
- ✅ TypeScript throughout
- ✅ Comprehensive documentation

---

**Status**: In Development  
**Target Launch**: Q3 2026  
**Updated**: April 8, 2026

Leveraging AI to make math accessible and engaging for everyone. 🧮✨
