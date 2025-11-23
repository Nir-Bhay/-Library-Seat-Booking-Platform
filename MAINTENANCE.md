# Maintenance Guide

## Daily Tasks
- [ ] Check for new library approval requests in admin dashboard
- [ ] Monitor payment failures and failed transactions
- [ ] Check error logs in Render dashboard (Settings → Logs)
- [ ] Verify system health endpoints are responding
- [ ] Review any user support tickets or complaints

## Weekly Tasks
- [ ] Review user feedback and complaints
- [ ] Check database storage usage in MongoDB Atlas
- [ ] Verify backup status
- [ ] Review security alerts from hosting platforms
- [ ] Check API response times and performance
- [ ] Monitor Cloudinary storage usage

## Monthly Tasks
- [ ] Update dependencies (npm update)
- [ ] Review and optimize database indexes
- [ ] Check API performance metrics
- [ ] Generate monthly revenue report
- [ ] Review and rotate API keys if necessary
- [ ] Backup database manually
- [ ] Review user analytics and growth
- [ ] Check for security updates

## Emergency Contacts
- **Developer:** Dipu Kumar
- **Phone:** 7870655593
- **Email:** dipukumardevcod@gmail.com

---

## Common Issues & Solutions

### Issue: Website not loading
**Symptoms:** Frontend shows blank page or connection error

**Solution:**
1. Check if backend is running: https://your-api.com/health
2. Check Vercel status page: https://www.vercel-status.com/
3. Check Render status page: https://status.render.com/
4. Verify domain DNS settings (if using custom domain)
5. Check browser console for specific errors
6. Clear browser cache and cookies
7. Try accessing in incognito mode

**Prevention:**
- Set up uptime monitoring (e.g., UptimeRobot)
- Configure status page notifications

---

### Issue: Payment failing
**Symptoms:** Razorpay payment modal doesn't open or payment fails

**Solution:**
1. Verify Razorpay keys are correct in .env file
2. Check if Razorpay account is active
3. Verify webhook configuration in Razorpay dashboard
4. Check Razorpay dashboard for failed payment reasons
5. Ensure amount is in correct format (paise for Razorpay)
6. Check network connectivity
7. Verify user has sufficient balance (for test cards)

**Prevention:**
- Use Razorpay test mode for testing
- Monitor Razorpay webhook logs
- Implement proper error handling

---

### Issue: Images not uploading
**Symptoms:** Library images fail to upload or don't display

**Solution:**
1. Check Cloudinary credentials in backend .env
2. Verify upload limits are not exceeded
3. Check file size restrictions (max 10MB recommended)
4. Verify file format is supported (jpg, png, webp)
5. Check Cloudinary dashboard for errors
6. Verify API key permissions
7. Check server logs for upload errors

**Prevention:**
- Implement client-side file validation
- Compress images before upload
- Monitor Cloudinary usage limits

---

### Issue: Database connection slow/failing
**Symptoms:** API responses slow, database timeouts

**Solution:**
1. Check MongoDB Atlas metrics (Database → Metrics)
2. Verify connection string is correct
3. Check network access whitelist
4. Optimize queries with proper indexes
5. Review slow queries in Atlas performance tab
6. Upgrade cluster if needed (from M0 to M2/M5)
7. Check for long-running queries

**Prevention:**
- Create indexes on frequently queried fields
- Implement query result caching
- Monitor database performance regularly

---

### Issue: Authentication not working
**Symptoms:** Login fails, token expired errors

**Solution:**
1. Verify JWT_SECRET is set correctly
2. Check JWT_EXPIRE time configuration
3. Clear browser localStorage/cookies
4. Verify user exists in database
5. Check password hash is generated correctly
6. Verify auth middleware is functioning
7. Check CORS settings allow credentials

**Prevention:**
- Set appropriate token expiry time
- Implement refresh token mechanism
- Monitor authentication logs

---

### Issue: Bookings not showing/creating
**Symptoms:** Users can't see their bookings or create new ones

**Solution:**
1. Check user authentication status
2. Verify library is approved
3. Check seat availability
4. Review booking validation logic
5. Check database for booking records
6. Verify API endpoint is responding
7. Check date/time format consistency

