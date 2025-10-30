# Your Admin User - Ready to Create

## 🔑 Your Credentials

- **Email:** `naan11477@gmail.com`
- **Password:** `4ChanReddit123`

## 📝 Create Admin User in pgAdmin

### Step 1: Open Query Tool
1. Open **pgAdmin 4**
2. Connect to your PostgreSQL server
3. Expand your server → Databases → **certificate_db**
4. Right-click on **certificate_db** → **Query Tool**

### Step 2: Run This SQL

Copy and paste this into the Query Tool:

```sql
INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin001',
  'naan11477@gmail.com',
  '$2a$10$XEyUX9F7jNA8N33c8Je2h.nkm.IrGsaBvisMvTy93ukQQQsidepfy',
  false
);
```

### Step 3: Execute
Click the **Execute** button (⚡ lightning bolt icon) or press **F5**

## ✅ Login to Your Application

After running the SQL:

1. Go to: **http://localhost:3000**
2. Click **"Admin Login"** in the navbar
3. Enter:
   - Email: `naan11477@gmail.com`
   - Password: `4ChanReddit123`
4. You're in! 🎉

## 🔐 Security Notes

- ✅ Password is securely hashed with bcrypt
- ✅ 2FA is disabled by default (you can enable it later)
- ⚠️ Change your password after first login in production
- ⚠️ Enable 2FA for extra security

## 📊 What You Can Do

Once logged in, you can:
- ✅ View all 5,000 certificates
- ✅ Add new certificates
- ✅ Edit existing certificates
- ✅ Delete certificates
- ✅ Toggle verification status (VERIFIED/UNVERIFIED)

Enjoy your Certificate Verification Portal! 🚀

