# Library Booking Platform - Access Credentials

## Production URLs
- **Frontend:** https://library-booking-frontend.vercel.app
- **Backend API:** https://library-booking-api.onrender.com
- **Database:** MongoDB Atlas

---

## Admin Access
- **Email:** admin@librarybooking.com
- **Password:** Admin@123456
- **Role:** admin

---

## Test Librarian Account
- **Email:** librarian@test.com
- **Password:** Librarian@123
- **Role:** librarian

---

## Test User Account
- **Email:** user@test.com
- **Password:** User@123
- **Role:** user

---

## Database
- **Platform:** MongoDB Atlas
- **Connection String:** mongodb+srv://libraryAdmin:PASSWORD@cluster.mongodb.net/library-booking
- **Dashboard:** https://cloud.mongodb.com

### MongoDB Atlas Setup Instructions:
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create New Project → "Library Booking"
4. Build a Cluster → Choose FREE tier (M0)
5. Cloud Provider: AWS
6. Region: Mumbai (ap-south-1) - closest to India
7. Cluster Name: library-booking-cluster
8. Create Cluster (takes 3-5 minutes)
9. Database Access → Add New Database User
   - Username: libraryAdmin
   - Password: Generate secure password
   - Database User Privileges: Read and write to any database
10. Network Access → Add IP Address
    - Allow Access From Anywhere: 0.0.0.0/0
    - (For production, restrict to your server IP only)
11. Connect → Connect Your Application
    - Driver: Node.js
    - Copy Connection String and update .env

---

## Razorpay
- **Dashboard:** https://dashboard.razorpay.com
- **Mode:** Test Mode (switch to Live after KYC)
- **Test Key ID:** rzp_test_xxxxxxxxxxxxx
- **Test Secret:** xxxxxxxxxxxxx

**Test Cards:**
- Success: 4111 1111 1111 1111
- Failure: 4111 1111 1111 1112

### Razorpay Setup Instructions:
1. Go to https://razorpay.com
2. Sign up and complete registration
3. Complete KYC verification (required for live mode)
4. Settings → API Keys → Generate Test Keys
5. For production: Generate Live Keys after KYC approval
6. Optional: Configure Webhooks for payment notifications

---

## Cloudinary
- **Dashboard:** https://cloudinary.com/console
- **Cloud Name:** your_cloud_name
- **API Key:** xxxxxxxxxxxxx
- **API Secret:** xxxxxxxxxxxxx

### Cloudinary Setup Instructions:
1. Go to https://cloudinary.com
2. Sign up for free
3. After login, go to Dashboard
4. Copy Cloud Name, API Key, and API Secret
5. Update these values in backend .env file

---

## GitHub Repositories
- **Frontend:** https://github.com/Nir-Bhay/library-booking-frontend
- **Backend:** https://github.com/Nir-Bhay/library-booking-backend

---

## Hosting Platforms
- **Frontend (Vercel):** https://vercel.com/dashboard
- **Backend (Render):** https://dashboard.render.com

### Backend Deployment on Render:
1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect repository: library-booking-backend
5. Configure:
   - Name: library-booking-api
   - Environment: Node
   - Region: Singapore (closest to India)
   - Branch: main
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
6. Add all environment variables from .env
7. Create Web Service

### Frontend Deployment on Vercel:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import Project
4. Select library-booking-frontend repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
6. Add environment variables
7. Deploy

---

## Important Notes
1. ⚠️ Change all default passwords after handover
2. 🔐 Enable 2FA on all accounts
3. 💳 Switch Razorpay to Live mode after KYC
4. 🔒 Restrict MongoDB IP whitelist in production
5. 📧 Set up email notifications (optional)
6. 🌐 Configure custom domain if client has one
7. 🔑 Keep all API keys and secrets secure
8. 📊 Monitor usage and costs on all platforms

---

## Emergency Contacts
- **Developer:** Dipu Kumar
- **Phone:** 7870655593
- **Email:** dipukumardevcod@gmail.com

---

## Support Period
- **Duration:** 15 days from handover
- **Includes:** Bug fixes, minor adjustments, deployment support
- **Excludes:** New features, major changes

---

**Last Updated:** November 23, 2025
