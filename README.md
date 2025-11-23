# Library Seat Booking Platform

A comprehensive web application for booking library seats with integrated payment gateway, admin panel, and librarian management system.

## 🚀 Features

### For Users
- 🔐 User registration and authentication
- 🔍 Search and filter libraries by location, price, and amenities
- 📅 Book seats for specific dates and time slots
- 💳 Secure online payment via Razorpay
- 📊 View booking history and status
- ⭐ Rate and review libraries

### For Librarians
- 📝 Register and manage library profile
- 🖼️ Upload library images
- 💺 Manage seat availability
- 📈 View bookings and revenue reports
- ⏰ Set operating hours and pricing

### For Admins
- ✅ Approve/reject library registrations
- 👥 Manage users and librarians
- 📊 View platform statistics and revenue
- 🔍 Monitor all bookings and transactions

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Razorpay Integration
- **Image Storage:** Cloudinary
- **Security:** Helmet, CORS, XSS-Clean, Rate Limiting

### Frontend
- **Framework:** React.js
- **Build Tool:** Vite
- **Routing:** React Router
- **State Management:** Context API / Redux
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

### Deployment
- **Backend:** Render.com
- **Frontend:** Vercel
- **Database:** MongoDB Atlas
- **Version Control:** Git & GitHub

## 📁 Project Structure

```
-Library-Seat-Booking-Platform/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── libraryController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Library.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── libraryRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/ (to be created)
├── CREDENTIALS.md
├── DEPLOYMENT.md
├── MAINTENANCE.md
├── API_DOCUMENTATION.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nir-Bhay/-Library-Seat-Booking-Platform.git
   cd -Library-Seat-Booking-Platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. **Run Backend**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Setup Frontend** (when available)
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Verify Installation

1. Backend health check:
   ```bash
   curl http://localhost:5000/health
   ```
   
   Should return:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

2. API health check:
   ```bash
   curl http://localhost:5000/api/health
   ```

## 📚 Documentation

- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Deployment Guide](DEPLOYMENT.md)** - Step-by-step deployment instructions
- **[Maintenance Guide](MAINTENANCE.md)** - Troubleshooting and maintenance
- **[Credentials](CREDENTIALS.md)** - Access credentials and setup info

## 🔑 Default Credentials

For testing purposes (create these manually in database):

**Admin:**
- Email: admin@librarybooking.com
- Password: Admin@123456

**Librarian:**
- Email: librarian@test.com
- Password: Librarian@123

**User:**
- Email: user@test.com
- Password: User@123

## 🧪 Testing

### Test API Endpoints

Use tools like Postman, Thunder Client, or curl:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get libraries
curl http://localhost:5000/api/libraries
```

### Razorpay Test Cards

For payment testing:
- **Success:** 4111 1111 1111 1111
- **Failure:** 4111 1111 1111 1112
- **CVV:** Any 3 digits
- **Expiry:** Any future date

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick deployment URLs:
- **Backend (Render):** https://library-booking-api.onrender.com
- **Frontend (Vercel):** https://library-booking-frontend.vercel.app

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet.js for security headers
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ MongoDB injection prevention

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Libraries
- `GET /api/libraries` - Get all approved libraries
- `GET /api/libraries/:id` - Get single library
- `POST /api/libraries` - Create library (Librarian)
- `PUT /api/libraries/:id` - Update library (Librarian)
- `DELETE /api/libraries/:id` - Delete library (Librarian/Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/webhook` - Razorpay webhook

### Admin
- `GET /api/admin/pending-libraries` - Get pending approvals
- `PUT /api/admin/approve-library/:id` - Approve library
- `PUT /api/admin/reject-library/:id` - Reject library
- `GET /api/admin/dashboard-stats` - Get statistics
- `GET /api/admin/users` - Get all users

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

**Dipu Kumar**
- Email: dipukumardevcod@gmail.com
- Phone: +91 7870655593

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render.com for backend hosting
- Vercel for frontend hosting
- Razorpay for payment gateway
- Cloudinary for image storage

## 📞 Support

For issues, questions, or support:
- Create an issue in this repository
- Email: dipukumardevcod@gmail.com
- Phone: +91 7870655593

**Support Period:** 15 days from handover

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0
