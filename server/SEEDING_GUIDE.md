# Database Seeding Guide

This guide explains how to populate your database with demo certificate data.

## 🚀 Quick Start

### Generate 5000 Certificates

```bash
cd server
npm run seed:5000
```

This will generate **5000 realistic certificate records** with:
- Random student names (100+ first names, 80+ last names)
- 50 different course types
- Random issue dates (past 2 years)
- 70% with expiry dates (2 years after issue)
- 80% VERIFIED status, 20% UNVERIFIED
- Varied course durations (4-20 weeks)

### Generate 5 Sample Certificates

```bash
cd server
npm run seed
```

This generates just **5 sample certificates** for quick testing.

## 📊 What Data is Generated?

### Student Names
The script combines random first and last names from pools of:
- **120 common first names** (diverse, international)
- **100 common last names** (diverse, international)

Result: Realistic names like "James Smith", "Maria Garcia", "David Chen"

### Course Types (50 Different Courses)
- **Web Development**: Full Stack, React, Node.js, Vue.js, Angular
- **Mobile Development**: iOS (Swift), Android (Kotlin), React Native
- **Data Science**: Python, R, Machine Learning, Deep Learning, AI
- **Cloud Computing**: AWS, Azure, Google Cloud, Docker, Kubernetes
- **Cybersecurity**: Ethical Hacking, Penetration Testing, Network Security
- **Database**: SQL, MongoDB, PostgreSQL, Database Design
- **Business**: Project Management, Agile/Scrum, Digital Marketing
- **And many more...**

### Course Durations
- 4 Weeks (short courses)
- 6 Weeks (standard courses)
- 8 Weeks (intermediate)
- 10-12 Weeks (advanced)
- 14-20 Weeks (professional/bootcamp)

### Issue Dates
- Randomly distributed across the **past 2 years**
- Realistic date ranges

### Expiry Dates
- **70% of certificates** have expiry dates
- **30% never expire** (null)
- Expiry set to **2 years after issue date**

### Certificate Status
- **80% VERIFIED** (4000 certificates)
- **20% UNVERIFIED** (1000 certificates)

## ⚡ Performance

The script uses **batch insertion** for optimal performance:
- **Batch size**: 500 certificates per batch
- **Total batches**: 10 batches
- **Typical time**: 10-30 seconds (depending on your system)

### Expected Output
```
🌱 Starting to generate 5000 certificates...

📦 Generating batch 1 of 10...
💾 Inserting batch 1...
✅ Progress: 500/5000 certificates created

📦 Generating batch 2 of 10...
💾 Inserting batch 2...
✅ Progress: 1000/5000 certificates created

... (continues for all 10 batches)

═══════════════════════════════════════════════════════
🎉 SUCCESS! Created 5000 certificates in 15.32 seconds
═══════════════════════════════════════════════════════

📊 Certificate Statistics:
   VERIFIED: 4021 certificates
   UNVERIFIED: 979 certificates

📈 Total certificates in database: 5000

🔑 Sample Certificate IDs for testing:
   ID: cm1abc123xyz...
   Student: Sarah Johnson
   Course: Web Development Bootcamp
   ---
   ID: cm1def456uvw...
   Student: Michael Chen
   Course: Data Science Fundamentals
   ---
   (etc.)
```

## 🔍 Testing the Data

After seeding, you can:

1. **Use the public portal** to search for any of the printed certificate IDs
2. **Open Prisma Studio** to browse all data visually
   ```bash
   npm run prisma:studio
   ```
3. **Use the admin dashboard** to view and manage all 5000 certificates

## 🗑️ Clear Database (if needed)

If you want to start fresh:

```bash
cd server

# WARNING: This deletes ALL data!
npx prisma migrate reset

# Then re-seed
npm run seed:5000
```

## 📝 Customizing the Script

Want to generate more or different data? Edit `scripts/seed5000Certificates.js`:

### Change the number of certificates
```javascript
const totalCertificates = 10000; // Change from 5000 to any number
```

### Add more course types
```javascript
const courses = [
  { name: 'Your New Course', duration: '8 Weeks' },
  // ... add more
];
```

### Add more names
```javascript
const firstNames = [
  'YourName1', 'YourName2', // ... add more
];
```

### Change status distribution
```javascript
// Currently 80% verified, 20% unverified
const statuses = ['VERIFIED', 'VERIFIED', 'VERIFIED', 'VERIFIED', 'UNVERIFIED'];

// For 90% verified, 10% unverified:
const statuses = ['VERIFIED', 'VERIFIED', 'VERIFIED', 'VERIFIED', 'VERIFIED', 
                  'VERIFIED', 'VERIFIED', 'VERIFIED', 'VERIFIED', 'UNVERIFIED'];
```

## 🎯 Use Cases

### Development & Testing
```bash
npm run seed:5000
```
Perfect for testing:
- Search functionality
- Pagination (if you add it)
- Admin dashboard performance
- Database queries
- UI with realistic data

### Quick Demo
```bash
npm run seed
```
Just 5 certificates for a quick demo or initial setup.

### Production
⚠️ **Do NOT use seeded data in production!**
- These are fake, randomly generated certificates
- Use the admin dashboard to add real certificates
- Or import from your institution's database

## 🔧 Troubleshooting

### "Error: P2002: Unique constraint failed"
This is rare but can happen if IDs collide. Simply run the script again.

### Script is slow
- Check your database connection
- Ensure PostgreSQL has enough resources
- Consider reducing batch size in the script

### Out of memory
- Reduce batch size from 500 to 250
- Or generate fewer certificates

### Database connection error
- Verify DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Check database credentials

## 📚 Related Commands

```bash
# View database in GUI
npm run prisma:studio

# Check database schema
npx prisma db pull

# Generate Prisma Client
npm run prisma:generate

# Create new migration
npx prisma migrate dev

# View migration status
npx prisma migrate status
```

## 📈 Database Statistics

After seeding 5000 certificates, your database will have:
- **~5000 certificate records** (~50-100 MB)
- **Indexed IDs** for fast lookup
- **Realistic distribution** of data
- **Ready for testing** search, filters, and pagination

## ✅ Verification

To verify the data was seeded correctly:

1. **Count total certificates**
   ```bash
   npm run prisma:studio
   # Check Certificate table count
   ```

2. **Test a few IDs** from the output in your web app

3. **Check status distribution** in admin dashboard

4. **Search for specific courses** (if you add filters)

---

**Happy Seeding! 🌱**

