# Docusaurus site — Physical AI & Humanoid Robotics

This folder contains the Docusaurus site for the Physical AI textbook.

Quick start (requires Node.js >= 18 and npm or yarn):

```bash
cd docusaurus
npm ci
npm run start
```

- `npm run start` runs a local development server at `http://localhost:3000` by default.
- `npm run build` produces a static site in `build/` for deployment.
- `npm run deploy` can be used to deploy to GitHub Pages if configured.

Notes and recommended workflow:
- The `docs/` folder already contains module pages. Edit or add docs to expand the textbook.
- Translation/localization: `docusaurus.config.js` includes `ur` locale for Urdu. Use Docusaurus CLI to extract and manage translations.
- RAG chatbot and other interactive features are planned as client plugins; see `docusaurus/docusaurus.config.js` for plugin placeholders.

Environment configuration
- The project uses a single `.env` file for secrets and API keys. A sample file is provided at the repo root: `.env.example`.
- Copy `.env.example` to `.env` and fill in the values (do NOT commit your `.env`). The `.gitignore` already excludes `.env`.

If you want a minimal install without heavy ML tooling, keep heavy packages in `requirements-ml.txt` and install them only when needed.
