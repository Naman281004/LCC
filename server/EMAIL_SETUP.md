# Email OTP Setup Guide

## 📧 Email Configuration

To enable email OTP functionality, you need to configure email settings in your `.env` file.

### 1. Update .env file

Add these lines to your `server/.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

### 2. Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

#### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and "Other (Custom name)"
4. Enter "LCC Certificate Portal" as the name
5. Copy the generated 16-character password

#### Step 3: Update .env
Replace `your-app-password` with the generated app password.

### 3. Alternative Email Services

You can also use other email services by modifying the transporter configuration in `src/services/emailService.js`:

#### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

#### Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 4. Test Email Configuration

Run this command to test your email setup:

```bash
node -e "
import('./src/services/emailService.js').then(({ testEmailConfig }) => {
  testEmailConfig().then(result => {
    console.log('Email test result:', result);
    process.exit(0);
  });
});
"
```

### 5. Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main account password
- Consider using environment variables in production
- The OTP expires in 10 minutes for security

### 6. Troubleshooting

#### "Invalid login" error
- Check if 2FA is enabled on your Google account
- Verify you're using the app password, not your regular password
- Ensure the email address is correct

#### "Less secure app access" error
- This is normal with Gmail - use app passwords instead
- App passwords are more secure than enabling "less secure apps"

#### Email not received
- Check spam/junk folder
- Verify the recipient email address
- Check if your email provider blocks automated emails
