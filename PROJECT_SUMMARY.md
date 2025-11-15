# Grand Anse Beach Palace - Project Summary

## Project Overview
A modern hotel website for Grand Anse Beach Palace in Grenada, built with React, TypeScript, Vite, and Tailwind CSS. Features room listings, booking information, and integrated with Supabase for data management.

## Technology Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Database**: Supabase 2.57.4
- **Deployment**: Netlify

## Project Structure

```
project/
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── netlify.toml                  # Netlify deployment config
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript config (base)
├── tsconfig.app.json             # TypeScript config (app)
├── tsconfig.node.json            # TypeScript config (node)
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
│
├── public/                       # Static assets (copied to dist/)
│   ├── hero.jpg                  # Hero section image
│   └── hotel/rooms/              # Room photos organized by room number
│       ├── 6/                    # Room 6 photos (5 images)
│       ├── 8/                    # Room 8 photos (9 images)
│       ├── 14/                   # Room 14 photos (9 images)
│       ├── 15/                   # Room 15 photos (9 images)
│       ├── 16/                   # Room 16 photos (9 images)
│       ├── 23/                   # Room 23 photos (10 images)
│       ├── 25/                   # Room 25 photos (8 images)
│       ├── 28/                   # Room 28 photos (5 images)
│       └── 30/                   # Room 30 photos (5 images)
│
├── src/                          # Source code
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Main App component
│   ├── index.css                 # Global styles and Tailwind imports
│   ├── vite-env.d.ts            # Vite type definitions
│   │
│   ├── assets/                   # Bundled assets (processed by Vite)
│   │   ├── Grand Anse Beach Palace Hotel.png  # Logo (used in Navigation)
│   │   ├── Grand Anse Beach Palace.png        # Alternative logo
│   │   └── Room 6 *.jpg         # Room 6 photos (unused - duplicates in public/)
│   │
│   ├── components/               # React components
│   │   ├── Navigation.tsx        # Site navigation and header
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Rooms.tsx            # Rooms showcase
│   │   ├── Explore.tsx          # Local area information
│   │   ├── Rates.tsx            # Pricing information
│   │   ├── Contact.tsx          # Contact form
│   │   └── Footer.tsx           # Site footer
│   │
│   ├── pages/                    # Page components
│   │   └── Admin.tsx            # Admin page (unused/incomplete)
│   │
│   ├── lib/                      # Libraries and configurations
│   │   └── supabase.ts          # Supabase client configuration
│   │
│   └── utils/                    # Utility functions
│       └── imageResolver.ts     # Image path resolution utility
│
└── supabase/                     # Supabase database migrations
    └── migrations/
        ├── 20251110120434_create_rooms_table.sql
        └── 20251110192656_fix_security_issues.sql
```

## Dependencies

### Production Dependencies
```json
{
  "@supabase/supabase-js": "^2.57.4",    // Supabase client
  "lucide-react": "^0.344.0",            // Icon library
  "react": "^18.3.1",                    // React framework
  "react-dom": "^18.3.1"                 // React DOM rendering
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.9.1",
  "@types/react": "^18.3.5",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.11",
  "globals": "^15.9.0",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "typescript-eslint": "^8.3.0",
  "vite": "^5.4.2"
}
```

## Build Configuration

### package.json Scripts
```json
{
  "dev": "vite",                                    // Start dev server
  "build": "vite build",                            // Build for production
  "lint": "eslint .",                               // Run linter
  "preview": "vite preview",                        // Preview production build
  "typecheck": "tsc --noEmit -p tsconfig.app.json"  // Type checking
}
```

### Vite Configuration (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Environment Variables

The following environment variables are required for the application to function:

```env
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

**Note**: These values must be prefixed with `VITE_` to be accessible in the frontend application.

### Current Environment Configuration
- Supabase URL: `https://shxlifrpkmjbzbcacmpx.supabase.co`
- Supabase Anon Key: Set (not shown for security)

**IMPORTANT FOR NETLIFY**: You must add these environment variables in your Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add `VITE_SUPABASE_URL` with your Supabase project URL
3. Add `VITE_SUPABASE_ANON_KEY` with your Supabase anonymous key

## API Integrations and External Services

### Supabase
- **Purpose**: Backend database for room information
- **Configuration**: `src/lib/supabase.ts`
- **Tables**:
  - `rooms` - Stores room details (name, description, capacity, rate, image paths)
