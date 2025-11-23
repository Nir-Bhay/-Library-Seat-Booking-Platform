# Testing Checklist

Use this checklist to verify all features are working correctly before and after deployment.

---

## Backend Testing

### Health & Status
- [ ] GET `/health` - Returns success response
- [ ] GET `/api/health` - Returns success response
- [ ] Database connection successful
- [ ] Server starts without errors

### Authentication Endpoints

#### Register
- [ ] POST `/api/auth/register` with valid data - Success (201)
- [ ] Duplicate email registration - Error (400)
- [ ] Missing required fields - Error (400)
- [ ] Invalid email format - Error (400)
- [ ] Invalid phone format - Error (400)
- [ ] Password too short - Error (400)
- [ ] JWT token returned in response
- [ ] Password is hashed in database

#### Login
- [ ] POST `/api/auth/login` with valid credentials - Success (200)
- [ ] Wrong password - Error (401)
- [ ] Non-existent email - Error (401)
- [ ] Missing email or password - Error (400)
- [ ] JWT token returned in response

#### Get Current User
- [ ] GET `/api/auth/me` with valid token - Success (200)
- [ ] Without token - Error (401)
- [ ] With invalid token - Error (401)
- [ ] With expired token - Error (401)

---

### Library Endpoints

#### Get All Libraries
- [ ] GET `/api/libraries` - Returns approved libraries only
- [ ] Filter by city works
- [ ] Filter by area works
- [ ] Filter by price range works
- [ ] Filter by amenities works
- [ ] Pagination works correctly
- [ ] Sorting works (by rating, price, etc.)
- [ ] Empty results handled gracefully

#### Get Single Library
- [ ] GET `/api/libraries/:id` with valid ID - Success (200)
- [ ] With invalid ID - Error (404)
- [ ] Returns complete library details
- [ ] Librarian info populated

#### Create Library
- [ ] POST `/api/libraries` as librarian - Success (201)
- [ ] Without authentication - Error (401)
- [ ] As regular user - Error (403)
- [ ] With missing fields - Error (400)
- [ ] With invalid data - Error (400)
- [ ] Library set to unapproved by default
- [ ] Librarian ID automatically set

#### Update Library
- [ ] PUT `/api/libraries/:id` as owner - Success (200)
- [ ] As different librarian - Error (403)
- [ ] As admin - Success (200)
- [ ] Without authentication - Error (401)
- [ ] Updates are saved correctly

#### Delete Library
- [ ] DELETE `/api/libraries/:id` as owner - Success (200)
- [ ] As different librarian - Error (403)
- [ ] As admin - Success (200)
- [ ] Without authentication - Error (401)

---

### Booking Endpoints

#### Create Booking
- [ ] POST `/api/bookings` with valid data - Success (201)
- [ ] Without authentication - Error (401)
- [ ] For non-existent library - Error (404)
- [ ] For unapproved library - Error (400)
- [ ] For already booked seat - Error (409)
- [ ] Booking ID auto-generated
- [ ] Default status is 'pending'

#### Get User Bookings
- [ ] GET `/api/bookings/my-bookings` - Returns user's bookings
- [ ] Without authentication - Error (401)
- [ ] Filter by status works
- [ ] Pagination works
- [ ] Library details populated
- [ ] Shows only logged-in user's bookings

#### Get Single Booking
- [ ] GET `/api/bookings/:id` as owner - Success (200)
- [ ] As different user - Error (403)
- [ ] As admin - Success (200)
- [ ] Without authentication - Error (401)
- [ ] With invalid ID - Error (404)

#### Cancel Booking
- [ ] PUT `/api/bookings/:id/cancel` as owner - Success (200)
- [ ] As different user - Error (403)
- [ ] Already completed booking - Error (400)
- [ ] Status updated to 'cancelled'

---

### Payment Endpoints

#### Create Order
- [ ] POST `/api/payment/create-order` with valid booking - Success (200)
- [ ] Without authentication - Error (401)
- [ ] For non-existent booking - Error (404)
- [ ] For someone else's booking - Error (403)
- [ ] For already paid booking - Error (400)
- [ ] Razorpay order created
- [ ] Order ID saved in booking

#### Verify Payment
- [ ] POST `/api/payment/verify` with valid signature - Success (200)
- [ ] With invalid signature - Error (400)
- [ ] Booking status updated to 'confirmed'
- [ ] Payment status updated to 'paid'
- [ ] Payment ID saved

---

### Admin Endpoints

#### Get Pending Libraries
- [ ] GET `/api/admin/pending-libraries` as admin - Success (200)
- [ ] As non-admin - Error (403)
- [ ] Returns only unapproved libraries
- [ ] Librarian info populated

#### Approve Library
- [ ] PUT `/api/admin/approve-library/:id` as admin - Success (200)
- [ ] As non-admin - Error (403)
- [ ] Library approval status updated
- [ ] Approved date set

#### Reject Library
- [ ] PUT `/api/admin/reject-library/:id` as admin - Success (200)
- [ ] As non-admin - Error (403)
- [ ] Library deleted from database

#### Dashboard Stats
- [ ] GET `/api/admin/dashboard-stats` as admin - Success (200)
- [ ] As non-admin - Error (403)
- [ ] Returns correct counts
- [ ] Revenue calculated correctly
- [ ] Recent bookings populated
- [ ] Top libraries data correct

