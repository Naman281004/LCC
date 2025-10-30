# Certificate Verification Portal

A secure, high-performance certificate verification system for educational institutions built with React and Node.js/Express.

## Features

### Public Features
- **Certificate Verification**: Students can verify certificates using a unique ID
- **Responsive Design**: Beautiful, modern UI built with Tailwind CSS
- **Real-time Search**: Instant certificate lookup with detailed information display

### Admin Features
- **Secure Authentication**: JWT-based authentication with 2FA support (TOTP)
- **Certificate Management**: Full CRUD operations for certificates
- **Status Toggle**: Quick verification status updates
- **Protected Routes**: Secure admin panel with middleware protection

## Tech Stack

### Frontend (`/client`)
- **React 18+** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **Sonner** for toast notifications
- **Axios** for API requests

### Backend (`/server`)
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** for authentication
- **Speakeasy** for 2FA (TOTP)
- **bcryptjs** for password hashing

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── public/   # Public-facing components
│   │   │   ├── admin/    # Admin dashboard components
│   │   │   └── auth/     # Authentication components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and axios config
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── routes/       # API routes
    │   └── config/       # Configuration files
    ├── prisma/           # Database schema
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd LCC_
   ```

2. **Setup Backend**
   
   See [server/README.md](server/README.md) for detailed backend setup instructions.

3. **Setup Frontend**
   
   See [client/README.md](client/README.md) for detailed frontend setup instructions.

## Quick Start

### 1. Start PostgreSQL
Make sure PostgreSQL is running on your machine.

### 2. Setup Backend
```bash
cd server
npm install
# Update .env with your database credentials
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Seed Demo Data (Optional)

To test with realistic data, generate 5000 demo certificates:

```bash
cd server
npm run seed:5000
```

This creates 5000 certificates with varied students, courses, and dates. Takes ~15-30 seconds.

### 5. Create Admin User
You need to manually add an admin user to the database. Connect to your PostgreSQL database and run:

```sql
-- First, hash your password using bcrypt (rounds=10)
-- For example, "admin123" becomes: $2a$10$XQ... (use an online bcrypt tool or Node.js script)

INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin001',
  'admin@example.com',
  '$2a$10$XQnrTBZDGYHAhJKKU4FS7.VkjdGBRNjDW9BkPl5VxQb8vkP1qJRUy', -- This is "admin123"
  false
);
```

Or use this Node.js script:
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10, (err, hash) => {
  console.log(hash);
});
```

### 6. Access the Application

- **Public Portal**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:5000

## API Endpoints

### Public
- `GET /api/certificate/:id` - Verify a certificate

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/2fa/verify` - Verify 2FA token
- `POST /api/auth/2fa/generate` - Generate 2FA QR code (protected)

### Admin (Protected)
- `GET /api/certificate` - Get all certificates
- `POST /api/certificate` - Create new certificate
- `PUT /api/certificate/:id` - Update certificate
- `DELETE /api/certificate/:id` - Delete certificate

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **2FA Support**: Optional TOTP-based two-factor authentication
3. **Password Hashing**: bcrypt with salt rounds
4. **Protected Routes**: Middleware-based route protection
5. **CORS Configuration**: Controlled cross-origin requests
6. **Input Validation**: Server-side validation for all inputs

## Development

### Backend Development
```bash
cd server
npm run dev        # Start server with hot reload
npm run prisma:studio  # Open Prisma Studio
```

### Frontend Development
```bash
cd client
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Deployment Considerations

1. **Environment Variables**: Update all `.env` files with production values
2. **Database**: Use a production PostgreSQL instance
3. **JWT Secret**: Generate a strong, random JWT secret
4. **CORS**: Configure CORS for your production domain
5. **HTTPS**: Always use HTTPS in production
6. **Database Migrations**: Run `npx prisma migrate deploy` in production

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions, please refer to the individual README files in `/client` and `/server` directories.

