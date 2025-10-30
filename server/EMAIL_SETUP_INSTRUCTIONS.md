# 📧 Email Setup Instructions for LCC Certificate Portal

## Step 1: Gmail Setup (Recommended)

### 1.1 Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the prompts to enable 2FA

### 1.2 Generate App Password
1. In Google Account Security settings
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" from the dropdown
4. Select "Other (Custom name)" from device dropdown
5. Enter "LCC Certificate Portal" as the name
6. Click "Generate"
7. **Copy the 16-character password** (it looks like: abcd efgh ijkl mnop)

## Step 2: Update Environment Variables

Create or update `server/.env` file with:

```env
# Database
DATABASE_URL="postgresql://postgres:4ChanReddit123@localhost:5432/certificate_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port
PORT=5000

# Email Configuration (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-character-app-password"
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the app password from Step 1.2

## Step 3: Test Email Configuration

After updating .env, restart the server and test:

```bash
cd server
npm run dev
```

Then try logging in - you should receive a real OTP email!

## Alternative Email Services

If you prefer other email services:

### Outlook/Hotmail
```env
EMAIL_USER="your-email@outlook.com"
EMAIL_PASS="your-password"
```

### Custom SMTP
```env
EMAIL_USER="your-email@yourdomain.com"
EMAIL_PASS="your-password"
EMAIL_HOST="smtp.your-provider.com"
EMAIL_PORT="587"
```

## Troubleshooting

### "Invalid login" error
- Make sure 2FA is enabled on your Google account
- Use the app password, not your regular Gmail password
- Check that the email address is correct

### "Less secure app access" error
- This is normal with Gmail - use app passwords instead
- App passwords are more secure than enabling "less secure apps"

### Email not received
- Check spam/junk folder
- Verify the recipient email address
- Check if your email provider blocks automated emails
- Make sure the app password is correct

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main account password
- The OTP expires in 10 minutes for security
- Each OTP can only be used once