#### Get All Users
- [ ] GET `/api/admin/users` as admin - Success (200)
- [ ] As non-admin - Error (403)
- [ ] Pagination works
- [ ] Filter by role works
- [ ] Password not included in response

---

## Security Testing

### Authentication & Authorization
- [ ] JWT tokens expire after set time
- [ ] Invalid tokens rejected
- [ ] Protected routes require authentication
- [ ] Role-based access control works
- [ ] Users can only access their own resources
- [ ] Admin can access all resources

### Data Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] Invalid data types rejected
- [ ] Required fields enforced
- [ ] Email validation works
- [ ] Phone validation works

### Rate Limiting
- [ ] Rate limit enforced (100 req/15 min)
- [ ] Rate limit headers present
- [ ] Exceeding limit returns 429

### CORS
- [ ] CORS headers present
- [ ] Only allowed origins accepted
- [ ] Credentials allowed for authorized origins

---

## Integration Testing

### Complete User Flow
- [ ] Register new user
- [ ] Login and receive token
- [ ] Browse libraries
- [ ] View library details
- [ ] Create booking
- [ ] Create payment order
- [ ] Simulate payment
- [ ] Verify payment
- [ ] View booking confirmation
- [ ] View booking history

### Complete Librarian Flow
- [ ] Register as librarian
- [ ] Login
- [ ] Create library listing
- [ ] Verify library pending approval
- [ ] Admin approves library
- [ ] Library visible in public listing
- [ ] Receive booking notification
- [ ] View booking details

### Complete Admin Flow
- [ ] Login as admin
- [ ] View dashboard stats
- [ ] View pending libraries
- [ ] Approve library
- [ ] View all users
- [ ] View all bookings
- [ ] Generate reports

---

## Frontend Testing (When Available)

### General
- [ ] Website loads without errors
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No console errors
- [ ] Loading states shown
- [ ] Error messages displayed

### User Interface
- [ ] Forms validate input
- [ ] Submit buttons disabled during API calls
- [ ] Success messages shown
- [ ] Error messages shown
- [ ] Images load correctly
- [ ] Icons display properly
- [ ] Colors consistent
- [ ] Typography readable

### Authentication
- [ ] Registration form works
- [ ] Login form works
- [ ] Logout works
- [ ] Token persisted in localStorage
- [ ] Protected routes redirect to login
- [ ] User data displayed correctly

### Library Features
- [ ] Libraries display in grid/list
- [ ] Search works
- [ ] Filters work
- [ ] Sorting works
- [ ] Pagination works
- [ ] Library details page loads
- [ ] Images display in gallery

### Booking & Payment
- [ ] Seat selection works
- [ ] Date picker works
- [ ] Time slot selection works
- [ ] Booking form validates
- [ ] Razorpay modal opens
- [ ] Test payment succeeds
- [ ] Confirmation page shows
- [ ] Booking appears in history

---

## Payment Testing

### Razorpay Integration
- [ ] Payment gateway initializes
- [ ] Correct amount displayed
- [ ] Currency is INR
- [ ] Test mode works

### Test Cards
- [ ] Success card (4111 1111 1111 1111) - Payment succeeds
- [ ] Failure card (4111 1111 1111 1112) - Payment fails
- [ ] CVV validation works
- [ ] Expiry date validation works

### Payment Flow
- [ ] Order created successfully
- [ ] Payment modal opens
- [ ] Payment processed
- [ ] Signature verified
- [ ] Booking confirmed
- [ ] Payment details saved
- [ ] Receipt generated

---

## Performance Testing

### API Performance
- [ ] Endpoints respond within 2 seconds
- [ ] Database queries optimized
- [ ] Indexes created for frequent queries
- [ ] Pagination limits enforced

### Database
- [ ] Connection pool configured
- [ ] Queries use indexes
- [ ] No N+1 query problems
- [ ] Data properly normalized

---

## Deployment Testing

### Pre-Deployment
- [ ] Environment variables set
- [ ] Database connection string correct
- [ ] API keys configured
- [ ] CORS origins updated
- [ ] Build completes without errors
- [ ] No sensitive data in code

### Post-Deployment
- [ ] Production URL accessible
- [ ] Health endpoints respond
- [ ] Database connection works
- [ ] Authentication works
- [ ] API calls succeed
- [ ] Images upload to Cloudinary
- [ ] Payments work with live keys
- [ ] SSL certificate active
- [ ] No CORS errors
- [ ] Logs accessible

---

## Monitoring

### Ongoing Checks
- [ ] Error logs reviewed daily
- [ ] Performance metrics checked
- [ ] Uptime monitored
- [ ] Database usage tracked
- [ ] API usage tracked
- [ ] Payment transactions monitored

---

## Final Checklist

Before going live:
- [ ] All backend tests passed
- [ ] All frontend tests passed
- [ ] Integration tests passed
- [ ] Security tests passed
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Admin account created
- [ ] Test data seeded
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Support email configured
- [ ] Client trained
- [ ] Handover documents prepared

---

**Use this checklist systematically before each deployment!**

**Last Updated:** November 23, 2025
