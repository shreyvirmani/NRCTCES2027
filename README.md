# NCRTCES 2027 Conference Website Demo

A responsive, frontend-only demonstration for the 3rd National Conference on Recent Trends in Climate Change, Energy and Sustainability (NCRTCES-2027), hosted by Maharaja Surajmal Institute Of Technology. Conference dates are March 16th – 17th 2027. The submission and registration deadlines are placeholders pending confirmation.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL. The faculty dashboard demonstration is at `/admin-demo`.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Content configuration

Edit `src/data/conferenceConfig.js` to update conference details, the countdown target, important dates, venue, theme, tracks, committee, contact information, submission URL and fictional dashboard sample records. The supplied MSIT and NCRTCES logos and hero backgrounds are in `public/assets`. The public interest form validates locally for demonstration and does not send or persist its values. Do not add real personal information to the sample dataset.

## Vercel deployment

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected Vite settings (`npm run build`, output directory `dist`). No environment variables are required.
4. Deploy. `vercel.json` rewrites application routes to the SPA entry so `/admin-demo` works on refresh.

No deployment has been performed by this demo project.
