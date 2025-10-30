# Create Admin User - SQL Script

## Method 1: Run SQL in pgAdmin

1. Open **pgAdmin**
2. Connect to your server
3. Right-click on **certificate_db** → **Query Tool**
4. Copy and paste the SQL below:

```sql
INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin001',
  'admin@example.com',
  '$2a$10$XQnrTBZDGYHAhJKKU4FS7.VkjdGBRNjDW9BkPl5VxQb8vkP1qJRUy',
  false
);
```

5. Click **Execute** (⚡ lightning icon or press F5)

## Login Credentials

After running the SQL:
- **Email:** `admin@example.com`
- **Password:** `admin123`

## Method 2: Interactive Script

Alternatively, use the interactive admin creation script:

```bash
cd server
npm run create-admin
```

Then enter:
- Email: your_email@example.com
- Password: your_secure_password

## Method 3: Create Multiple Admins

```sql
-- Admin 1
INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin001',
  'admin@example.com',
  '$2a$10$XQnrTBZDGYHAhJKKU4FS7.VkjdGBRNjDW9BkPl5VxQb8vkP1qJRUy',
  false
);

-- Admin 2
INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin002',
  'admin2@example.com',
  '$2a$10$XQnrTBZDGYHAhJKKU4FS7.VkjdGBRNjDW9BkPl5VxQb8vkP1qJRUy',
  false
);
```

Both will have password: `admin123`

## Notes

- The `id` must be unique for each admin
- The hashed password shown (`$2a$10$XQn...`) is bcrypt hash of `admin123`
- Set `twoFactorEnabled` to `false` initially (enable it later from admin panel)

