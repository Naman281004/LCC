# Quick Setup Guide

This guide will help you get the Certificate Verification Portal running in minutes.

## Prerequisites Checklist

Before you begin, ensure you have:
- [ ] Node.js v18+ installed (`node --version`)
- [ ] PostgreSQL v14+ installed and running
- [ ] npm or yarn installed
- [ ] A PostgreSQL database created

## 🚀 Quick Start (5 Minutes)

### Step 1: Database Setup

```bash
# Start PostgreSQL (if not running)
# On macOS with Homebrew:
brew services start postgresql

# On Windows, start PostgreSQL service from Services

# Create database
psql -U postgres
CREATE DATABASE certificate_db;
\q
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment (edit .env file or use default)
# Default DATABASE_URL: postgresql://postgres:password@localhost:5432/certificate_db
# Update with your PostgreSQL credentials

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Create an admin user (interactive)
npm run create-admin
# Enter: admin@example.com / admin123 (or your preferred credentials)

# (Optional) Seed 5000 demo certificates for realistic testing
npm run seed:5000
# Or just 5 sample certificates:
# npm run seed

# Start the server
npm run dev
```

Server should now be running on `http://localhost:5000` ✅

### Step 3: Frontend Setup

```bash
# Open a new terminal
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend should now be running on `http://localhost:3000` ✅

## 🎉 You're Ready!

### Test the Application

1. **Public Portal**: http://localhost:3000
   - Enter a certificate ID from the seeded data to test verification

2. **Admin Login**: http://localhost:3000/admin/login
   - Email: `admin@example.com`
   - Password: `admin123` (or what you set)

3. **Admin Dashboard**: After login, manage certificates

## 📋 Testing Certificate IDs

After running `npm run seed:5000`, you'll see sample certificate IDs printed. Copy any to test verification!

Example format: `clxxxxxxxxxxxxxxxxxx`

The script generates **5000 certificates** with:
- Random student names (realistic)
- 50 different course types
- Various issue dates (past 2 years)
- 80% VERIFIED, 20% UNVERIFIED status

## 🔧 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in server/.env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/certificate_db"
```

### Port Already in Use
```bash
# Change server port in server/.env
PORT=5001

# Change client port in client/vite.config.js
server: { port: 3001 }
```

### Prisma Client Not Generated
```bash
cd server
npx prisma generate
```

### CORS Error in Frontend
- Ensure backend is running on http://localhost:5000
- Check `client/src/lib/axios.js` has correct baseURL

## 🔐 Setup Two-Factor Authentication (Optional)

1. Login to admin dashboard
2. Open browser console and run:
   ```javascript
   fetch('http://localhost:5000/api/auth/2fa/generate', {
     method: 'POST',
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     }
   })
   .then(r => r.json())
   .then(data => {
     console.log('QR Code URL:', data.dataUrl);
     // Open this URL in browser to see QR code
     window.open(data.dataUrl);
   });
   ```
3. Scan QR code with Google Authenticator or Authy
4. Logout and login again - you'll now need 2FA code

## 📁 Project Structure Overview

```
LCC_/
├── client/              # React frontend (Port 3000)
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # React hooks (auth)
│   │   └── lib/         # Axios config
│   └── package.json
│
└── server/              # Express backend (Port 5000)
    ├── src/
    │   ├── controllers/ # Business logic
    │   ├── routes/      # API routes
    │   └── middleware/  # Auth middleware
    ├── prisma/          # Database schema
    ├── scripts/         # Utility scripts
    └── package.json
```

## 🛠️ Useful Commands

### Backend
```bash
cd server

# Development
npm run dev              # Start with hot reload

# Database
npm run prisma:studio    # Open database GUI
npm run prisma:generate  # Regenerate Prisma Client
npx prisma migrate dev   # Create new migration

# Utilities
npm run create-admin     # Create new admin user
npm run hash-password    # Hash a password
npm run seed            # Seed sample data
```

### Frontend
```bash
cd client

# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

## 🎯 Next Steps

1. **Customize the UI**: Edit components in `client/src/components/`
2. **Add Features**: Extend API in `server/src/controllers/`
3. **Deploy**: See deployment section in README.md
4. **Add More Admins**: Run `npm run create-admin` again
5. **Configure 2FA**: Follow the optional 2FA setup above

## 📚 Additional Resources

- [Full README](README.md)
- [Backend Documentation](server/README.md)
- [Frontend Documentation](client/README.md)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

## 🆘 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set
5. Ensure both servers are running

## 🔒 Security Reminders

- [ ] Change default passwords before production
- [ ] Update JWT_SECRET in `.env` to a strong random string
- [ ] Never commit `.env` files
- [ ] Enable HTTPS in production
- [ ] Set up proper database backups
- [ ] Use strong passwords for database
- [ ] Enable 2FA for all admin accounts

## ✅ Setup Verification

Run this checklist to verify everything works:

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can create admin user
- [ ] Can login to admin panel
- [ ] Can add a certificate
- [ ] Can edit a certificate
- [ ] Can delete a certificate
- [ ] Can toggle certificate status
- [ ] Public search returns results
- [ ] Invalid certificate ID shows error
- [ ] Logout works correctly
- [ ] Protected routes redirect to login

---

**Congratulations! Your Certificate Verification Portal is now running!** 🎊

