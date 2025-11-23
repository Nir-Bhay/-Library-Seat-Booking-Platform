# Postman Collection Guide

This guide helps you set up and use Postman to test the Library Booking Platform API.

---

## Quick Setup

### 1. Install Postman
- Download from [postman.com](https://www.postman.com/downloads/)
- Or use the web version

### 2. Create Environment

Create a new environment in Postman with these variables:

**Local Development:**
```
base_url: http://localhost:5000/api
token: (leave empty, will be set after login)
booking_id: (leave empty, will be set after creating booking)
library_id: (leave empty, will be set after creating library)
```

**Production:**
```
base_url: https://library-booking-api.onrender.com/api
token: (leave empty, will be set after login)
booking_id: (leave empty, will be set after creating booking)
library_id: (leave empty, will be set after creating library)
```

---

## Request Examples

### 1. Authentication

#### Register User
```
POST {{base_url}}/auth/register
Content-Type: application/json

Body:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "user"
}

Tests (Add to Tests tab):
pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
});

pm.test("Token is present", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.exist;
    pm.environment.set("token", jsonData.token);
});
```

#### Login
```
POST {{base_url}}/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Token is present", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.exist;
    pm.environment.set("token", jsonData.token);
});
```

#### Get Current User
```
GET {{base_url}}/auth/me
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("User data present", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.user).to.exist;
});
```

---

### 2. Libraries

#### Get All Libraries
```
GET {{base_url}}/libraries?city=Delhi&page=1&limit=10

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Libraries array exists", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Save first library ID", function() {
    var jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        pm.environment.set("library_id", jsonData.data[0]._id);
    }
});
```

#### Get Single Library
```
GET {{base_url}}/libraries/{{library_id}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Library data present", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.exist;
});
```

#### Create Library (Librarian Only)
```
POST {{base_url}}/libraries
Authorization: Bearer {{token}}
Content-Type: application/json

Body:
{
  "libraryName": "Central Study Hub",
  "description": "A modern library with all facilities",
  "address": {
    "street": "123 Main Street",
    "area": "Connaught Place",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001"
  },
  "contactNumber": "9876543210",
  "totalSeats": 100,
  "pricePerHour": 50,
  "pricePerDay": 400,
  "openTime": "08:00",
  "closeTime": "22:00",
  "amenities": ["wifi", "ac", "parking"]
}

Tests:
pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
});

pm.test("Library created", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data._id).to.exist;
    pm.environment.set("library_id", jsonData.data._id);
});
```

#### Update Library
```
PUT {{base_url}}/libraries/{{library_id}}
Authorization: Bearer {{token}}
Content-Type: application/json

Body:
{
  "pricePerHour": 60,
  "pricePerDay": 480
}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

---

### 3. Bookings

#### Create Booking
```
POST {{base_url}}/bookings
Authorization: Bearer {{token}}
Content-Type: application/json

Body:
{
  "library_id": "{{library_id}}",
  "bookingDate": "2025-12-01",
  "seatNumber": "A-15",
  "timeSlot": {
    "startTime": "09:00",
    "endTime": "17:00"
  },
  "totalAmount": 400
}

Tests:
pm.test("Status is 201", function() {
    pm.response.to.have.status(201);
});

pm.test("Booking created", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data._id).to.exist;
    pm.environment.set("booking_id", jsonData.data._id);
});
```

#### Get My Bookings
```
GET {{base_url}}/bookings/my-bookings?page=1&limit=10
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Bookings array exists", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});
```

#### Get Single Booking
```
GET {{base_url}}/bookings/{{booking_id}}
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

#### Cancel Booking
```
PUT {{base_url}}/bookings/{{booking_id}}/cancel
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Booking cancelled", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.bookingStatus).to.equal('cancelled');
});
```

---

### 4. Payments

#### Create Order
```
POST {{base_url}}/payment/create-order
Authorization: Bearer {{token}}
Content-Type: application/json

Body:
{
  "bookingId": "{{booking_id}}",
  "amount": 400
}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Order created", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.order.id).to.exist;
    pm.environment.set("order_id", jsonData.order.id);
});
```

