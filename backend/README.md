# AI-Powered Calculator Backend

Production-ready Node.js/Express backend API for the AI-Powered Calculator application. Handles mathematical computations, natural language processing via LLM, and unit conversions.

## Features

- ✅ **Standard Calculator API** - Evaluate mathematical expressions safely
- ✅ **Natural Language Processing** - Process math queries using LLM (Claude/OpenAI)
- ✅ **Unit Conversion** - Convert between length, weight, and temperature units
- ✅ **LLM Integration** - Seamless integration with Claude (Anthropic) or OpenAI
- ✅ **Rate Limiting** - Built-in request rate limiting with separate AI tier
- ✅ **Error Handling** - Comprehensive error responses with request tracking
- ✅ **CORS Support** - Configured for security and cross-origin requests
- ✅ **TypeScript** - Fully typed for reliability and DX
- ✅ **Health Checks** - Service status monitoring endpoints

## Project Structure

```
calc-backend/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── calculationController.ts
│   │   ├── conversionController.ts
│   │   └── healthController.ts
│   ├── services/           # Business logic
│   │   ├── calculationService.ts
│   │   ├── conversionService.ts
│   │   └── llmService.ts
│   ├── routes/             # API routes
│   │   ├── calculationRoutes.ts
│   │   ├── conversionRoutes.ts
│   │   └── healthRoutes.ts
│   ├── middleware/         # Express middleware
│   │   └── index.ts
│   ├── utils/
│   │   ├── calculator.ts   # Math utilities
│   │   └── errors.ts       # Error handling
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── config.ts           # Configuration
│   └── index.ts            # Express app entry
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- LLM API Key (Claude or OpenAI) - optional for testing standard calculator

### Installation

```bash
cd calc-backend
npm install
```

### Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
```bash
# Required
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Optional - for LLM features
LLM_PROVIDER=claude  # or 'openai'
LLM_API_KEY=your_api_key_here
```

### Development

```bash
# Start development server with hot reload
npm run dev

# The server will be available at http://localhost:5000
```

### Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Calculation Endpoints

#### POST /api/calculate
Auto-detect and process either standard or natural language queries.

**Request:**
```json
{
  "expression": "2+2*3",
  "naturalLanguageQuery": "What is 15% of 200?",
  "includeSteps": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "result": "50",
    "expression": "15% of 200",
    "steps": ["200 * 0.15 = 30"],
    "timestamp": "2026-04-08T...",
    "executionTime": 145
  }
}
```

#### POST /api/calculate/standard
Process only mathematical expressions (no LLM required).

**Request:**
```json
{
  "expression": "sqrt(16) + 5",
  "includeSteps": false
}
```

#### POST /api/calculate/natural-language
Process natural language math queries using LLM.

**Request:**
```json
{
  "query": "If I invest $1000 at 7% annually for 10 years, what do I get?",
  "includeSteps": true
}
```

### Conversion Endpoints

#### POST /api/convert
Convert between units.

**Request:**
```json
{
  "value": 5,
  "fromUnit": "miles",
  "toUnit": "kilometers",
  "category": "length"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fromValue": 5,
    "fromUnit": "miles",
    "toValue": 8.04672,
    "toUnit": "kilometers",
    "category": "length",
    "timestamp": "2026-04-08T..."
  }
}
```

#### GET /api/convert/categories
Get all supported conversion categories.

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "length",
        "description": "Convert between length units..."
      },
      // ... more categories
    ],
    "total": 4
  }
}
```

#### GET /api/convert/units/:category
Get available units for a specific category.

**Example:** `GET /api/convert/units/length`

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "length",
    "units": ["mm", "cm", "m", "km", "inch", "ft", "yard", "mile"],
    "count": 8
  }
}
```

### Health Endpoints

#### GET /api/health
Check service health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-04-08T...",
    "services": {
      "api": "ok",
      "llm": "ok",
      "currency": "unconfigured"
    }
  }
}
```

#### GET /api/info
Get API information and available endpoints.

## Configuration Options

### Environment Variables

