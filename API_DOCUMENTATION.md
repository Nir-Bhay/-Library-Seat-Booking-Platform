# Library Booking Platform - API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://library-booking-api.onrender.com/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User

**Endpoint:** `POST /auth/register`

**Description:** Register a new user

**Access:** Public

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation Rules:**
- fullName: Required, string
- email: Required, valid email format, unique
- phone: Required, 10 digits
- password: Required, minimum 6 characters
- role: Optional, enum: ['user', 'librarian', 'admin'], default: 'user'

---

### Login User

**Endpoint:** `POST /auth/login`

**Description:** Login user and get JWT token

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get current logged-in user details

**Access:** Private (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-11-20T10:00:00Z"
  }
}
```

---

## Library Endpoints

### Get All Libraries

**Endpoint:** `GET /libraries`

**Description:** Get all approved libraries with optional filters

**Access:** Public

**Query Parameters:**
```
?city=Delhi
&area=Connaught Place
&minPrice=50
&maxPrice=200
&amenities=wifi,ac,parking
&page=1
&limit=10
&sort=-averageRating
```

**Available Filters:**
- `city`: Filter by city name (case-insensitive)
- `area`: Filter by area name (case-insensitive)
- `minPrice`: Minimum price per hour
- `maxPrice`: Maximum price per hour
- `amenities`: Comma-separated list of amenities
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)
- `sort`: Sort field (prefix with - for descending)

**Sort Options:**
- `averageRating`, `-averageRating`
- `pricePerHour`, `-pricePerHour`
- `createdAt`, `-createdAt`
- `libraryName`, `-libraryName`

**Response (200):**
```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  },
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "libraryName": "Central Library",
      "description": "Modern library with all amenities",
      "address": {
        "area": "Connaught Place",
        "city": "Delhi",
        "pincode": "110001"
      },
      "coverImage": "https://res.cloudinary.com/...",
      "pricePerHour": 100,
      "pricePerDay": 800,
      "averageRating": 4.5,
      "totalSeats": 50,
      "availableSeats": 23,
      "amenities": ["wifi", "ac", "parking"],
      "openTime": "08:00",
      "closeTime": "22:00"
    }
  ]
}
```

---

### Get Single Library

**Endpoint:** `GET /libraries/:id`

**Description:** Get detailed information about a specific library

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "libraryName": "Central Library",
    "description": "Modern library with all amenities",
    "librarian_id": {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "fullName": "Jane Smith",
      "email": "jane@example.com"
    },
    "address": {
      "street": "123 Main Street",
      "area": "Connaught Place",
      "city": "Delhi",
      "state": "Delhi",
      "pincode": "110001"
    },
    "contactNumber": "9876543210",
    "coverImage": "https://res.cloudinary.com/image1.jpg",
    "images": [
      "https://res.cloudinary.com/image1.jpg",
      "https://res.cloudinary.com/image2.jpg"
    ],
    "totalSeats": 50,
    "availableSeats": 23,
    "pricePerHour": 100,
    "pricePerDay": 800,
    "openTime": "08:00",
    "closeTime": "22:00",
    "amenities": ["wifi", "ac", "parking", "cafeteria"],
    "isApproved": true,
    "averageRating": 4.5,
    "totalReviews": 120,
    "createdAt": "2025-11-20T10:00:00Z"
  }
}
```

---

### Create Library

**Endpoint:** `POST /libraries`

**Description:** Create a new library (requires librarian role)