#### Verify Payment
```
POST {{base_url}}/payment/verify
Authorization: Bearer {{token}}
Content-Type: application/json

Body:
{
  "razorpay_order_id": "{{order_id}}",
  "razorpay_payment_id": "pay_test123",
  "razorpay_signature": "test_signature",
  "bookingId": "{{booking_id}}"
}

Note: In production, these values come from Razorpay after actual payment.
For testing, signature verification will fail unless you use actual Razorpay response.
```

---

### 5. Admin

#### Get Pending Libraries
```
GET {{base_url}}/admin/pending-libraries
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

#### Approve Library
```
PUT {{base_url}}/admin/approve-library/{{library_id}}
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Library approved", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.isApproved).to.be.true;
});
```

#### Get Dashboard Stats
```
GET {{base_url}}/admin/dashboard-stats
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Stats present", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.totalUsers).to.exist;
});
```

#### Get All Users
```
GET {{base_url}}/admin/users?page=1&limit=10
Authorization: Bearer {{token}}

Tests:
pm.test("Status is 200", function() {
    pm.response.to.have.status(200);
});
```

---

## Complete Test Flow

Run requests in this order for a complete flow:

1. **Register User** (role: "user")
2. **Login** (saves token)
3. **Get Current User**
4. **Register Librarian** (role: "librarian", different email)
5. **Login as Librarian** (saves new token)
6. **Create Library** (saves library_id)
7. **Register Admin** (role: "admin", different email)
8. **Login as Admin** (saves admin token)
9. **Approve Library**
10. **Login as User** (back to user token)
11. **Get All Libraries**
12. **Get Single Library**
13. **Create Booking** (saves booking_id)
14. **Create Payment Order**
15. **Get My Bookings**
16. **Get Single Booking**

---

## Pre-Request Scripts

### Auto-refresh Token (if implementing refresh tokens)
```javascript
// Add to Collection Pre-request Script
const tokenExpiry = pm.environment.get("token_expiry");
const currentTime = new Date().getTime();

if (!tokenExpiry || currentTime > tokenExpiry) {
    // Refresh token logic here
}
```

### Dynamic Date Generation
```javascript
// For booking date - tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const bookingDate = tomorrow.toISOString().split('T')[0];
pm.environment.set("booking_date", bookingDate);
```

---

## Common Tests

Add these to your collection-level tests:

```javascript
// Response time check
pm.test("Response time is less than 2000ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Content-Type check
pm.test("Content-Type is JSON", function() {
    pm.response.to.have.header("Content-Type", /json/);
});

// Success response structure
pm.test("Response has success field", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
});
```

---

## Error Testing

### Test 401 Unauthorized
```
GET {{base_url}}/auth/me
// Don't include Authorization header

Tests:
pm.test("Status is 401", function() {
    pm.response.to.have.status(401);
});
```

### Test 403 Forbidden
```
GET {{base_url}}/admin/users
Authorization: Bearer {{user_token}}
// Use regular user token for admin endpoint

Tests:
pm.test("Status is 403", function() {
    pm.response.to.have.status(403);
});
```

### Test 404 Not Found
```
GET {{base_url}}/libraries/invalid_id

Tests:
pm.test("Status is 404 or 500", function() {
    pm.expect([404, 500]).to.include(pm.response.code);
});
```

---

## Collection Variables

Set these at collection level:

```
Content-Type: application/json (for all requests)
```

---

## Tips

1. **Organize in Folders:**
   - Auth
   - Libraries
   - Bookings
   - Payments
   - Admin

2. **Use Variables:**
   - Avoid hardcoding URLs
   - Use environment variables
   - Save IDs from responses

3. **Write Tests:**
   - Verify status codes
   - Check response structure
   - Save data for next requests

4. **Use Pre-request Scripts:**
   - Generate dynamic data
   - Refresh tokens
   - Set timestamps

5. **Documentation:**
   - Add descriptions to requests
   - Include example responses
   - Document expected behavior

---

## Export & Share

1. Export collection: `Collections → ... → Export`
2. Export environment: `Environments → ... → Export`
3. Share with team or save as backup

---

**Last Updated:** November 23, 2025
