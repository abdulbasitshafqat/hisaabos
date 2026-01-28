# 🌐 Connect hisaabos.com Domain - Complete Guide

## 📋 Overview

This guide will help you:
1. Deploy HisaabOS to Vercel (recommended hosting)
2. Connect your `hisaabos.com` domain from Spaceship.com
3. Configure DNS records
4. Enable SSL/HTTPS

**Estimated Time:** 15-20 minutes

---

## 🚀 STEP 1: Deploy to Vercel

### **Option A: Deploy via Vercel CLI (Recommended)**

#### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 1.2 Login to Vercel
```bash
vercel login
```
- Opens browser → Login with GitHub/Email

#### 1.3 Deploy Your App
```bash
# From your project directory
vercel
```

**Answer the prompts:**
- **Set up and deploy?** → **Y** (Yes)
- **Which scope?** → Select your account
- **Link to existing project?** → **N** (No)
- **What's your project name?** → `hisaabos` (or your preference)
- **In which directory is your code?** → `./` (current directory)
- **Want to override settings?** → **N** (No, use defaults)

**Vercel will:**
1. Detect Vite automatically
2. Build your project (`npm run build`)
3. Deploy to a temporary URL (e.g., `hisaabos.vercel.app`)
4. Give you a deployment URL

#### 1.4 Test the Deployment
```bash
# Vercel will show you a URL like:
# https://hisaabos-abc123.vercel.app
```
Visit the URL to confirm everything works!

---

### **Option B: Deploy via Vercel Dashboard (Alternative)**

#### 1.1 Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - HisaabOS"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hisaabos.git
git branch -M main
git push -u origin main
```

#### 1.2 Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. **Import Git Repository** → Select your GitHub repo
4. **Configure Project:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click **"Deploy"**

Vercel will auto-deploy and give you a URL like `hisaabos.vercel.app`

---

## 🌍 STEP 2: Add Custom Domain in Vercel

### 2.1 Go to Your Vercel Project
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **hisaabos** project
3. Click **"Settings"** tab
4. Click **"Domains"** in the sidebar

### 2.2 Add Your Domain
1. In the "Domains" section, enter: `hisaabos.com`
2. Click **"Add"**
3. Vercel will show you **DNS records** to configure

**Vercel will provide these records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔧 STEP 3: Configure DNS on Spaceship.com

### 3.1 Login to Spaceship
1. Go to [spaceship.com](https://www.spaceship.com)
2. Login to your account
3. Click **"Domains"** in the menu
4. Click on **"hisaabos.com"**

### 3.2 Access DNS Management
1. In your domain dashboard, find **"DNS"** or **"DNS Settings"**
2. Click **"Manage DNS"** or **"DNS Records"**

### 3.3 Add DNS Records

#### **Record 1: Root Domain (hisaabos.com)**
Click **"Add Record"** and enter:
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `76.76.21.21`
- **TTL:** 3600 (or Auto)

Click **"Save"** or **"Add Record"**

#### **Record 2: WWW Subdomain (www.hisaabos.com)**
Click **"Add Record"** again:
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 3600 (or Auto)

Click **"Save"** or **"Add Record"**

### 3.4 Remove Conflicting Records (Important!)
⚠️ **Before saving, check for conflicts:**

**Delete these if they exist:**
- Any other **A records** pointing to different IPs
- Any **CNAME** on `@` (root) - conflicts with A record
- Any **URL redirect** records
- **Parking page** records from Spaceship

**Keep these (if present):**
- **MX records** (for email)
- **TXT records** (for verification, SPF, etc.)

---

## ⏱️ STEP 4: Wait for DNS Propagation

### 4.1 DNS Propagation Timeline
- **Minimum:** 10-30 minutes
- **Average:** 2-6 hours
- **Maximum:** 24-48 hours (rare)

### 4.2 Check DNS Status

**Option A: Use Online Tools**
1. Go to [dnschecker.org](https://dnschecker.org)
2. Enter: `hisaabos.com`
3. Select **"A"** record type
4. Click **"Search"**
5. Wait until most locations show `76.76.21.21`

**Option B: Command Line**
```bash
# Windows (PowerShell)
nslookup hisaabos.com

# Should show:
# Address: 76.76.21.21
```

### 4.3 Verify in Vercel
1. Go back to Vercel → Project → Settings → Domains
2. You should see:
   - `hisaabos.com` → ✅ **Active** (green checkmark)
   - `www.hisaabos.com` → ✅ **Active**

If showing **"Pending"**, wait a bit longer for DNS propagation.

---

## 🔒 STEP 5: SSL/HTTPS (Automatic)

### 5.1 Vercel Auto-SSL
✅ **Good news!** Vercel automatically provisions SSL certificates via Let's Encrypt.

**What Vercel does automatically:**
1. Detects DNS is configured correctly
2. Issues SSL certificate (1-5 minutes after DNS confirms)
3. Enables HTTPS for both:
   - `https://hisaabos.com`
   - `https://www.hisaabos.com`
4. Auto-redirects HTTP → HTTPS

### 5.2 Verify SSL is Active
1. Visit: `https://hisaabos.com`
2. Check for:
   - 🔒 **Lock icon** in browser address bar
   - **No security warnings**
   - Certificate issued by **Let's Encrypt**

### 5.3 Force HTTPS (Optional)
In Vercel project settings:
1. Settings → General → **"Automatically expose System Environment Variables"**
2. Vercel handles this by default - no action needed!

---

## 🎯 STEP 6: Final Configuration

### 6.1 Set Primary Domain (Optional)
If you want `www.hisaabos.com` to redirect to `hisaabos.com` (or vice versa):

