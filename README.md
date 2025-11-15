# Grand Anse Beach Palace Website

A production-ready, single-page hotel website for Grand Anse Beach Palace in Grenada, built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- **Responsive Design**: Beautiful, mobile-first design optimized for all devices
- **Dynamic Rooms System**: Data-driven room listings from Supabase database
- **Advanced Filtering**: Filter rooms by view type and guest capacity
- **Image Carousels**: Swipeable image galleries for each room
- **Contact Integration**: Netlify Forms with AJAX enhancement
- **Admin Panel**: Manage room visibility without code changes
- **Smooth Navigation**: Sticky header with smooth scrolling to sections
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: Keyboard navigation, ARIA labels, and focus indicators

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom brand colors
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Icons**: Lucide React
- **Forms**: Netlify Forms
- **Deployment**: Netlify (recommended)

## Brand Colors

- **Primary Orange**: `#EE5622` - CTAs and accents
- **Navy Blue**: `#1C1C55` - Headings and text
- **Sunshine Yellow**: `#FFCD72` - Secondary accents
- **White**: `#FFFFFF` - Backgrounds

## Project Structure

```
project/
├── src/
│   ├── assets/
│   │   └── Grand Anse Beach Palace.png    # Hero image
│   ├── components/
│   │   ├── Navigation.tsx                 # Sticky nav with smooth scroll
│   │   ├── Hero.tsx                       # Hero section
│   │   ├── About.tsx                      # About section
│   │   ├── Rooms.tsx                      # Data-driven rooms section
│   │   ├── Explore.tsx                    # Grenada attractions
│   │   ├── Rates.tsx                      # Seasonal pricing table
│   │   ├── Contact.tsx                    # Netlify Forms integration
│   │   └── Footer.tsx                     # Footer with links
│   ├── pages/
│   │   └── Admin.tsx                      # Admin panel for room management
│   ├── lib/
│   │   └── supabase.ts                    # Supabase client & types
│   ├── utils/
│   │   └── imageResolver.ts               # Image resolver utility
│   ├── App.tsx                            # Main app component
│   └── main.tsx                           # App entry point
├── public/
│   └── hotel/                             # Local images (see below)
├── supabase/
│   └── migrations/                        # Database migrations
├── .env                                   # Environment variables
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

The `.env` file is already configured with Supabase credentials:

```env
VITE_SUPABASE_URL=https://shxlifrpkmjbzbcacmpx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_ADMIN_PASS=admin123
```

**Optional**: Change `VITE_ADMIN_PASS` to secure the admin panel.

### 3. Database Setup

The database is already set up with:
- ✅ Rooms table created
- ✅ 9 active rooms seeded
- ✅ Row Level Security enabled
- ✅ Public read access for active rooms

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

### 5. Access Admin Panel

Visit `http://localhost:5173/admin` and login with the password from `VITE_ADMIN_PASS` (default: `admin123`).

## Adding Local Images

The site uses a fallback system: local images first, then Unsplash if not found.

### Recommended Directory Structure

Create these folders in the `public/` directory:

```
public/
├── hotel/
│   ├── rooms/
│   │   ├── 6/
│   │   │   └── 1.jpg
│   │   ├── 8/
│   │   │   └── 1.jpg
│   │   ├── 14/
│   │   │   └── 1.jpg
│   │   ├── 15/
│   │   │   └── 1.jpg
│   │   ├── 16/
│   │   │   └── 1.jpg
│   │   ├── 23/
│   │   │   └── 1.jpg
│   │   ├── 25/
│   │   │   └── 1.jpg
│   │   ├── 28/
│   │   │   └── 1.jpg
│   │   └── 30/
│   │       ├── 1.jpg
│   │       └── 2.jpg
│   └── explore/
│       └── (optional explore images)
```

### Adding Images to a Room

