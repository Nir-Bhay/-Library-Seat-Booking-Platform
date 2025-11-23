# Deployment Guide

This guide provides step-by-step instructions for deploying the Library Seat Booking Platform to production.

---

## Prerequisites

Before starting deployment, ensure you have:

- [ ] GitHub account
- [ ] MongoDB Atlas account (free tier available)
- [ ] Razorpay account (for payments)
- [ ] Cloudinary account (for image storage)
- [ ] Render account (for backend hosting)
- [ ] Vercel account (for frontend hosting)

---

## 1. MongoDB Atlas Setup (Database)

### Step 1: Create Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or login
3. Click "Create New Project" → Name it "Library Booking"
4. Click "Build a Database"
5. Select **FREE tier (M0)** - No credit card required
6. Choose:
   - **Cloud Provider:** AWS
   - **Region:** Mumbai (ap-south-1) - closest to India
   - **Cluster Name:** library-booking-cluster
7. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Set:
   - **Username:** libraryAdmin
   - **Password:** Generate a secure password (save it!)
   - **Database User Privileges:** Read and write to any database
5. Click "Add User"

### Step 3: Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, restrict to your server IP
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to **Database** → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select:
   - **Driver:** Node.js
   - **Version:** 4.1 or later
4. Copy the connection string:
   ```
   mongodb+srv://libraryAdmin:<password>@library-booking-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `/library-booking` before the `?`
   ```
   mongodb+srv://libraryAdmin:YOUR_PASSWORD@library-booking-cluster.xxxxx.mongodb.net/library-booking?retryWrites=true&w=majority
   ```

---

## 2. Cloudinary Setup (Image Storage)

### Step 1: Create Account

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free (no credit card required)
3. Verify your email

### Step 2: Get API Credentials

1. After login, go to **Dashboard**
2. You'll see:
   - **Cloud Name:** your_cloud_name
   - **API Key:** 123456789012345
   - **API Secret:** abcdefghijklmnopqrstuvwxyz
3. Save these values - you'll need them in environment variables

### Step 3: Configure Upload Settings (Optional)

1. Go to **Settings** → **Upload**
2. Set upload presets if needed
3. Configure folder structure: `library-booking/libraries`

---

## 3. Razorpay Setup (Payment Gateway)

### Step 1: Create Account

1. Go to [Razorpay](https://razorpay.com)
2. Sign up
3. Complete business registration

### Step 2: Get Test API Keys

1. After login, switch to **Test Mode** (top left)
2. Go to **Settings** → **API Keys**
3. Click "Generate Test Keys"
4. Save:
   - **Key ID:** rzp_test_xxxxxxxxxxxxx
   - **Key Secret:** xxxxxxxxxxxxx

### Step 3: For Production (After KYC)

1. Complete KYC verification (required for live mode)
2. Switch to **Live Mode**
3. Generate **Live Keys**
4. Use these keys in production environment

### Step 4: Test Cards

For testing payment flow:
- **Success:** 4111 1111 1111 1111
- **Failure:** 4111 1111 1111 1112
- **CVV:** Any 3 digits
- **Expiry:** Any future date

---

## 4. Backend Deployment (Render)

### Step 1: Prepare Repository

1. Ensure your backend code is in a GitHub repository
2. Make sure these files exist:
   - `package.json` with `start` script
   - `.gitignore` (exclude node_modules, .env)
   - All controllers, models, routes

### Step 2: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name:** library-booking-api
   - **Region:** Singapore (closest to India)
   - **Branch:** main
   - **Root Directory:** ./backend (if backend is in subfolder)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://libraryAdmin:YOUR_PASSWORD@cluster.mongodb.net/library-booking?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://library-booking-frontend.vercel.app
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://library-booking-api.onrender.com
   ```

### Step 6: Test API

1. Visit: `https://library-booking-api.onrender.com/health`
2. Should return:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

---

## 5. Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure frontend code is in a GitHub repository
2. Create environment file for production