**Access:** Private (Librarian/Admin)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
libraryName: Central Library
description: Modern library with all amenities
street: 123 Main Street
area: Connaught Place
city: Delhi
state: Delhi
pincode: 110001
contactNumber: 9876543210
totalSeats: 50
pricePerHour: 100
pricePerDay: 800
openTime: 08:00
closeTime: 22:00
images: [file1, file2, file3]
amenities: ["wifi", "ac", "parking"]
```

**Response (201):**
```json
{
  "success": true,
  "message": "Library submitted for approval",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "libraryName": "Central Library",
    "isApproved": false,
    "createdAt": "2025-11-23T19:50:00Z"
  }
}
```

---

### Update Library

**Endpoint:** `PUT /libraries/:id`

**Description:** Update library details

**Access:** Private (Librarian - owner only, or Admin)

**Request Body:**
```json
{
  "pricePerHour": 120,
  "pricePerDay": 900,
  "amenities": ["wifi", "ac", "parking", "locker"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "libraryName": "Central Library",
    "pricePerHour": 120,
    "pricePerDay": 900
  }
}
```

---

### Delete Library

**Endpoint:** `DELETE /libraries/:id`

**Description:** Delete a library

**Access:** Private (Librarian - owner only, or Admin)

**Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

---

## Booking Endpoints

### Create Booking

**Endpoint:** `POST /bookings`

**Description:** Create a new booking

**Access:** Private (authenticated users)

**Request Body:**
```json
{
  "library_id": "60d5ec49f1b2c72b8c8e4f1a",
  "bookingDate": "2025-12-01",
  "seatNumber": "A-15",
  "timeSlot": {
    "startTime": "09:00",
    "endTime": "17:00"
  },
  "totalAmount": 800
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created. Proceed to payment",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "bookingId": "BK-20251201-12345",
    "user_id": "60d5ec49f1b2c72b8c8e4f1a",
    "library_id": "60d5ec49f1b2c72b8c8e4f1b",
    "bookingDate": "2025-12-01",
    "seatNumber": "A-15",
    "timeSlot": {
      "startTime": "09:00",
      "endTime": "17:00"
    },
    "totalAmount": 800,
    "paymentStatus": "pending",
    "bookingStatus": "pending",
    "createdAt": "2025-11-23T19:50:00Z"
  }
}
```

**Error Responses:**

Seat already booked (409):
```json
{
  "success": false,
  "error": "This seat is already booked for the selected date"
}
```

Library not found (404):
```json
{
  "success": false,
  "error": "Library not found"
}
```

---

### Get User's Bookings

**Endpoint:** `GET /bookings/my-bookings`

**Description:** Get all bookings for the logged-in user

**Access:** Private

**Query Parameters:**
```
?status=confirmed
&page=1
&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  },
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1c",
      "bookingId": "BK-20251201-12345",
      "library_id": {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "libraryName": "Central Library",
        "address": {
          "city": "Delhi",
          "area": "CP"
        },
        "coverImage": "https://..."
      },
      "bookingDate": "2025-12-01",
      "seatNumber": "A-15",
      "totalAmount": 800,
      "paymentStatus": "paid",
      "bookingStatus": "confirmed",
      "createdAt": "2025-11-23T10:30:00Z"
    }
  ]
}
```

---

### Get Single Booking

**Endpoint:** `GET /bookings/:id`

**Description:** Get detailed information about a specific booking

**Access:** Private (booking owner or admin)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "bookingId": "BK-20251201-12345",
    "user_id": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    "library_id": {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "libraryName": "Central Library",
      "address": {
        "city": "Delhi",
        "area": "CP"
      },
      "contactNumber": "9876543210"
    },
    "bookingDate": "2025-12-01",
    "seatNumber": "A-15",
    "timeSlot": {
      "startTime": "09:00",
      "endTime": "17:00"
    },
    "totalAmount": 800,
    "paymentStatus": "paid",
    "paymentId": "pay_xxxxxxxxx",
    "orderId": "order_xxxxxxxxx",
    "bookingStatus": "confirmed",
    "createdAt": "2025-11-23T10:30:00Z",
    "confirmedAt": "2025-11-23T10:35:00Z"
  }
}
```

---

### Cancel Booking

**Endpoint:** `PUT /bookings/:id/cancel`

**Description:** Cancel a booking

**Access:** Private (booking owner only)

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "bookingStatus": "cancelled"
  }
}
```

---

## Payment Endpoints

### Create Razorpay Order

**Endpoint:** `POST /payment/create-order`

**Description:** Create a Razorpay order for payment

**Access:** Private

**Request Body:**
```json
{
  "bookingId": "60d5ec49f1b2c72b8c8e4f1c",
  "amount": 800
}
```

**Response (200):**
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxxxxxx",
    "entity": "order",
    "amount": 80000,
    "currency": "INR",
    "receipt": "booking_60d5ec49f1b2c72b8c8e4f1c"
  }
}
```