1. Create a folder in `public/hotel/rooms/` named after the room number
2. Add images as `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Update the room record in Supabase:

```sql
UPDATE rooms
SET photos = ARRAY['/hotel/rooms/6/1.jpg', '/hotel/rooms/6/2.jpg', '/hotel/rooms/6/3.jpg']
WHERE number = '6';
```

Or use the admin panel to update via SQL.

## Adding More Rooms

### Method 1: Using SQL (Recommended)

Execute this SQL in the Supabase SQL Editor:

```sql
INSERT INTO rooms (
  number,
  name,
  view,
  bedrooms,
  max_guests,
  features,
  has_kitchenette,
  is_apartment_capable,
  is_active,
  photos,
  base_rate_winter,
  base_rate_summer,
  slug
) VALUES (
  '31',                                      -- Room number
  'Deluxe Garden View',                      -- Room name
  'Garden',                                  -- View: 'Ocean' or 'Garden'
  1,                                         -- Number of bedrooms
  2,                                         -- Max guests
  ARRAY[                                     -- Features array
    'Air Conditioning',
    'Private Bathroom',
    'Garden View',
    'Wi-Fi',
    'Kitchenette'
  ],
  true,                                      -- Has kitchenette: true/false
  false,                                     -- Apartment capable: true/false
  true,                                      -- Active: true/false
  ARRAY['/hotel/rooms/31/1.jpg'],           -- Photo paths
  110,                                       -- Winter rate (USD)
  85,                                        -- Summer rate (USD)
  'room-31-deluxe-garden'                   -- URL slug (must be unique)
);
```

### Method 2: Example Records (Copy/Paste Template)

Here are 15 additional room examples you can customize:

```sql
-- Standard Ocean View Rooms (5 rooms)
INSERT INTO rooms (number, name, view, bedrooms, max_guests, features, has_kitchenette, is_apartment_capable, is_active, photos, base_rate_winter, base_rate_summer, slug) VALUES
('10', 'Standard Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi'], false, false, false, ARRAY['/hotel/rooms/10/1.jpg'], 120, 95, 'room-10-standard-ocean'),
('12', 'Standard Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi'], false, false, false, ARRAY['/hotel/rooms/12/1.jpg'], 120, 95, 'room-12-standard-ocean'),
('18', 'Standard Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Apartment Setup Available'], false, true, false, ARRAY['/hotel/rooms/18/1.jpg'], 125, 100, 'room-18-standard-ocean-apt'),
('20', 'Standard Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Apartment Setup Available'], false, true, false, ARRAY['/hotel/rooms/20/1.jpg'], 125, 100, 'room-20-standard-ocean-apt'),
('22', 'Standard Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi'], false, false, false, ARRAY['/hotel/rooms/22/1.jpg'], 120, 95, 'room-22-standard-ocean');

