# Certificate Verification Portal - Frontend

Modern React application built with Vite, Tailwind CSS, and React Router.

## Features

- **Public Certificate Verification**: Search and verify certificates using unique IDs
- **Admin Dashboard**: Secure admin panel with full CRUD operations
- **Two-Factor Authentication**: TOTP-based 2FA support
- **Responsive Design**: Mobile-friendly interface
- **Toast Notifications**: User feedback with Sonner
- **Protected Routes**: Secure admin access with JWT

## Tech Stack

- **React 18.3+** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible UI components
- **Axios** - HTTP client
- **Sonner** - Toast notifications

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Backend server running (see `/server/README.md`)

## Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint** (if needed)
   
   By default, the app connects to `http://localhost:5000/api`. 
   
   To change this, update `client/src/lib/axios.js`:
   ```javascript
   const axiosInstance = axios.create({
     baseURL: 'http://your-api-url:port/api',
   });
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

The app will start on `http://localhost:3000`.

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist` folder.

## Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── public/        # Public-facing components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ContactInfo.jsx
│   │   │   └── CertificateSearch.jsx
│   │   ├── admin/         # Admin dashboard
│   │   │   └── AdminDashboard.jsx
│   │   └── auth/          # Authentication components
│   │       ├── ProtectedRoute.jsx
│   │       └── Verify2FA.jsx
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── AdminLoginPage.jsx
│   │   └── AdminDashboardPage.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.js     # Authentication context
│   ├── lib/               # Utilities
│   │   └── axios.js       # Axios instance with interceptors
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Application Routes

### Public Routes
- `/` - Home page with certificate search
- `/admin/login` - Admin login page

### Protected Routes (Admin)
- `/admin/dashboard` - Admin dashboard with CRUD operations

## Key Components

### Public Components

#### HeroSection
Hero banner with title and description.

#### CertificateSearch
Main certificate verification form:
- Input for certificate ID
- Search functionality
- Display results in formatted table
- Error handling with toast notifications

#### AboutUs
Information about the institution.

#### ContactInfo
Contact details and information.

### Admin Components

#### AdminDashboard
Full-featured admin panel:
- View all certificates in a table
- Add new certificates (modal form)
- Edit existing certificates (modal form)
- Delete certificates (confirmation modal)
- Toggle certificate status (VERIFIED/UNVERIFIED)
- Logout functionality

### Auth Components

#### AdminLoginPage
Login form with:
- Email and password inputs
- 2FA redirect handling
- Error handling

#### Verify2FA
Two-factor authentication verification:
- 6-digit code input
- Authenticator app integration
- Error handling and feedback

#### ProtectedRoute
Route wrapper that:
- Checks for valid JWT token
- Redirects to login if unauthorized
- Protects admin routes

## State Management

### useAuth Hook
Custom context hook for authentication:

```javascript
const { token, login, logout, isAuthenticated } = useAuth();

// Login (store token)
login(jwtToken);

// Logout (clear token)
logout();

// Check auth status
const isLoggedIn = isAuthenticated();
```

## API Integration

### Axios Instance
Pre-configured axios instance (`src/lib/axios.js`):
- Automatic JWT token injection
- Request/response interceptors
- Auto-redirect on 401/403 errors

Usage:
```javascript
import axiosInstance from '../lib/axios';

// GET request
const response = await axiosInstance.get('/certificate');

// POST request
const response = await axiosInstance.post('/certificate', data);

// PUT request
const response = await axiosInstance.put(`/certificate/${id}`, data);

// DELETE request
const response = await axiosInstance.delete(`/certificate/${id}`);
```

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration in `tailwind.config.js`.

Common patterns:
```jsx
// Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Click me
</button>

// Input
<input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />

// Card
<div className="bg-white rounded-lg shadow-lg p-8">
  Content
</div>
```

### Headless UI
Used for accessible modals (Dialog component) in AdminDashboard.

### Sonner Toast
Toast notifications:
```javascript
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
```

## User Flows

### Student Verification Flow
1. Visit home page
2. Enter certificate ID in search box
3. Click "Search"
4. View certificate details in table
5. See success/error toast notification

### Admin Login Flow (without 2FA)
1. Visit `/admin/login`
2. Enter email and password
3. Click "Sign In"
4. Redirected to `/admin/dashboard`

### Admin Login Flow (with 2FA)
1. Visit `/admin/login`
2. Enter email and password
3. Click "Sign In"
4. Shown 2FA verification screen
5. Enter 6-digit code from authenticator app
6. Click "Verify"
7. Redirected to `/admin/dashboard`

### Admin Certificate Management
1. Login to admin dashboard
2. View all certificates in table
3. **Add**: Click "Add New Certificate" → Fill form → Submit
4. **Edit**: Click "Edit" on row → Modify form → Submit
5. **Delete**: Click "Delete" on row → Confirm → Done
6. **Toggle Status**: Click status badge to toggle VERIFIED/UNVERIFIED

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR. Changes reflect immediately without full page reload.

### React DevTools
Install React DevTools browser extension for debugging:
- Component tree inspection
- Props and state viewing
- Performance profiling

### Console Logging
The axios instance logs errors to console. Check browser console for API errors.

### Network Tab
Use browser DevTools Network tab to:
- Monitor API requests
- Check request/response data
- Debug CORS issues
- View status codes

## Customization

### Change Colors
Update Tailwind config or use custom colors:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
};
```

### Add New Routes
```javascript
// App.jsx
<Route path="/your-route" element={<YourComponent />} />
```

### Modify API URL
```javascript
// src/lib/axios.js
const axiosInstance = axios.create({
  baseURL: 'https://your-production-api.com/api',
});
```

## Environment Variables

For Vite, create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note**: Restart dev server after changing `.env` files.

## Build and Deployment

### Build for Production
```bash
npm run build
```

Output: `dist/` folder containing:
- Minified JavaScript
- Optimized CSS
- Static assets
- `index.html`

### Deploy Options

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Static Hosting
Upload the `dist` folder to any static hosting:
- GitHub Pages
- AWS S3
- Cloudflare Pages
- etc.

### SPA Routing Configuration

For production, configure your hosting to redirect all routes to `index.html`:

**Netlify** (`public/_redirects`):
```
/*  /index.html  200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check `Access-Control-Allow-Origin` headers
- Verify API URL is correct

### 404 on Refresh
- Configure SPA routing (see deployment section)
- Use HashRouter as alternative: `import { HashRouter } from 'react-router-dom'`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### JWT Token Issues
- Check localStorage in DevTools → Application → Local Storage
- Token key: `token`
- Clear token: `localStorage.removeItem('token')`

## Performance Optimization

1. **Lazy Loading**:
```javascript
const AdminDashboard = lazy(() => import('./pages/AdminDashboardPage'));
```

2. **Image Optimization**: Use WebP format and proper sizing

3. **Code Splitting**: Vite handles this automatically

4. **Memoization**: Use `React.memo()` for expensive components

## Testing

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Certificate search works
- [ ] Admin login works
- [ ] 2FA verification works (if enabled)
- [ ] Admin dashboard loads
- [ ] Can add certificate
- [ ] Can edit certificate
- [ ] Can delete certificate
- [ ] Can toggle status
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] Responsive on mobile

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for educational purposes.

