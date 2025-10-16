# Fuzzle (React Native)

og Fuzzle implementation
[Flutter](https://github.com/jjola00/Fuzzle) 
## Why I pivoted to React Native

- Familiarity with TypeScript/JavaScript for faster iteration and fewer context switches
- Smoother Figma-to-UI workflow (tokens/variants map cleanly to RN styles)

## What’s different in this version

- Stack: Expo + React Native + TypeScript (optional Supabase when `.env` is provided)
- Focus: Mobile-first (iOS/Android). Web is for development only
- Navigation: Simple screen flow without heavy routing libraries
- Data: Local state by default; turn on persistence via Supabase env config
- Project structure: smaller, component-first layout for faster changes

```
src/
├── components/
├── contexts/
├── hooks/
├── pages/
├── types/
├── utils/
└── App.tsx
```

## Quick start

```bash
npm ci
# optional: cp .env.example .env   # enable Supabase-backed persistence
npm start
```