```bash
# Server
PORT=5000                          # Server port
NODE_ENV=development               # Environment
CORS_ORIGIN=http://localhost:5173  # CORS origin

# LLM
LLM_PROVIDER=claude               # 'claude' or 'openai'
LLM_API_KEY=your_key              # API key for LLM provider
LLM_MODEL=claude-3.5-sonnet-20241022  # Model version
LLM_TIMEOUT=10000                 # Request timeout (ms)

# Currency
CURRENCY_API_ENDPOINT=...          # Exchange rate API
CURRENCY_CACHE_DURATION=3600       # Cache duration (seconds)

# Rate Limiting
RATE_LIMIT_WINDOW=900000          # Rate limit window (15 min)
RATE_LIMIT_MAX=100                # Max requests per window
AI_RATE_LIMIT_MAX=200             # Max AI requests (free tier)

# Logging
LOG_LEVEL=info                    # Log level
```

## Supported Units

### Length
- Millimeters (mm)
- Centimeters (cm)
- Meters (m)
- Kilometers (km)
- Inches (inch)
- Feet (ft)
- Yards (yard)
- Miles (mile)

### Weight
- Milligrams (mg)
- Grams (g)
- Kilograms (kg)
- Ounces (oz)
- Pounds (lb)
- Tons (ton)

### Temperature
- Celsius (celsius)
- Fahrenheit (fahrenheit)
- Kelvin (kelvin)

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Calculation Error",
  "message": "Invalid expression: abc123",
  "statusCode": 400,
  "timestamp": "2026-04-08T...",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Status Codes
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error
- `503` - Service Unavailable

## Rate Limiting

### Standard Tier (Free)
- **General API**: 100 requests per 15 minutes
- **AI Features**: 200 requests per 15 minutes
- **Response Header**: `RateLimit-Remaining`, `RateLimit-Reset`

### Future: Premium Tier (v1.1+)
- Unlimited requests
- Priority processing
- Custom model selection

## Performance

### Target Metrics (from PRD)
- **Standard calculations**: < 50ms
- **AI query (P50)**: < 1.2 seconds
- **AI query (P95)**: < 2.0 seconds
- **API response time**: < 200ms average

### Optimizations
- Request validation caching
- Expression pre-compilation
- LLM response caching (future)
- Database query optimization (future)

## Security

- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ Expression sandboxing (math.js)
- ✅ Error message sanitization
- ✅ Request ID tracking
- ✅ TLS 1.3 ready (configure in production)

## Future Enhancements (v1.1+)

- [ ] User authentication (OAuth 2.0)
- [ ] Calculation history persistence
- [ ] User preferences/settings
- [ ] Currency conversion with live rates
- [ ] Websocket support for real-time results
- [ ] Request caching layer
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Advanced analytics
- [ ] Custom formula library
- [ ] Symbolic algebra solver
- [ ] Graphing/visualization endpoints

## Testing

```bash
# Run tests
npm test

# Coming soon:
# - Unit tests (Vitest)
# - Integration tests
# - API endpoint tests
# - Load testing
```

## Documentation

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Claude API Documentation](https://docs.anthropic.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [math.js Documentation](https://mathjs.org/docs/)

## Contributing

When contributing to the backend:

1. Ensure TypeScript strict mode compliance
2. Add JSDoc comments to functions
3. Include error handling
4. Update types as needed
5. Test edge cases
6. Follow existing code patterns

## Troubleshooting

### LLM API Errors
```bash
# Check if API key is set correctly
echo $LLM_API_KEY

# Verify API key format and permissions
# Check rate limits and quotas in your LLM provider dashboard
```

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process:
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000
```

### CORS Errors
Verify `CORS_ORIGIN` matches your frontend URL exactly (including protocol and port).

## Support

For issues and questions, refer to:
- [GitHub Issues](https://github.com/rheasushanth/ai-powered-calculator)
- Project Documentation
- Copilot Instructions (`.github/copilot-instructions.md`)

## License

[Add License Here]

---

**Last Updated**: April 8, 2026  
**Status**: In Development (v0.0.0)  
**Target Launch**: Q3 2026
