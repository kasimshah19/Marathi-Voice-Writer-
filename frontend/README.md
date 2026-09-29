# Marathi Voice Writer

A Marathi voice-to-text drafting tool for lawyers.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure
- `src/app`: Contains Next.js App Router pages and layouts.
- `src/components`: Reusable UI and layout components.
- `src/constants`: Application constants (routes).
- `src/lib`: Utility functions.
- `src/types`: TypeScript types.
- `public`: Static assets (PWA manifest).

## Route List
- `/` - Welcome/Splash screen
- `/new` - New document
- `/recording` - Recording in progress
- `/editor` - Edit document
- `/documents` - My documents list
- `/documents/[id]` - Document detail
- `/templates` - Templates
- `/settings` - Settings

*Note: Icons for PWA will be added later.*