1. Vercel → Settings → Domains
2. Find your preferred domain (e.g., `hisaabos.com`)
3. Click **"..."** (three dots) → **"Make Primary"**
4. Other domain will auto-redirect

**Recommendation:** Make `hisaabos.com` primary (no www)

### 6.2 Test All URLs
Visit these and ensure they all work:
- ✅ `http://hisaabos.com` → redirects to HTTPS
- ✅ `https://hisaabos.com` → works!
- ✅ `http://www.hisaabos.com` → redirects
- ✅ `https://www.hisaabos.com` → works!

### 6.3 Update Environment Variables (if needed)
If you have any API URLs or base URLs in your code:
1. Vercel → Settings → Environment Variables
2. Add any required variables (e.g., `VITE_API_URL`)
3. Redeploy if needed: `vercel --prod`

---

## 🚨 Troubleshooting

### **Issue 1: Domain shows "Not Verified" in Vercel**
**Solution:**
1. Double-check DNS records on Spaceship.com
2. Ensure A record points to `76.76.21.21`
3. Ensure no conflicting records exist
4. Wait 30 mins - 2 hours for DNS propagation
5. In Vercel, click **"Refresh"** on the domain

### **Issue 2: SSL Certificate Not Issued**
**Solution:**
1. Ensure DNS is fully propagated (check dnschecker.org)
2. Wait 5-10 minutes after DNS confirms
3. In Vercel Domains, click **"Renew Certificate"**
4. If still failing, remove domain and re-add it

### **Issue 3: Website Shows 404 or Vercel Error**
**Solution:**
1. Check Vercel deployment succeeded:
   - Vercel Dashboard → Deployments → Latest should be ✅
2. Check build output directory is `dist`
3. Redeploy: `vercel --prod`

### **Issue 4: "This site can't be reached"**
**Solution:**
1. DNS not propagated yet - wait longer
2. Check DNS records are correct:
   ```bash
   nslookup hisaabos.com
   # Should return: 76.76.21.21
   ```
3. Try incognito/private browsing (clears DNS cache)
4. Flush DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns
   ```

### **Issue 5: Spaceship Shows "Parking Page"**
**Solution:**
1. Disable Spaceship parking page:
   - Spaceship → Domain Settings → **Disable Parking**
2. Ensure A record is added (not just nameservers)

---

## 📊 Quick Reference Table

| Step | Action | Where | Time |
|------|--------|-------|------|
| 1 | Deploy app | Vercel | 5 min |
| 2 | Add domain | Vercel Settings | 1 min |
| 3 | Configure DNS | Spaceship.com | 5 min |
| 4 | DNS Propagation | Automatic | 30min-6hr |
| 5 | SSL Provisioning | Automatic | 5-10 min |
| 6 | Test & Verify | Browser | 2 min |

---

## 🎉 Success Checklist

Once complete, you should have:
- ✅ `hisaabos.com` → Live and accessible
- ✅ `www.hisaabos.com` → Works (redirects to main if set)
- ✅ HTTPS enabled with valid SSL certificate
- ✅ No "Not Secure" warnings
- ✅ Landing page loads correctly
- ✅ All routes work (`/pricing`, `/login`, `/signup`)
- ✅ Auto-deploys on `git push` (if using GitHub integration)

---

## 🔄 Continuous Deployment (Bonus)

If you deployed via GitHub:
1. **Make changes** to your code locally
2. **Commit & push:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. **Vercel auto-deploys** (2-3 minutes)
4. **Live at hisaabos.com** automatically!

**View deployment status:**
- Vercel Dashboard → Deployments
- Or install Vercel GitHub app for PR previews

---

## 📞 Support Resources

### **Vercel Support:**
- Docs: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

### **Spaceship Support:**
- Help Center: [spaceship.com/help](https://www.spaceship.com/help)
- DNS Guide: Search "DNS management" in their help center

### **DNS Troubleshooting:**
- DNS Checker: [dnschecker.org](https://dnschecker.org)
- What's My DNS: [whatsmydns.net](https://www.whatsmydns.net)

---

## 🎯 Alternative Hosting Options

If you prefer not to use Vercel:

### **Option 1: Netlify**
- Similar to Vercel
- Drag & drop `dist` folder
- Add domain in Netlify dashboard
- DNS: Point to Netlify's servers

### **Option 2: GitHub Pages**
- Free for public repos
- Custom domain support
- Requires `gh-pages` branch

### **Option 3: Cloudflare Pages**
- Fast global CDN
- Free SSL
- Git integration

---

## 📝 Final Notes

**Important Reminders:**
1. **Don't change nameservers** on Spaceship - only add A/CNAME records
2. **Keep MX records** if you have email on this domain
3. **SSL is free** - Vercel handles it automatically
4. **DNS changes take time** - be patient (up to 24 hours max)

**After Setup:**
- Consider setting up [Google Analytics](https://analytics.google.com)
- Add [Google Search Console](https://search.google.com/search-console) for SEO
- Monitor uptime with [UptimeRobot](https://uptimerobot.com)

---

## ✅ You're Done! 🎉

Your HisaabOS app should now be live at:
- 🌐 **https://hisaabos.com**
- 🔒 Secure (SSL enabled)
- 🚀 Fast (Vercel Edge Network)
- 📱 Responsive (works on all devices)

**Test everything:**
1. Landing page
2. Pricing page
3. Login/Signup
4. Onboarding flow
5. Dashboard (after onboarding)

**Congratulations on launching HisaabOS!** 🇵🇰

---

Need help? I'm here to assist with any issues during the setup process!