---

### Verify Payment

**Endpoint:** `POST /payment/verify`

**Description:** Verify Razorpay payment signature

**Access:** Private

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxx",
  "razorpay_signature": "signature_string",
  "bookingId": "60d5ec49f1b2c72b8c8e4f1c"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "booking": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "bookingStatus": "confirmed",
    "paymentStatus": "paid",
    "paymentId": "pay_xxxxxxxxx"
  }
}
```

---

### Payment Webhook

**Endpoint:** `POST /payment/webhook`

**Description:** Handle Razorpay webhook events

**Access:** Public (verified by signature)

**Headers:**
```
x-razorpay-signature: <signature>
```

---

## Admin Endpoints

### Get Pending Libraries

**Endpoint:** `GET /admin/pending-libraries`

**Description:** Get all libraries awaiting approval

**Access:** Private (Admin only)

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "libraryName": "New Library",
      "librarian_id": {
        "_id": "60d5ec49f1b2c72b8c8e4f1b",
        "fullName": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210"
      },
      "address": {
        "city": "Delhi",
        "area": "CP"
      },
      "isApproved": false,
      "createdAt": "2025-11-20T10:00:00Z"
    }
  ]
}
```

---

### Approve Library

**Endpoint:** `PUT /admin/approve-library/:id`

**Description:** Approve a pending library

**Access:** Private (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Library approved successfully",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "libraryName": "New Library",
    "isApproved": true,
    "approvedAt": "2025-11-23T19:50:00Z"
  }
}
```

---

### Reject Library

**Endpoint:** `PUT /admin/reject-library/:id`

**Description:** Reject and delete a pending library

**Access:** Private (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Library rejected and removed",
  "data": {}
}
```

---

### Get Dashboard Statistics

**Endpoint:** `GET /admin/dashboard-stats`

**Description:** Get admin dashboard statistics

**Access:** Private (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalLibrarians": 45,
    "totalLibraries": 38,
    "totalBookings": 5678,
    "totalRevenue": 456780,
    "platformCommission": 45678,
    "pendingApprovals": 3,
    "recentBookings": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4f1c",
        "bookingId": "BK-20251201-12345",
        "user_id": {
          "fullName": "John Doe",
          "email": "john@example.com"
        },
        "library_id": {
          "libraryName": "Central Library"
        },
        "totalAmount": 800,
        "bookingStatus": "confirmed",
        "createdAt": "2025-11-23T10:30:00Z"
      }
    ],
    "topLibraries": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "bookingCount": 156
      }
    ]
  }
}
```

---

### Get All Users

**Endpoint:** `GET /admin/users`

**Description:** Get all users with pagination and filtering

**Access:** Private (Admin only)

**Query Parameters:**
```
?page=1
&limit=10
&role=user
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1250
  },
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-11-20T10:00:00Z"
    }
  ]
}
```

---

## Error Handling

All errors follow this structure:

```json
{
  "success": false,
  "error": "Error message here",
  "statusCode": 400
}
```

### Common Error Codes

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Not logged in |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate entry |
| 500 | Server Error - Something went wrong |

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** Response includes rate limit information
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets

---

## Testing

### Using Postman

1. Import the collection (if provided)
2. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: Your JWT token after login

### Example Request Flow

1. **Register/Login:**
   ```
   POST /auth/register or /auth/login
   ```
   Save the token from response

2. **Get Libraries:**
   ```
   GET /libraries?city=Delhi
   ```

3. **Create Booking:**
   ```
   POST /bookings
   Headers: Authorization: Bearer <token>
   ```

4. **Create Payment Order:**
   ```
   POST /payment/create-order
   Headers: Authorization: Bearer <token>
   ```

5. **Verify Payment:**
   ```
   POST /payment/verify
   Headers: Authorization: Bearer <token>
   ```

---

## Health Check

**Endpoint:** `GET /health` or `GET /api/health`

**Description:** Check if API is running

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-11-23T19:50:00Z"
}
```

---

**Version:** 1.0.0  
**Last Updated:** November 23, 2025
