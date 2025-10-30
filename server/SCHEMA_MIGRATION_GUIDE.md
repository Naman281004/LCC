# Certificate Schema Migration Guide

## ⚠️ IMPORTANT: Database Schema Update Required

The certificate schema has been updated with new fields. Follow these steps to migrate your database.

---

## 📋 Schema Changes

### **Old Schema:**
```prisma
model Certificate {
  id             String     @id @unique @default(cuid())
  studentName    String
  courseName     String
  courseDuration String
  issueDate      DateTime
  expiryDate     DateTime?  // Optional
  status         CertificateStatus @default(VERIFIED)
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
```

### **New Schema:**
```prisma
model Certificate {
  id                  String     @id @unique @default(cuid())
  registrationNumber  String     @unique // NEW
  studentName         String
  course              String     // RENAMED from courseName
  duration            String     // RENAMED from courseDuration
  startDate           DateTime   // NEW
  endDate             DateTime   // NEW (replaces expiryDate)
  issueDate           DateTime
  status              CertificateStatus @default(VERIFIED)
  createdAt           DateTime   @default(now())
  updatedAt           DateTime   @updatedAt
}
```

---

## 🚀 Migration Steps

### Step 1: Backup Your Database (CRITICAL!)

```bash
# From server directory
cd E:\LCC_\server

# Export existing data (using pg_dump)
pg_dump -U postgres -d lcc_certificates > backup_$(date +%Y%m%d_%H%M%S).sql

# Or using PostgreSQL GUI (pgAdmin)
# Right-click database > Backup > Choose location
```

### Step 2: Run Prisma Migration

```bash
# From server directory
cd E:\LCC_\server

# Generate Prisma client with new schema
npx prisma generate

# Create and run migration
npx prisma migrate dev --name update_certificate_schema

# Or if you want to reset the database (WARNING: DELETES ALL DATA)
npx prisma migrate reset
npx prisma migrate deploy
```

### Step 3: Clear Old Data (if needed)

If you want to start fresh with the new schema:

```bash
# From server directory
npx prisma migrate reset

# Then seed with new data
npm run seed:new
```

---

## 📝 Manual SQL Migration (Alternative)

If you want to keep some data, you can use this SQL migration:

```sql
-- Step 1: Add new columns
ALTER TABLE "Certificate" 
  ADD COLUMN "registrationNumber" TEXT,
  ADD COLUMN "course" TEXT,
  ADD COLUMN "duration" TEXT,
  ADD COLUMN "startDate" TIMESTAMP(3),
  ADD COLUMN "endDate" TIMESTAMP(3);

-- Step 2: Migrate existing data
UPDATE "Certificate" 
SET 
  "registrationNumber" = CONCAT('LCC2024', LPAD(ROW_NUMBER() OVER (ORDER BY "createdAt")::TEXT, 5, '0')),
  "course" = "courseName",
  "duration" = "courseDuration",
  "startDate" = "issueDate" - INTERVAL '6 months',  -- Adjust as needed
  "endDate" = COALESCE("expiryDate", "issueDate" + INTERVAL '2 years');

-- Step 3: Make required fields NOT NULL
ALTER TABLE "Certificate" 
  ALTER COLUMN "registrationNumber" SET NOT NULL,
  ALTER COLUMN "course" SET NOT NULL,
  ALTER COLUMN "duration" SET NOT NULL,
  ALTER COLUMN "startDate" SET NOT NULL,
  ALTER COLUMN "endDate" SET NOT NULL;

-- Step 4: Add unique constraint
ALTER TABLE "Certificate" 
  ADD CONSTRAINT "Certificate_registrationNumber_key" UNIQUE ("registrationNumber");

-- Step 5: Drop old columns
ALTER TABLE "Certificate" 
  DROP COLUMN "courseName",
  DROP COLUMN "courseDuration",
  DROP COLUMN "expiryDate";
```

---

## 🆕 Seed New Sample Data

A new seed script has been created for the updated schema:

```bash
# From server directory
npm run seed:new
```

This will create sample certificates with the new schema structure.

---

## ✅ Verification Steps

After migration, verify everything works:

### 1. Check Database Schema
```bash
npx prisma studio
```

### 2. Test API Endpoints

**Test Certificate Creation:**
```bash
curl -X POST http://localhost:5000/api/certificate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "registrationNumber": "LCC2024001",
    "studentName": "John Doe",
    "course": "DCA",
    "duration": "6 Months",
    "startDate": "2024-01-01",
    "endDate": "2024-06-30",
    "issueDate": "2024-07-01",
    "status": "VERIFIED"
  }'
```

**Test Certificate Retrieval:**
```bash
curl http://localhost:5000/api/certificate/CERTIFICATE_ID
```

### 3. Test Frontend

1. Start backend: `npm run dev` (in server directory)
2. Start frontend: `npm run dev` (in client directory)
3. Go to admin dashboard and try adding a certificate
4. Search for a certificate on the public page

---

## 📊 Field Mapping Reference

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `id` | `id` | Unchanged |
| - | `registrationNumber` | **NEW** - Unique student reg number |
| `studentName` | `studentName` | Unchanged |
| `courseName` | `course` | **RENAMED** |
| `courseDuration` | `duration` | **RENAMED** |
| - | `startDate` | **NEW** - Course start date |
| `expiryDate` | `endDate` | **RENAMED** - Course end date |
| `issueDate` | `issueDate` | Unchanged |
| `status` | `status` | Unchanged |
| `createdAt` | `createdAt` | Unchanged |
| `updatedAt` | `updatedAt` | Unchanged |

---

## 🛠️ Troubleshooting

### Error: "Column does not exist"
- Run `npx prisma generate` and restart your server

### Error: "Unique constraint violation"
- Make sure all `registrationNumber` values are unique
- Check for duplicate entries

### Frontend shows old field names
- Clear browser cache
- Restart frontend dev server
- Check that all components are updated

### Forms not working
- Check browser console for errors
- Verify all form fields match new schema
- Test with new course dropdown

---

## 📞 Support

If you encounter issues:
1. Check Prisma logs: `npx prisma studio`
2. Check server logs for errors
3. Verify `.env` database connection
4. Review this migration guide

---

**Last Updated:** October 29, 2025  
**Status:** ✅ Migration Guide Ready

