# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your configuration.

3. **Initialize Database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables

Required:
- `DATABASE_URL` - SQLite database path (default: `file:./dev.db`)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key (optional, for map functionality)
- `NEXT_PUBLIC_SITE_URL` - Your site URL (for production)
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Admin dashboard password (change in production!)

Optional:
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

## Database Setup

The project uses Prisma with SQLite. To reset the database:

```bash
# Delete the database file
rm prisma/dev.db

# Recreate and seed
npm run db:push
npm run db:seed
```

## Adding Menu Items

You can add menu items in two ways:

1. **Via Prisma Studio** (recommended for development):
   ```bash
   npx prisma studio
   ```

2. **Via Seed File**: Edit `lib/seed.ts` and run:
   ```bash
   npm run db:seed
   ```

3. **Via Admin Dashboard**: Login at `/admin` (password: `admin123` by default)

## Image Placeholders

The project expects images in `/public/images/`. Create placeholder images or replace with actual photos:

- `hero.jpg` - Home page hero image
- `about-hero.jpg` - About page hero
- `bruschetta.jpg`, `caprese.jpg`, `carbonara.jpg`, etc. - Menu item images
- `gallery-*.jpg` - Gallery images
- `blog-*.jpg` - Blog post images
- `chef-*.jpg` - Team member photos

## Google Maps Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create an API key
5. Add the key to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The project works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## Troubleshooting

### Database Errors

If you see Prisma errors:
```bash
npm run db:generate
npm run db:push
```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

### Image Errors

Make sure images exist in `/public/images/` or update image paths in the code.

## Next Steps

1. Replace placeholder images with actual photos
2. Update contact information throughout the site
3. Customize colors in `app/globals.css`
4. Set up email service for forms (SendGrid, Resend, etc.)
5. Configure payment processing for orders
6. Set up analytics
7. Test all functionality
8. Deploy!

