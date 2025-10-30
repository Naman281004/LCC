# Certificate Verification Portal - Backend

Express.js backend server with PostgreSQL database and Prisma ORM.

## Features

- RESTful API architecture
- JWT authentication with 2FA support
- PostgreSQL database with Prisma ORM
- Secure password hashing with bcryptjs
- TOTP-based two-factor authentication
- CORS enabled
- Environment-based configuration

## Prerequisites

- Node.js v18 or higher
- PostgreSQL v14 or higher
- npm or yarn

## Installation

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the `server` directory (or copy from `.env.example`):
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/certificate_db?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=5000
   ```

   Replace:
   - `username` - Your PostgreSQL username
   - `password` - Your PostgreSQL password
   - `certificate_db` - Your database name
   - `JWT_SECRET` - A strong random string (use a password generator)

3. **Create the database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE certificate_db;
   ```

4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

## Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

## Database Setup

### Seed Demo Data (Optional)

To populate your database with 5000 demo certificates for testing:

```bash
npm run seed:5000
```

This will generate realistic certificate data with:
- 5000 certificates
- Random student names
- 50 different course types
- Varied dates and statuses
- Completes in ~15-30 seconds

For just 5 sample certificates:
```bash
npm run seed
```

See [SEEDING_GUIDE.md](SEEDING_GUIDE.md) for detailed information.

### Create Admin User

Since there's no public signup, you need to manually create admin users in the database.

#### Option 1: Using Prisma Studio
```bash
npm run prisma:studio
```
Then navigate to the `User` table and add a new record. For the password, use a bcrypt hash.

#### Option 2: Using SQL
```sql
-- First hash your password using bcrypt
-- Example: "admin123" with 10 salt rounds

INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'cuid_here',  -- Generate a CUID or use any unique string
  'admin@example.com',
  '$2a$10$XQnrTBZDGYHAhJKKU4FS7.VkjdGBRNjDW9BkPl5VxQb8vkP1qJRUy',  -- hashed "admin123"
  false
);
```

#### Option 3: Using Node.js Script

Create a file `scripts/createAdmin.js`:
```javascript
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@example.com';
  const password = 'admin123';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      twoFactorEnabled: false,
    },
  });
  
  console.log('Admin user created:', user.email);
  await prisma.$disconnect();
}

createAdmin();
```

Run it:
```bash
node scripts/createAdmin.js
```

## API Documentation

### Public Endpoints

#### Verify Certificate
```http
GET /api/certificate/:id
```
Returns certificate details if found.

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:
- If 2FA disabled: `{ "token": "jwt_token_here" }`
- If 2FA enabled: `{ "status": "2fa_required", "email": "admin@example.com" }`

#### Verify 2FA
```http
POST /api/auth/2fa/verify
Content-Type: application/json

{
  "email": "admin@example.com",
  "token": "123456"
}
```

Response: `{ "token": "jwt_token_here" }`

#### Generate 2FA (Protected)
```http
POST /api/auth/2fa/generate
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "dataUrl": "data:image/png;base64,...",
  "secret": "JBSWY3DPEHPK3PXP"
}
```

### Protected Admin Endpoints

All admin endpoints require the `Authorization: Bearer <token>` header.

#### Get All Certificates
```http
GET /api/certificate
Authorization: Bearer <jwt_token>
```

#### Create Certificate
```http
POST /api/certificate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "studentName": "John Doe",
  "courseName": "Web Development",
  "courseDuration": "6 Weeks",
  "issueDate": "2024-01-15",
  "expiryDate": "2025-01-15",
  "status": "VERIFIED"
}
```

#### Update Certificate
```http
PUT /api/certificate/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "UNVERIFIED"
}
```

#### Delete Certificate
```http
DELETE /api/certificate/:id
Authorization: Bearer <jwt_token>
```

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── prismaClient.js    # Prisma client instance
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── certificateController.js  # Certificate CRUD
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── certificateRoutes.js  # Certificate endpoints
│   └── server.js              # Express app entry point
├── .env                       # Environment variables
├── .env.example               # Environment template
└── package.json
```

## Database Schema

### User Table
- `id` - Unique identifier (CUID)
- `email` - Unique email address
- `hashedPassword` - bcrypt hashed password
- `twoFactorEnabled` - Boolean for 2FA status
- `twoFactorSecret` - TOTP secret (ASCII)

### Certificate Table
- `id` - Unique certificate ID (CUID) - **indexed for fast lookup**
- `studentName` - Student's full name
- `courseName` - Course title
- `courseDuration` - Duration (e.g., "6 Weeks")
- `issueDate` - Date issued
- `expiryDate` - Optional expiry date
- `status` - VERIFIED or UNVERIFIED
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Format schema file
npx prisma format
```

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong JWT secrets** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS in production** - Use reverse proxy (nginx)
4. **Rate limiting** - Consider adding rate limiting middleware
5. **Input validation** - Always validate user inputs
6. **SQL injection protection** - Prisma provides built-in protection
7. **CORS configuration** - Update for production domain

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Ensure database exists
- Check PostgreSQL logs

### Prisma Issues
- Run `npx prisma generate` after schema changes
- Clear Prisma cache: `rm -rf node_modules/.prisma`
- Check migration status: `npx prisma migrate status`

### JWT Issues
- Verify JWT_SECRET is set in `.env`
- Check token expiration time
- Ensure proper Authorization header format: `Bearer <token>`

## Performance Notes

- The `@unique` constraint on `Certificate.id` creates a database index automatically
- Prisma connection pooling is configured by default
- Consider adding pagination for large datasets
- Monitor database query performance with Prisma logs

## Development Tips

```bash
# Watch mode for development
npm run dev

# View database with GUI
npm run prisma:studio

# Check TypeScript types (if using TS)
npx prisma validate
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-here` |
| `PORT` | Server port number | `5000` |

## License

This project is provided as-is for educational purposes.

