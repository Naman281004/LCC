-- Create Admin User for naan11477@gmail.com
-- Password: 4ChanReddit123

INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")
VALUES (
  'admin001',
  'naan11477@gmail.com',
  '$2a$10$XEyUX9F7jNA8N33c8Je2h.nkm.IrGsaBvisMvTy93ukQQQsidepfy',
  false
);

