# Bella Vita - Restaurant Website

A complete, production-ready restaurant website built with Next.js 15, featuring modern design, dark mode support, and comprehensive functionality for an upscale Italian restaurant.

## Features

- 🎨 **Modern Design**: Elegant UI with dark mode support, glassmorphism effects, and smooth animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Optimized for Lighthouse 100/100 score
- 🔍 **SEO Optimized**: Complete SEO setup with sitemap, robots.txt, and structured data
- ♿ **Accessible**: WCAG 2.2 AA compliant
- 🌐 **PWA Ready**: Installable Progressive Web App
- 🍕 **Complete Pages**: Menu, Reservations, Gallery, Blog, Reviews, Online Ordering, and more
- 🔐 **Admin Dashboard**: Protected admin area for managing content
- 🍪 **Cookie Consent**: GDPR-compliant cookie banner
- 🗺️ **Google Maps**: Interactive location map
- 📧 **Forms**: Contact, reservations, and reviews with validation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **UI Components**: shadcn/ui
- **Database**: Prisma + SQLite
- **Maps**: Google Maps API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Google Maps API key (optional, for map functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd food
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `NEXT_PUBLIC_SITE_URL`: Your site URL (for production)
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Admin dashboard password

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   ├── [pages]/           # All other pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── [components]      # Custom components
├── lib/                  # Utilities and database
├── prisma/               # Prisma schema
└── public/               # Static assets
```

## Available Pages

- `/` - Home page with hero, featured dishes, testimonials
- `/menu` - Full menu with categories and filters
- `/about` - Restaurant story, team, values
- `/reservations` - Reservation form
- `/gallery` - Photo gallery with lightbox
- `/blog` - Blog posts listing
- `/blog/[slug]` - Individual blog post
- `/reviews` - Customer reviews
- `/contact` - Contact form and map
- `/order` - Online ordering with cart
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/admin` - Admin dashboard (protected)

## API Routes

- `GET /api/menu` - Get all menu items
- `POST /api/reservations` - Create reservation
- `POST /api/contact` - Send contact message
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review
- `GET /api/blog` - Get blog posts
- `POST /api/orders` - Place order
- `POST /api/newsletter` - Subscribe to newsletter

## Database Schema

The project uses Prisma with SQLite. Models include:
- `MenuItem` - Menu items with categories, allergens, dietary info
- `Reservation` - Table reservations
- `BlogPost` - Blog articles
- `Review` - Customer reviews
- `Order` - Online orders
- `Newsletter` - Newsletter subscriptions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The project is optimized for Vercel deployment.

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts (Inter, Playfair Display)
- Minimal bundle size
- Efficient database queries

## SEO Features

- Dynamic sitemap generation
- robots.txt configuration
- Open Graph and Twitter cards
- Structured data (Schema.org)
- Semantic HTML
- Meta tags optimization

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG 2.2 AA)
- Screen reader friendly

## Customization

### Colors

Edit `app/globals.css` to customize the color scheme.

### Content

- Menu items: Use Prisma to add/edit items or use the admin dashboard
- Blog posts: Add via Prisma or admin dashboard
- Images: Replace placeholder images in `/public/images/`

### Fonts

Fonts are configured in `app/layout.tsx`. You can change them in the font imports.

## Production Checklist

Before deploying to production:

- [ ] Update environment variables
- [ ] Change admin password
- [ ] Replace placeholder images
- [ ] Update contact information
- [ ] Customize privacy policy and terms
- [ ] Set up email service (SendGrid, Resend, etc.)
- [ ] Configure payment processing (Stripe, etc.)
- [ ] Set up analytics
- [ ] Test all forms and functionality
- [ ] Run Lighthouse audit
- [ ] Test on multiple devices and browsers

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for Bella Vita Restaurant