Create `frontend/.env.production`:
```
VITE_API_URL=https://library-booking-api.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### Step 2: Test Build Locally

```bash
cd frontend
npm install
npm run build
```

Ensure build completes without errors.

### Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./frontend (if in subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 4: Add Environment Variables

In project settings, add:

```
VITE_API_URL=https://library-booking-api.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. You'll get URL like:
   ```
   https://library-booking-frontend.vercel.app
   ```

---

## 6. Update CORS Settings

After getting your frontend URL, update backend CORS settings:

1. Go to Render dashboard
2. Select your web service
3. Add/Update environment variable:
   ```
   FRONTEND_URL=https://library-booking-frontend.vercel.app
   ```
4. Save and redeploy

---

## 7. Custom Domain (Optional)

### For Backend (Render)

1. In Render dashboard → Select service
2. Go to "Settings" → "Custom Domains"
3. Click "Add Custom Domain"
4. Enter: `api.yourdomain.com`
5. Update DNS:
   - Type: CNAME
   - Name: api
   - Value: library-booking-api.onrender.com
6. SSL certificate auto-generated

### For Frontend (Vercel)

1. In Vercel dashboard → Select project
2. Go to "Settings" → "Domains"
3. Click "Add"
4. Enter: `www.yourdomain.com`
5. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
6. SSL certificate auto-generated

---

## 8. Post-Deployment Checklist

### Backend Verification
- [ ] Health endpoint responds: `/health`
- [ ] API endpoint responds: `/api/health`
- [ ] Database connection successful
- [ ] Authentication endpoints work
- [ ] Can create and fetch libraries
- [ ] Payment endpoints respond
- [ ] No errors in Render logs

### Frontend Verification
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Images load properly
- [ ] API calls work
- [ ] Login/signup functional
- [ ] Search works
- [ ] Booking flow works
- [ ] Payment modal opens
- [ ] Mobile responsive
- [ ] No console errors

### Integration Testing
- [ ] Complete user registration
- [ ] Login works
- [ ] Browse libraries
- [ ] View library details
- [ ] Create booking
- [ ] Payment gateway opens
- [ ] Test payment (use test card)
- [ ] Booking confirmed
- [ ] View booking history

---

## 9. Monitoring & Maintenance

### Enable Notifications

**Render:**
- Go to service → Settings → Notifications
- Add email for deployment notifications

**Vercel:**
- Project → Settings → Notifications
- Enable deployment notifications

### Monitor Uptime

Use free monitoring services:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)

Setup monitors for:
- Frontend: https://your-frontend.vercel.app
- Backend: https://your-backend.onrender.com/health

### Check Logs Regularly

**Backend (Render):**
- Dashboard → Your Service → Logs tab
- Check for errors daily

**Database (MongoDB):**
- Atlas → Metrics
- Monitor connections, queries, storage

---

## 10. Troubleshooting

### Backend not starting

1. Check Render logs for errors
2. Verify environment variables are set
3. Check MongoDB connection string
4. Ensure PORT is set to 5000

### Frontend shows API errors

1. Verify VITE_API_URL is correct
2. Check CORS settings in backend
3. Ensure backend is running
4. Check browser console for errors

### Payment not working

1. Verify Razorpay keys are correct
2. Check test/live mode consistency
3. Test with Razorpay test cards
4. Check webhook configuration

### Images not uploading

1. Verify Cloudinary credentials
2. Check file size limits
3. Ensure correct folder structure
4. Check upload permissions

---

## 11. Security Best Practices

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable MongoDB IP whitelist in production
- [ ] Use HTTPS only
- [ ] Keep API keys secret
- [ ] Enable 2FA on all accounts
- [ ] Regular security updates
- [ ] Monitor for suspicious activity
- [ ] Backup database regularly

---

## 12. Scaling Considerations

### When to Upgrade

**MongoDB Atlas:**
- Upgrade from M0 when:
  - Storage > 512MB
  - Need better performance
  - Require backups

**Render:**
- Upgrade from Free when:
  - Need faster cold starts
  - Require more resources
  - Need custom domains

**Vercel:**
- Free tier usually sufficient
- Upgrade for:
  - Team collaboration
  - Advanced analytics

---

## Support

For deployment issues:
- **Email:** dipukumardevcod@gmail.com
- **Phone:** 7870655593

---

**Last Updated:** November 23, 2025
