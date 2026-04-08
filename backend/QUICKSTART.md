# Backend Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
cd c:\Users\Rhea Sushanth\calc-backend
npm install
```

### 2. Configure Environment Variables
The `.env` file is already created with default values. To enable LLM features:

```bash
# Edit .env and add your API key:
LLM_PROVIDER=claude  # or 'openai'
LLM_API_KEY=your_anthropic_or_openai_api_key_here
```

**Get your API key:**
- **Claude (Anthropic)**: https://console.anthropic.com/
- **OpenAI**: https://platform.openai.com/api-keys

### 3. Run Development Server
```bash
npm run dev
```

Server will start at `http://localhost:5000`

### 4. Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Standard Calculation
```bash
curl -X POST http://localhost:5000/api/calculate/standard \
  -H "Content-Type: application/json" \
  -d '{"expression": "2+2*3", "includeSteps": true}'
```

### Natural Language Query (requires LLM configured)
```bash
curl -X POST http://localhost:5000/api/calculate/natural-language \
  -H "Content-Type: application/json" \
  -d '{"query": "What is 15% of 200?", "includeSteps": true}'
```

### Unit Conversion
```bash
curl -X POST http://localhost:5000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"value": 5, "fromUnit": "miles", "toUnit": "kilometers", "category": "length"}'
```

## Project Structure

```
calc-backend/
├── src/
│   ├── controllers/    # Route handlers
│   ├── services/       # Business logic
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utilities
│   ├── types/          # TypeScript types
│   ├── config.ts       # Configuration
│   └── index.ts        # Express app entry
├── dist/               # Compiled output
├── .env                # Environment variables
├── README.md           # Full documentation
└── package.json        # Dependencies
```

## Server Architecture

**Express Server**
- Request validation
- Rate limiting
- Error handling
- CORS support

**Services Layer**
- Calculation Service (standard & natural language)
- Conversion Service (unit conversion)
- LLM Service (Claude/OpenAI integration)

**Controller Layer**
- Calculation endpoints
- Conversion endpoints
- Health check endpoints

## Key Features

✅ **Math Computation** - Safe expression evaluation using math.js  
✅ **Natural Language** - AI-powered query processing (Claude/OpenAI)  
✅ **Unit Conversion** - Length, weight, temperature conversions  
✅ **Rate Limiting** - 100 req/15min standard, 200 req/15min AI  
✅ **Error Handling** - Comprehensive error responses  
✅ **Type Safety** - Full TypeScript support  
✅ **Production Ready** - Configured for deployment  

## Common Tasks

### Enable LLM
1. Get API key from Anthropic or OpenAI
2. Add to `.env`: `LLM_API_KEY=your_key`
3. Restart server

### Change Port
```bash
PORT=3001 npm run dev
```

### Debug Mode
```bash
LOG_LEVEL=debug npm run dev
```

### Check Health
```bash
curl http://localhost:5000/api/health
```

## Next Steps

1. **Frontend Integration** - Connect frontend to backend endpoints
2. **Deploy** - Push to GitHub and deploy to cloud (Heroku, Vercel, Railway, etc.)
3. **Database** - Add MongoDB/PostgreSQL for history persistence (v1.1)
4. **Authentication** - Implement OAuth 2.0 (v1.1)
5. **Currency API** - Add live exchange rates (v1.1)

## Troubleshooting

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**LLM Not Working**
- Verify API key is set in `.env`
- Check quota/billing in API provider dashboard
- Verify network connectivity

**Build Errors**
```bash
npm install
npm run build
```

## Support

- Full documentation: [README.md](./README.md)
- API Examples: See curl commands above
- Environment: [.env.example](.env.example)
