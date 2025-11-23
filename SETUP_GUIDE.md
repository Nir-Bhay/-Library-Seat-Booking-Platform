# Setup Guide - Library Seat Booking Platform

Complete step-by-step guide to set up the project locally for development.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **MongoDB** (Choose one):
   - **Option A:** MongoDB Atlas (Cloud - Recommended)
     - Free tier available
     - No local installation needed
   - **Option B:** Local MongoDB
     - Download: https://www.mongodb.com/try/download/community
     - Start service: `mongod`

5. **Code Editor** (Recommended)
   - VS Code: https://code.visualstudio.com/
   - Extensions: ESLint, Prettier, Thunder Client

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Nir-Bhay/-Library-Seat-Booking-Platform.git
cd -Library-Seat-Booking-Platform
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected output:**
```
added 120 packages in 15s
```

### 3. Verify Installation

```bash
npm list --depth=0
```

Should show all dependencies from package.json.

---

## Configuration

### 1. Create Environment File

```bash
# In backend directory
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` file with your credentials:

```env
# Environment
NODE_ENV=development
PORT=5000

# MongoDB - Choose one option:

# Option A: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-booking?retryWrites=true&w=majority

# Option B: Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/library-booking

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
JWT_EXPIRE=7d

# Razorpay (Get from https://razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Generate Strong JWT Secret

```bash
# On Linux/Mac
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# On Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output to `JWT_SECRET` in `.env`

---

## Database Setup

### Option A: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Setup Database User**
   - Database Access → Add New User
   - Username: `libraryAdmin`
   - Password: Generate secure password
   - Privileges: Read and write to any database

4. **Setup Network Access**
   - Network Access → Add IP Address
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)

5. **Get Connection String**
   - Databases → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Add database name: `/library-booking`
   - Paste in `.env` as `MONGODB_URI`

### Option B: Local MongoDB

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # Linux/Mac
   sudo systemctl start mongod
   
   # Windows
   # MongoDB starts automatically as service
   
   # Or run manually
   mongod
   ```

3. **Verify Connection**
   ```bash
   mongosh
   # Should connect to MongoDB shell
   ```

4. **Use Local Connection String**
   ```env
   MONGODB_URI=mongodb://localhost:27017/library-booking
   ```

---

## External Services Setup

### 1. Razorpay (Payment Gateway)

1. **Create Account**
   - Go to https://razorpay.com
   - Sign up and complete registration

2. **Get Test Keys**
   - After login, ensure you're in "Test Mode"
   - Go to Settings → API Keys
   - Click "Generate Test Keys"
   - Copy Key ID and Secret to `.env`

3. **Test Cards**
   - Success: 4111 1111 1111 1111
   - Failure: 4111 1111 1111 1112
   - CVV: Any 3 digits
   - Expiry: Any future date

### 2. Cloudinary (Image Storage)

1. **Create Account**
   - Go to https://cloudinary.com
   - Sign up (free tier available)

2. **Get Credentials**
   - After login, go to Dashboard
   - Copy:
     - Cloud Name
     - API Key
     - API Secret
   - Paste in `.env`

3. **Create Upload Folder** (Optional)
   - Media Library → Create folder: `library-booking`
   - Subfolder: `libraries`

---

## Running the Application

### 1. Start Backend Server

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

**Expected output:**
```
Server running in development mode on port 5000
MongoDB Connected: cluster0-shard-00-00.mongodb.net
```

### 2. Verify Server is Running

Open browser or use curl:
```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-23T19:50:00.000Z"
}
```

### 3. Seed Test Data (Optional but Recommended)

```bash
# Create admin user
npm run seed:admin

# Create test users and sample libraries
npm run seed:test
```

**This creates:**
- Admin: admin@librarybooking.com / Admin@123456
- Librarian: librarian@test.com / Librarian@123
- User: user@test.com / User@123
- 3 sample libraries

---

## Testing

### 1. API Testing with curl

**Test Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'
```

**Test Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from response and use it:

```bash
# Replace YOUR_TOKEN with actual token
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. API Testing with Postman

See [POSTMAN_COLLECTION.md](POSTMAN_COLLECTION.md) for detailed guide.

Quick start:
1. Import collection (if provided)
2. Set environment variable: `base_url = http://localhost:5000/api`
3. Run "Register" request
4. Run "Login" request (saves token automatically)
5. Run other requests

### 3. Testing Checklist

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive testing guide.

---

## Troubleshooting

