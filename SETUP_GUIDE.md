# Lighthouse Testing POC

A proof-of-concept Next.js website with 3 pages (Home, Login, Dashboard) and Lighthouse performance testing capabilities. The project includes simple hardcoded authentication and is ready for deployment to Vercel.

## 📋 Features

- ✅ **3 Pages**: Home, Login, Dashboard
- ✅ **Navigation Bar**: Persistent navigation across all pages
- ✅ **Authentication**: Simple hardcoded user authentication
  - Username: `user`
  - Password: `password`
- ✅ **Protected Routes**: Dashboard requires authentication
- ✅ **Lighthouse Testing**: Run performance audits on all pages
- ✅ **Tailwind CSS**: Modern, responsive UI
- ✅ **Vercel Ready**: Easy deployment configuration
- ✅ **TypeScript**: Full type safety support

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Testing**: Lighthouse CLI
- **Deployment**: Vercel

## 📂 Project Structure

```
.
├── app/
│   ├── layout.tsx           # Root layout with navbar
│   ├── page.tsx             # Home page
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── dashboard/
│   │   └── page.tsx         # Protected dashboard page
│   └── globals.css          # Global styles
├── components/
│   └── Navbar.tsx           # Navigation component
├── lighthouse-test.js       # Lighthouse testing script
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── next.config.js           # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd /Users/kaiwanyawit/Repositories/poc-lighthouse-puppeteer
```

2. Dependencies are already installed! ✅

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Pages

#### Home Page (`/`)
- Landing page with welcome message
- Information about performance and security
- Links to login and dashboard

#### Login Page (`/login`)
- Simple authentication form
- Demo credentials displayed
- Stores auth state in localStorage
- Redirects to dashboard on successful login

#### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Displays mock performance metrics
- Shows recent audit history
- Logout button

## 🔐 Authentication

The application uses a simple hardcoded authentication:
- **Username**: `user`
- **Password**: `password`

Authentication state is stored in browser's localStorage. To test:

1. Go to `/login`
2. Enter credentials (user/password)
3. Click "Sign In"
4. You'll be redirected to `/dashboard`

To logout:
1. Visit `/dashboard`
2. Click the "Logout" button

## 📊 Lighthouse Testing

The project includes a Lighthouse testing script that audits all pages for performance, accessibility, best practices, and SEO.

### Prerequisites for Testing
- Lighthouse CLI needs to be installed globally or available locally
- The Next.js dev server must be running

### Running Tests

1. Start the dev server in one terminal:
```bash
npm run dev
```

2. In another terminal, run the tests:
```bash
npm run lighthouse
```

This will:
- Test the Home page (`/`)
- Test the Login page (`/login`)
- Test the Dashboard page (`/dashboard`)
- Generate a JSON report with scores for:
  - Performance
  - Accessibility
  - Best Practices
  - SEO

The report is saved to `lighthouse-report.json`

## 🏗️ Building for Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🌐 Deployment to Vercel

The project is configured for easy deployment to Vercel.

### Option 1: Deploy via CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic Vercel deployments. To use it:

1. Set up these secrets in your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. Push to main branch to trigger automatic deployment

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lighthouse` - Run Lighthouse tests

## 🎯 Key Features Explained

### Navigation Bar
The `Navbar` component is a client-side component that:
- Shows different links based on authentication status
- Displays "Dashboard" link when user is logged in
- Shows "Login" link when user is logged out
- Checks localStorage for authentication state

### Protected Routes
The Dashboard page:
- Checks authentication status on mount
- Redirects to login if not authenticated
- Shows loading state while checking auth
- Displays user welcome message
- Includes logout functionality

### Responsive Design
All pages are fully responsive using Tailwind CSS:
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly buttons and inputs

## 📚 Next Steps

1. **Customize**: Modify pages, add features, change styling
2. **Add Database**: Integrate a real database for user management
3. **Enhance Auth**: Add OAuth providers (Google, GitHub, etc.)
4. **Add More Pages**: Create additional pages as needed
5. **Optimize Images**: Add image optimization for better Lighthouse scores
6. **Testing**: Add unit and integration tests
7. **Analytics**: Integrate analytics tools

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Reset authentication
Open browser dev tools and in the console:
```javascript
localStorage.clear()
```

## 📄 License

This is a proof-of-concept project. Feel free to use and modify as needed.

## 🤝 Support

For issues or questions, check the Next.js documentation at [nextjs.org](https://nextjs.org)

---

**Ready to deploy?** Follow the [Deployment to Vercel](#-deployment-to-vercel) section above!
