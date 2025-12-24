## 📌 COMMANDS TO RUN

### 1. Navigate to Frontend
```bash
cd "C:\Users\nada\OneDrive - Nile University\Desktop\ClinicWebSite_Frontend"
```

### 2. Install Dependencies (if needed)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
> clinic-website@0.1.0 dev
> next dev

> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 4. Open in Browser
```
http://localhost:3000
```

### 5. Visit These URLs

#### Doctors List (Server Component):
```
http://localhost:3000/doctors
```

#### Book Appointment (Client Component):
```
http://localhost:3000/appointment-booking
```

#### API Test Page:
```
http://localhost:3000/api-test
```

---

## ✅ What Should Happen

### Step 1: Start Dev Server
```bash
npm run dev
```
→ Should see "Ready on http://localhost:3000"

### Step 2: Visit Doctors Page
```
http://localhost:3000/doctors
```
→ Should see list of doctors from API
→ If error, check:
   - Is backend running on https://localhost:7043?
   - Check browser console for error details
   - Use API test page to debug

### Step 3: Test Appointment Booking
```
http://localhost:3000/appointment-booking
```
→ Fill out the form with:
   - Patient ID: 1 (or any number)
   - Doctor ID: 1 (or valid doctor ID)
   - Date: Pick future date
   - Time: Pick time (e.g., 14:00)
→ Click "Book Appointment"
→ Should see success message

### Step 4: Test API Endpoints
```
http://localhost:3000/api-test
```
→ Click "Test" buttons
→ View responses
→ Verify all endpoints work

---

## 🔧 Development Workflow

### Code Changes
1. Edit files in `src/services/`, `app/`, etc.
2. Save files
3. Changes auto-reload in browser

### Restart Dev Server
```bash
# Stop server: Ctrl+C
# Start again:
npm run dev
```

### Check API Configuration
```bash
# View env variable:
cat .env.local
# Should show:
# NEXT_PUBLIC_API_URL=https://localhost:7043
```

---

## 🚨 Troubleshooting Commands

### Check Node Version
```bash
node --version
npm --version
```
→ Should be Node 16+ and npm 8+

### Clear Cache and Reinstall
```bash
# Delete node_modules
rm -r node_modules
# or on Windows:
rmdir /s /q node_modules

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Check Port Availability
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

### Check Backend Status
```bash
# Try to fetch from backend
curl -k https://localhost:7043/api/doctors
```

---

## 📊 Project Info

### View Project Structure
```bash
# On Windows PowerShell:
Get-ChildItem -Recurse -Directory app/ | Select-Object FullName

# Or check files:
tree app/ /A
```

### View Environment
```bash
# Check environment variables loaded:
echo %NEXT_PUBLIC_API_URL%
```

### Check TypeScript
```bash
# Check TypeScript compilation:
npx tsc --noEmit
```

---

## 📝 File Locations

### Key Files
```
App Router: /app
Services: /src/services/api.ts
Doctors Page: /app/doctors/page.tsx
Appointment Form: /app/components/CreateAppointmentForm.tsx
Config: /.env.local
```

### Open in VS Code
```bash
code .
```

---

## 🎯 Testing Checklist

- [ ] Backend running on https://localhost:7043
- [ ] Run: npm run dev
- [ ] Visit: http://localhost:3000/doctors
- [ ] See doctors list
- [ ] Click "Book Appointment"
- [ ] Fill form and submit
- [ ] See success message
- [ ] Visit API test page
- [ ] All tests pass

---

## 🔒 SSL Certificate Warning

For development on localhost, SSL warnings are normal.

**To test with curl:**
```bash
# Ignore SSL warnings:
curl -k https://localhost:7043/api/doctors
```

**In browser:** SSL warning is OK for development

---

## 📞 Debug Commands

### Check API Response
```bash
# Get doctors
curl -k https://localhost:7043/api/doctors | jq

# Get swagger
curl -k https://localhost:7043/swagger
```

### View Dev Server Logs
The terminal running `npm run dev` shows:
- HTTP requests
- Build errors
- Runtime errors

**Keep watching this terminal!**

---

## ✨ Additional Commands

### Build for Production
```bash
npm run build
npm start
```

### Run Linter
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

### View Next Config
```bash
cat next.config.ts
```

---

## 🎓 Quick Learning

### How It Works

1. **Frontend starts:** `npm run dev`
2. **Loads environment:** `.env.local` → `NEXT_PUBLIC_API_URL`
3. **API calls:** `src/services/api.ts` → `https://localhost:7043`
4. **Server components:** Fetch on server, render HTML
5. **Client components:** Use 'use client', manage state, handle forms

### Flow Example: Doctors Page

```
User visits /doctors
  ↓
NextJS server renders page.tsx
  ↓
page.tsx calls getAllDoctors()
  ↓
getAllDoctors() fetches https://localhost:7043/api/doctors
  ↓
Backend returns doctor list
  ↓
NextJS renders HTML with doctors
  ↓
HTML sent to browser
  ↓
Browser displays doctors list
  ↓
User clicks "Book Appointment"
  ↓
CreateAppointmentForm (Client Component) opens
```

---

## 📚 Documentation Quick Links

- Read **QUICK_START.md** first (5 min)
- Then **NEXTJS_SETUP_GUIDE.md** (15 min)
- Reference **IMPLEMENTATION_CHECKLIST.md** for features
- Use **API_INTEGRATION.md** for API details

---

**Backend Base URL:** https://localhost:7043
**Frontend Port:** 3000
**Node Version:** 16+
**Ready to Go!** ✅