- **Migrations**: Located in `supabase/migrations/`
- **Row Level Security**: Enabled with read-only public access

### Database Schema

#### Rooms Table
```sql
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  capacity integer NOT NULL,
  rate numeric NOT NULL,
  image_paths text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## Key Features

1. **Responsive Navigation**: Fixed header with mobile menu
2. **Hero Section**: Full-screen image with call-to-action
3. **About Section**: Hotel information and amenities
4. **Rooms Showcase**: Grid display of available rooms with photos
5. **Explore Section**: Information about nearby attractions
6. **Rates Section**: Pricing and booking information
7. **Contact Form**: Guest inquiry form
8. **Footer**: Contact information and social links

## Image Management

### Two Image Storage Locations

1. **public/** folder:
   - Static assets copied directly to dist/
   - Room photos organized by room number
   - Total: 69 room photos across 9 rooms
   - Format: JPEG (4000x3000px, Samsung Galaxy S24)

2. **src/assets/** folder:
   - Assets processed by Vite (bundled with hash)
   - Hotel logo: `Grand Anse Beach Palace Hotel.png`
   - Some Room 6 photos (duplicates - not actively used)

### Image Resolution System
- Utility: `src/utils/imageResolver.ts`
- Purpose: Resolves image paths for room photos from public folder
- Pattern: `/hotel/rooms/{roomNumber}/{filename}`

## Build Process

1. **Development**:
   ```bash
   npm run dev
   ```
   Starts Vite dev server on http://localhost:5173

2. **Production Build**:
   ```bash
   npm run build
   ```
   - Compiles TypeScript
   - Bundles React components
   - Processes CSS with Tailwind and PostCSS
   - Optimizes assets
   - Outputs to `dist/` directory

3. **Build Output**:
   - `dist/index.html` - Entry HTML file
   - `dist/assets/` - Bundled JS/CSS with content hashes
   - `dist/hotel/` - Copy of public/hotel/ folder
   - `dist/hero.jpg` - Copy of public/hero.jpg

## Current Status

### ✅ Working
- Build process completes successfully
- All TypeScript compilation passes
- All dependencies installed correctly
- Supabase integration configured
- Netlify configuration file present
- Environment variables defined

### ⚠️ Known Issues

1. **Binary Image Files**:
   - Images in public/ folder may appear as dummy content
   - This is an environment limitation, not a code issue
   - Images are valid JPEG/PNG files (confirmed by file type checks)
   - Workaround: Binary files must be "loaded" before each build in this environment

2. **Outdated Browserslist**:
   - Warning: "caniuse-lite is outdated"
   - Non-critical build warning
   - Can be resolved with: `npx update-browserslist-db@latest`

3. **Unused Assets**:
   - `src/assets/Room 6 *.jpg` files are duplicates of public/ versions
   - Not referenced in code - can be safely removed

4. **Admin Page**:
   - `src/pages/Admin.tsx` exists but not integrated into routing
   - May need completion or removal

## Deployment Instructions

### For Netlify:

1. **Connect Repository**: Link your Git repository to Netlify

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (set in netlify.toml)

3. **Add Environment Variables** in Netlify dashboard:
   ```
   VITE_SUPABASE_URL=https://shxlifrpkmjbzbcacmpx.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-key-here>
   ```

4. **Deploy**: Trigger manual deploy or push to connected branch

### Build Verification
Run these commands before deploying:
```bash
npm install           # Install dependencies
npm run typecheck     # Check TypeScript
npm run lint          # Run linter
npm run build         # Build for production
```

All should complete without errors.

## Performance Considerations

- Large image files (4000x3000px) may impact load times
- Consider implementing:
  - Image optimization/compression
  - Lazy loading for room images
  - Responsive images with srcset
  - CDN for static assets

## Browser Compatibility

- Modern browsers (ES6+ support)
- Mobile responsive design
- Tested viewport sizes: 320px - 1920px

## Version Information

- Project Version: 0.0.0
- Node Version Required: 18
- Package Manager: npm (lockfile present)

## Notes for Debugging

- Build output is deterministic and reproducible
- No build errors in current configuration
- TypeScript strict mode not enabled
- ESLint configured with React-specific rules
- All imports and file paths verified as correct