### Issue: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Verify MongoDB is running:
   ```bash
   # Check if mongod process is running
   ps aux | grep mongod  # Linux/Mac
   tasklist | findstr mongod  # Windows
   ```

2. Check connection string in `.env`
3. For Atlas: Verify IP whitelist includes your IP
4. For local: Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```

---

### Issue: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Kill process using port 5000:
   ```bash
   # Linux/Mac
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. Or change port in `.env`:
   ```env
   PORT=5001
   ```

---

### Issue: Module Not Found

**Error:** `Error: Cannot find module 'express'`

**Solutions:**
1. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Verify you're in correct directory:
   ```bash
   pwd  # Should show .../backend
   ```

---

### Issue: JWT Token Invalid

**Error:** `Error: jwt malformed` or `Error: invalid signature`

**Solutions:**
1. Check `JWT_SECRET` is set in `.env`
2. Ensure JWT_SECRET is at least 32 characters
3. Restart server after changing `.env`
4. Clear saved tokens and login again

---

### Issue: Cloudinary Upload Failed

**Error:** `Error: Invalid cloud_name`

**Solutions:**
1. Verify Cloudinary credentials in `.env`
2. Check cloud name doesn't have quotes or spaces
3. Verify API key and secret are correct
4. Test Cloudinary connection:
   ```bash
   node -e "
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
     cloud_name: 'your_cloud_name',
     api_key: 'your_api_key',
     api_secret: 'your_api_secret'
   });
   console.log('Config:', cloudinary.config());
   "
   ```

---

### Issue: Razorpay Keys Not Working

**Error:** `Error: Invalid key id or secret`

**Solutions:**
1. Verify you're using Test Mode keys for development
2. Check keys are copied correctly (no extra spaces)
3. Verify Razorpay account is active
4. Test keys at https://razorpay.com/docs/

---

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Verify `FRONTEND_URL` in `.env` matches your frontend URL
2. Check CORS configuration in `server.js`
3. For development, temporarily allow all origins:
   ```javascript
   app.use(cors({ origin: '*' }));
   ```

---

### Issue: Environment Variables Not Loading

**Solutions:**
1. Verify `.env` file exists in backend directory
2. Check file is named exactly `.env` (not `.env.txt`)
3. Restart server after changing `.env`
4. Check for syntax errors in `.env` (no quotes needed)
5. Verify dotenv is loaded in server.js:
   ```javascript
   require('dotenv').config();
   ```

---

## Development Tips

### 1. VS Code Extensions

Recommended extensions:
- **Thunder Client** - API testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **MongoDB for VS Code** - Database management
- **GitLens** - Git integration

### 2. Useful Commands

```bash
# Check Node/npm versions
node --version
npm --version

# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Update packages (be careful)
npm update

# Clear npm cache (if issues)
npm cache clean --force

# Restart with clean slate
rm -rf node_modules package-lock.json
npm install
```

### 3. Database Management

**View data in MongoDB:**
```bash
# Connect to MongoDB
mongosh "mongodb://localhost:27017/library-booking"

# Or for Atlas
mongosh "mongodb+srv://cluster.mongodb.net/library-booking" --username libraryAdmin

# Common commands
show collections
db.users.find().pretty()
db.libraries.find().pretty()
db.bookings.find().pretty()

# Count documents
db.users.countDocuments()

# Delete all data (careful!)
db.users.deleteMany({})
```

### 4. Logging

Add debug logging:
```javascript
// In any controller
console.log('Request body:', req.body);
console.log('User:', req.user);
console.log('Query params:', req.query);
```

### 5. Hot Reload

Using nodemon (already configured):
- Changes to .js files auto-restart server
- Changes to .env require manual restart

---

## Next Steps

After successful setup:

1. ✅ Test all authentication endpoints
2. ✅ Create sample libraries
3. ✅ Test booking flow
4. ✅ Test payment integration
5. ✅ Read API documentation
6. ✅ Start frontend development (when ready)

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review error logs carefully
3. Check [MAINTENANCE.md](MAINTENANCE.md)
4. Search for error messages online
5. Contact developer:
   - Email: dipukumardevcod@gmail.com
   - Phone: +91 7870655593

---

## Additional Resources

- **API Documentation:** [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Maintenance Guide:** [MAINTENANCE.md](MAINTENANCE.md)
- **Testing Checklist:** [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)
- **Postman Guide:** [POSTMAN_COLLECTION.md](POSTMAN_COLLECTION.md)

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0