**Prevention:**
- Implement proper validation
- Add detailed error messages
- Monitor booking creation logs

---

## Monitoring & Logging

### Backend Logs (Render)
1. Go to Render Dashboard
2. Select your service (library-booking-api)
3. Click "Logs" tab
4. Filter by error level for issues
5. Download logs if needed for analysis

### Database Monitoring (MongoDB Atlas)
1. Go to MongoDB Atlas Dashboard
2. Select your cluster
3. Click "Metrics" tab
4. Monitor:
   - Connections
   - Query Execution Time
   - Network Traffic
   - Storage Usage

### Frontend Errors (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Click "Analytics" → "Speed Insights"
4. Check console for runtime errors
5. Review "Functions" tab for API route errors

---

## Backup & Recovery

### Database Backup
**Automatic:** MongoDB Atlas provides automated backups (check cluster tier)

**Manual Backup:**
```bash
# Using mongodump
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/library-booking" --out=/backup/path

# Restore from backup
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/library-booking" /backup/path
```

### Code Backup
- All code is version controlled in GitHub
- Keep production branch protected
- Tag releases for easy rollback
- Maintain separate dev/staging/production branches

---

## Performance Optimization

### Database
- Create indexes on frequently queried fields:
  - User: email, role
  - Library: city, area, isApproved
  - Booking: user_id, library_id, bookingDate
- Use projection to fetch only needed fields
- Implement pagination for large datasets

### API
- Enable compression for responses
- Implement caching for static data
- Use CDN for static assets
- Minimize database queries per request

### Frontend
- Lazy load components and routes
- Optimize images (compress, use WebP)
- Implement virtual scrolling for long lists
- Use React.memo for expensive components
- Code splitting with dynamic imports

---

## Security Checklist

### Monthly Security Review
- [ ] Review and rotate API keys
- [ ] Check for dependency vulnerabilities (npm audit)
- [ ] Review access logs for suspicious activity
- [ ] Verify SSL certificates are valid
- [ ] Check CORS settings are restrictive
- [ ] Review user permissions and roles
- [ ] Verify rate limiting is effective
- [ ] Check for exposed secrets in code

### Security Best Practices
1. Never commit .env files to git
2. Use environment variables for all secrets
3. Keep dependencies updated
4. Implement input validation and sanitization
5. Use HTTPS only in production
6. Implement CSRF protection
7. Set up security headers (helmet.js)
8. Monitor for unusual activity

---

## Scaling Considerations

### When to Upgrade

**Database (MongoDB Atlas):**
- M0 Free → M2/M5 when:
  - Storage exceeds 512MB
  - Connections frequently maxed out
  - Query performance degrading

**Backend (Render):**
- Free → Starter when:
  - Frequent cold starts affecting UX
  - Need faster response times
  - Require custom domains/SSL

**Frontend (Vercel):**
- Free tier is usually sufficient
- Upgrade for:
  - Custom domains
  - Advanced analytics
  - Increased bandwidth

---

## Deployment Checklist

### Before Deploying
- [ ] Test all features locally
- [ ] Run linter and fix issues
- [ ] Update environment variables
- [ ] Review code changes
- [ ] Create git tag for release
- [ ] Backup database

### After Deploying
- [ ] Verify health endpoints
- [ ] Test critical user flows
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Test payment integration
- [ ] Verify email notifications

---

## Useful Commands

### Backend
```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Database
```bash
# Connect to MongoDB
mongosh "mongodb+srv://cluster.mongodb.net/library-booking" --username libraryAdmin

# Show all collections
show collections

# Count documents
db.users.countDocuments()
db.libraries.countDocuments()
db.bookings.countDocuments()
```

---

## Support & Troubleshooting

### Getting Help
1. Check this maintenance guide first
2. Review error logs in hosting dashboards
3. Search GitHub issues
4. Contact developer: dipukumardevcod@gmail.com
5. Create detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/error messages
   - Environment details

---

**Last Updated:** November 23, 2025
**Version:** 1.0.0