-- Deluxe Ocean View Rooms (5 rooms)
INSERT INTO rooms (number, name, view, bedrooms, max_guests, features, has_kitchenette, is_apartment_capable, is_active, photos, base_rate_winter, base_rate_summer, slug) VALUES
('24', 'Deluxe Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', 'Microwave'], true, false, false, ARRAY['/hotel/rooms/24/1.jpg'], 145, 115, 'room-24-deluxe-ocean'),
('26', 'Deluxe Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', 'Microwave'], true, false, false, ARRAY['/hotel/rooms/26/1.jpg'], 145, 115, 'room-26-deluxe-ocean'),
('27', 'Deluxe Ocean View', 'Ocean', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', 'Microwave'], true, false, false, ARRAY['/hotel/rooms/27/1.jpg'], 145, 115, 'room-27-deluxe-ocean'),
('32', 'Deluxe Ocean View', 'Ocean', 2, 4, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', 'Microwave', '2 Bedrooms'], true, false, false, ARRAY['/hotel/rooms/32/1.jpg'], 195, 155, 'room-32-deluxe-ocean-2bed'),
('34', 'Deluxe Ocean View', 'Ocean', 2, 4, ARRAY['Air Conditioning', 'Private Bathroom', 'Ocean View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', 'Microwave', '2 Bedrooms'], true, false, false, ARRAY['/hotel/rooms/34/1.jpg'], 195, 155, 'room-34-deluxe-ocean-2bed');

-- Garden View Rooms (5 rooms)
INSERT INTO rooms (number, name, view, bedrooms, max_guests, features, has_kitchenette, is_apartment_capable, is_active, photos, base_rate_winter, base_rate_summer, slug) VALUES
('29', 'Standard Garden View', 'Garden', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Garden View', 'Wi-Fi'], false, false, false, ARRAY['/hotel/rooms/29/1.jpg'], 100, 80, 'room-29-standard-garden'),
('31', 'Standard Garden View', 'Garden', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Garden View', 'Wi-Fi'], false, false, false, ARRAY['/hotel/rooms/31/1.jpg'], 100, 80, 'room-31-standard-garden'),
('33', 'Deluxe Garden View', 'Garden', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Garden View', 'Wi-Fi', 'Kitchenette', 'Refrigerator'], true, false, false, ARRAY['/hotel/rooms/33/1.jpg'], 125, 100, 'room-33-deluxe-garden'),
('35', 'Deluxe Garden View', 'Garden', 1, 2, ARRAY['Air Conditioning', 'Private Bathroom', 'Garden View', 'Wi-Fi', 'Kitchenette', 'Refrigerator'], true, false, false, ARRAY['/hotel/rooms/35/1.jpg'], 125, 100, 'room-35-deluxe-garden'),
('36', 'Deluxe Garden View', 'Garden', 2, 4, ARRAY['Air Conditioning', 'Private Bathroom', 'Garden View', 'Wi-Fi', 'Kitchenette', 'Refrigerator', '2 Bedrooms'], true, false, false, ARRAY['/hotel/rooms/36/1.jpg'], 175, 140, 'room-36-deluxe-garden-2bed');
```

**To activate any room**: Set `is_active = true` in SQL or use the admin panel.

### Important Notes

- When you set `is_active = true`, the room will automatically appear on the website
- No code changes needed - the UI is fully data-driven
- Each room must have a unique `slug`
- Room numbers should be unique
- Photos array should contain valid paths or fallback to Unsplash

## Netlify Forms Setup

### Step 1: Deploy to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-detect the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Step 2: Enable Form Notifications

After deployment:

1. Go to your Netlify site dashboard
2. Navigate to **Forms** in the left sidebar
3. Click on the **contact** form
4. Go to **Form notifications**
5. Click **Add notification**
6. Choose **Email notification**
7. Enter `grandansepalace@gmail.com`
8. Set trigger to **New form submission**
9. Save

Now you'll receive an email for every contact form submission!

### Testing Forms Locally

Forms won't work in local development (they require Netlify's infrastructure). To test:

1. Deploy to Netlify
2. Test on the live site
3. Or use Netlify CLI: `netlify dev`

## Admin Panel

The admin panel allows you to toggle room visibility without touching code.

### Access

Visit `/admin` and login with your password (default: `admin123`).

### Features

- View all rooms in a table
- See current active/inactive status
- Toggle room visibility with one click
- Changes take effect immediately on the public site

### Security

- Password-protected with session storage
- Change password via `VITE_ADMIN_PASS` in `.env`
- Only authenticated Supabase users can modify database (RLS enforced)

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Pre-deployment Checklist

- [ ] All room images uploaded to `public/hotel/rooms/`
- [ ] Room data in database is accurate
- [ ] Contact form tested on Netlify
- [ ] Admin panel password changed from default
- [ ] Environment variables configured in Netlify
- [ ] SEO meta tags reviewed in `index.html`

## Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Push to GitHub
   - Import project in Netlify

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   Add these in Netlify Dashboard → Site settings → Environment variables:
   ```
   VITE_SUPABASE_URL=https://shxlifrpkmjbzbcacmpx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   VITE_ADMIN_PASS=your-secure-password
   ```

4. **Deploy**
   - Click **Deploy site**
   - Your site will be live in minutes!

### Custom Domain

1. Go to **Domain settings** in Netlify
2. Add your custom domain
3. Follow DNS configuration instructions

## Maintenance

### Updating Room Rates

```sql
UPDATE rooms
SET base_rate_winter = 135, base_rate_summer = 110
WHERE number = '6';
```

### Adding Room Features

```sql
UPDATE rooms
SET features = array_append(features, 'Coffee Maker')
WHERE number = '6';
```

### Activating/Deactivating Rooms

**Via Admin Panel**: Easiest method - just click the toggle button

**Via SQL**:
```sql
UPDATE rooms SET is_active = true WHERE number = '10';
UPDATE rooms SET is_active = false WHERE number = '28';
```

## Troubleshooting

### Forms Not Submitting

- Ensure the hidden form is in `index.html`
- Check Netlify form detection in deploy logs
- Verify form names match exactly

### Images Not Loading

- Check file paths are correct
- Ensure images are in `public/hotel/` directory
- Verify file extensions match (`.jpg`, `.png`)
- Check browser console for 404 errors

### Admin Panel Not Working

- Verify `VITE_ADMIN_PASS` is set
- Clear browser session storage
- Check Supabase authentication

### Database Issues

- Verify environment variables are correct
- Check Supabase dashboard for connection issues
- Review RLS policies if data isn't loading

## Performance Optimization

The site is optimized for production with:

- ✅ Lazy loading images
- ✅ Optimized bundle size
- ✅ Tree-shaken dependencies
- ✅ Minified CSS and JS
- ✅ Preconnected fonts
- ✅ Responsive images

### Lighthouse Targets

- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 90

## Support

For questions or issues:
- Email: grandansepalace@gmail.com
- Phone: +1 (473) 444-4000

## License

Copyright © 2025 Grand Anse Beach Palace. All rights reserved.
