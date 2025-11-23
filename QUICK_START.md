# Quick Start Guide

Get the Library Seat Booking Platform up and running in 10 minutes!

---

## ⚡ Fast Track Setup

### 1. Install Prerequisites (5 min)

```bash
# Check if Node.js is installed (need v18+)
node --version

# If not installed, download from:
# https://nodejs.org/
```

### 2. Clone & Install (2 min)

```bash
# Clone repository
git clone https://github.com/Nir-Bhay/-Library-Seat-Booking-Platform.git
cd -Library-Seat-Booking-Platform/backend

# Install dependencies
npm install
```

### 3. Configure Environment (2 min)

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with minimal config:
nano .env  # or use any text editor
```

**Minimal `.env` for quick testing:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library-booking
JWT_SECRET=quick-test-secret-key-change-in-production-minimum-32-chars
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Note:** This uses local MongoDB. For production, use MongoDB Atlas.

### 4. Start MongoDB (1 min)

**Option A - Local MongoDB:**
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows - MongoDB service starts automatically
# Or run: mongod
```

**Option B - MongoDB Atlas (Recommended for production):**
- Sign up at https://mongodb.com/cloud/atlas (free tier)
- Get connection string
- Update `MONGODB_URI` in `.env`

### 5. Run Server (30 sec)

```bash
# Start development server
npm run dev
```

**Expected output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### 6. Seed Test Data (30 sec)

```bash
# In a new terminal
npm run seed:test
```

**This creates:**
- 👤 User: `user@test.com` / `User@123`
- 👨‍💼 Librarian: `librarian@test.com` / `Librarian@123`
- 👑 Admin: `admin@librarybooking.com` / `Admin@123456`
- 📚 3 sample libraries

### 7. Test API (30 sec)

```bash
# Test health endpoint
curl http://localhost:5000/health

# Or open in browser:
# http://localhost:5000/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## ✅ You're Ready!

Your backend is now running at: **http://localhost:5000**

---

## 🚀 Quick Test Flow

### Test with curl:

**1. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"User@123"}'
```

**2. Copy the token from response**

**3. Get libraries:**
```bash
curl http://localhost:5000/api/libraries
```

**4. Get current user:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📱 Test with Postman

1. **Import Collection** (if provided) or create new requests
2. **Set Environment:**
   - Variable: `base_url`
   - Value: `http://localhost:5000/api`
3. **Run Login Request** to get token
4. **Test Other Endpoints**

---

## 🎯 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| User | user@test.com | User@123 |
| Librarian | librarian@test.com | Librarian@123 |
| Admin | admin@librarybooking.com | Admin@123456 |

---

## 📚 Sample Data

After seeding, you'll have:

**Libraries:**
1. Central Library Delhi (Connaught Place)
2. Study Hub Mumbai (Andheri West)
3. Knowledge Center Bangalore (Koramangala)

All libraries are **pre-approved** and ready for booking!

---

## 🔧 Common Issues

### MongoDB Connection Failed?

```bash
# Check if MongoDB is running
ps aux | grep mongod  # Linux/Mac
tasklist | findstr mongod  # Windows

# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
# Windows: Service starts automatically
```

### Port 5000 Already in Use?

```bash
# Change port in .env
PORT=5001

# Or kill process using port 5000
lsof -ti:5000 | xargs kill -9  # Linux/Mac
```

### Module Not Found?

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 Next Steps

Now that backend is running:

### For Development:
1. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
2. ✅ Test all endpoints with Postman
3. ✅ Review [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)
4. ✅ Start building frontend

### For Production:
1. ✅ Set up MongoDB Atlas
2. ✅ Configure Razorpay (for payments)
3. ✅ Configure Cloudinary (for images)
4. ✅ Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📦 Project Structure

```
backend/
├── config/          # Database & Cloudinary config
├── controllers/     # Request handlers
├── middleware/      # Auth & error handling
├── models/          # Database schemas
├── routes/          # API endpoints
├── utils/           # Helper functions & seeders
├── .env.example     # Environment template
├── .gitignore       # Git ignore rules
├── package.json     # Dependencies
└── server.js        # Main server file
```

---

## 🔑 Environment Variables Explained

**Essential:**
```env
MONGODB_URI          # Database connection
JWT_SECRET          # Authentication secret (32+ chars)
PORT                # Server port (default: 5000)
```

**For Full Features:**
```env
RAZORPAY_KEY_ID     # Payment gateway (get from razorpay.com)
RAZORPAY_KEY_SECRET # Payment secret
CLOUDINARY_*        # Image storage (get from cloudinary.com)
```

**Optional:**
```env
SMTP_*              # Email notifications
FRONTEND_URL        # CORS configuration
```

---

## 🎨 API Endpoints Overview

**Authentication:**
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get profile

**Libraries:**
- `GET /api/libraries` - Browse libraries
- `GET /api/libraries/:id` - View details
- `POST /api/libraries` - Create (Librarian)

**Bookings:**
- `POST /api/bookings` - Book seat
- `GET /api/bookings/my-bookings` - View bookings

**Payments:**
- `POST /api/payment/create-order` - Start payment
- `POST /api/payment/verify` - Confirm payment

**Admin:**
- `GET /api/admin/dashboard-stats` - Statistics
- `PUT /api/admin/approve-library/:id` - Approve library

---

## 💡 Pro Tips

1. **Use nodemon** - Already configured! Changes auto-restart server
2. **Check logs** - Console shows all requests and errors
3. **Use Postman** - Easier than curl for complex requests
4. **Seed data** - Always start with test data
5. **Read docs** - Comprehensive guides in repository

---

## 📞 Need Help?

**Documentation:**
- [Full Setup Guide](SETUP_GUIDE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Maintenance Guide](MAINTENANCE.md)

**Support:**
- Email: dipukumardevcod@gmail.com
- Phone: +91 7870655593

---

## ⭐ Features Checklist

After quick start, your backend supports:

- ✅ User registration & authentication
- ✅ JWT token-based security
- ✅ Library CRUD operations
- ✅ Booking system
- ✅ Payment integration (Razorpay)
- ✅ Admin panel
- ✅ Role-based access control
- ✅ Image upload (Cloudinary)
- ✅ Search & filtering
- ✅ Pagination
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS protection
- ✅ XSS protection

---

## 🚀 Production Deployment

When ready to deploy:

1. **Follow [DEPLOYMENT.md](DEPLOYMENT.md)**
2. **Set up MongoDB Atlas** (free tier)
3. **Deploy to Render** (free tier)
4. **Configure Razorpay** (test mode free)
5. **Setup Cloudinary** (free tier)

**Total Cost: ₹0** (using free tiers)

---

**Ready to code? Start the server and build something amazing! 🎉**

**Last Updated:** November 23, 2025
