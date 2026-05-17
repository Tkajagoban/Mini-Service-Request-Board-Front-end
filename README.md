# Mini Service Request Board Frontend

This is the Next.js frontend for the Mini Service Request Board assessment.

## Features
- Home listing of job requests
- Category filter
- New job request form with client-side validation
- Job detail page with status update and delete actions
- Uses an external Express API via `NEXT_PUBLIC_API_URL`

## Tech stack
- Next.js App Router
- TypeScript
- Atomic component structure
- CSS-based styling

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables:
   Create a `.env.local` file in the project root with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Notes
- The frontend expects a separate Express backend on `NEXT_PUBLIC_API_URL`.
- The backend should expose the REST endpoints under `/api/jobs`.
