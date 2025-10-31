# AI Agent Instructions for Family Budget System

## Project Overview
This is a family budget management system built with HTML/JavaScript frontend and Firebase backend. The system includes transaction management, user administration, AI-powered financial insights, and visual reporting.

## Core Architecture

### Frontend Structure
- Single-page architecture with dedicated HTML files for each major feature
- Entry points:
  - `index.html`: Main dashboard
  - `admin.html`: Administrative interface
  - `transactions.html`: Transaction management
  - `ai.html`: AI insights interface

### Backend Integration
- Firebase Functions for serverless backend (`functions/index.js`)
- Firestore collections:
  - `transactions`: Financial transactions with categories
- AI Integration via Mistral AI API for financial insights

## Development Workflow

### Setup
1. Firebase deployment required for functions:
```bash
firebase deploy --only functions
```
2. Environment variables needed:
- `MISTRAL_API_KEY`: For AI agent integration

### Patterns & Conventions

#### Transaction Data Structure
```javascript
{
  montant: number,    // Amount
  type: "depense" | "revenu",  // Transaction type
  categorie: string,  // Category
  createdAt: timestamp
}
```

#### AI Integration Pattern
- AI queries process last 50 transactions for context
- Transaction summaries include totals by category
- Responses should be clear, concise, and personalized

## Key Integration Points
1. Firebase Functions API endpoints in `functions/index.js`
2. Mistral AI agent integration (agent ID: ag_019a378268a9742f88a687d67427184c)
3. Frontend-backend communication via HTTP endpoints with CORS enabled

## UI/Design Guidelines
- Dark theme with glassmorphism effects
- Color scheme: Purple to cyan gradient
- Font: Manrope (Google Fonts)
- Chart.js/ApexCharts for data visualization

## Common Operations
- Transaction queries are ordered by `createdAt` descending
- Category-based aggregations are common for reporting
- AI insights should process transaction history context

Remember to maintain CORS headers for all Firebase Function endpoints:
```javascript
res.set('Access-Control-Allow-Origin', '*');
res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
```