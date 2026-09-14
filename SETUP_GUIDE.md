# 📖 Faculty Timetable - Complete Setup Guide

Welcome! This guide will help you set up the Faculty Timetable Management System with Google Sheets integration in just a few minutes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Get Your Google Cloud API Key](#step-1-get-your-google-cloud-api-key)
3. [Step 2: Create & Share Your Google Sheet](#step-2-create--share-your-google-sheet)
4. [Step 3: Configure the Application](#step-3-configure-the-application)
5. [Step 4: Test & Deploy](#step-4-test--deploy)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

Before starting, make sure you have:

- ✅ A Google Account (for Google Cloud Console and Google Sheets)
- ✅ A modern web browser (Chrome, Firefox, Safari, Edge)
- ✅ Basic knowledge of Google Sheets
- ✅ The Faculty Timetable repository files (index.html, config.js, script.js, google-sheets-api.js, styles.css)

---

## Step 1: Get Your Google Cloud API Key

### Part A: Create a Google Cloud Project

1. **Open Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google Account

2. **Create a New Project**
   - Click the project dropdown at the top
   - Click **"New Project"**
   - Enter a project name (e.g., "Faculty Timetable")
   - Click **"Create"**
   - Wait for the project to be created

3. **Enable Google Sheets API**
   - In the left menu, click **"APIs & Services"** → **"Library"**
   - Search for **"Google Sheets API"**
   - Click on it
   - Click the blue **"Enable"** button
   - Wait for it to complete

### Part B: Create API Key

1. **Go to Credentials**
   - In the left menu, click **"APIs & Services"** → **"Credentials"**

2. **Create API Key**
   - Click **"Create Credentials"** button (top-left)
   - Select **"API Key"** from the dropdown
   - A dialog will show your new API Key
   - **Copy this key** - you'll need it next!

3. **Restrict Your API Key (Recommended)**
   - Click on your newly created API Key
   - Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
   - Add your domain or `file://` for local testing
   - Click **"Save"**

**✅ Keep your API Key safe - you'll use it in Step 3**

---

## Step 2: Create & Share Your Google Sheet

### Part A: Create the Google Sheet

1. **Open Google Sheets**
   - Visit: https://sheets.google.com/
   - Click **"Create a new spreadsheet"**

2. **Set Up Columns**
   - Create headers in the first row:
     - **A1**: Faculty Name
     - **B1**: Department
     - **C1**: Monday
     - **D1**: Tuesday
     - **E1**: Wednesday
     - **F1**: Thursday
     - **G1**: Friday
     - **H1**: Saturday

3. **Add Sample Data**
   
   Example of how to format your data:
   
   | Faculty Name | Department | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
   |---|---|---|---|---|---|---|---|
   | Dr. John Smith | Computer Science | CS101 9-10 | Office hrs 2-3 | CS101 9-10 | Lab 10-11 | CS102 2-3 | - |
   | Prof. Sarah Johnson | Mathematics | MATH201 9-10 | MATH202 10-11 | MATH201 9-10 | Office hrs 3-4 | MATH203 1-2 | - |
   | Dr. Michael Brown | Physics | PHYS101 11-12 | - | PHYS101 11-12 | - | PHYS102 3-4 | - |

   **Format Tips:**
   - Use any format for classes: "CS101 9-10", "CS101", "9-10: CS101", etc.
   - Use "-" or leave empty for free slots
   - Separate multiple classes with commas: "CS101 9-10, Lab 10-11"

4. **Save Your Sheet**
   - Press **Ctrl+S** (or Cmd+S on Mac)
   - Give it a name (e.g., "Faculty Timetable")
   - Remember this name - you'll need it in Step 3

### Part B: Get Your Sheet ID

1. **Copy the Sheet URL**
   - Look at your browser URL bar
   - It looks like: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

2. **Extract Sheet ID**
   - Copy the long ID between `/d/` and `/edit`
   - Example: `1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk`
   - **Save this - you'll need it in Step 3**

### Part C: Share Your Sheet

1. **Click Share Button**
   - Top right of Google Sheets
   - Click the **"Share"** button

2. **Set Sharing Options**
   - In the dialog, change from "Restricted" to:
   - **"Anyone with the link can view"**
   - Click **"Copy link"** and **"Share"**

**✅ Your sheet is now public and accessible via API**

---

## Step 3: Configure the Application

### Open config.js

1. **Download/Extract the Project**
   - If you haven't already, clone or download the Faculty Timetable repository
   - Open the `config.js` file in a text editor (VS Code, Notepad++, Sublime Text, etc.)

2. **Update Configuration Values**

```javascript
const CONFIG = {
    // Paste your Sheet ID here
    SHEET_ID: '1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk',
    
    // Paste your API Key here
    API_KEY: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    
    // Tab name in your Google Sheet (case-sensitive)
    SHEET_NAME: 'Faculty Timetable',
    
    // Data range - adjust if needed
    DATA_RANGE: 'Faculty Timetable!A1:H100',
    
    // Sync interval (30000 = 30 seconds)
    REFRESH_INTERVAL: 30000,
    
    // Time slots - customize as needed
    TIME_SLOTS: [
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-01:00 (Lunch)',
        '01:00-02:00',
        '02:00-03:00'
    ]
};
```

### Configuration Details

| Parameter | Value | Example |
|-----------|-------|---------|
| `SHEET_ID` | Your Google Sheet ID | `1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk` |
| `API_KEY` | Your Google Sheets API Key | `AIzaSyDxxxxx...` |
| `SHEET_NAME` | Tab name (case-sensitive) | `Faculty Timetable` |
| `DATA_RANGE` | Data range A1:H100 | `Sheet1!A1:H100` |
| `REFRESH_INTERVAL` | Milliseconds between syncs | `30000` (30 seconds) |

### Save the File

- Save `config.js` with your changes
- Make sure the file is saved in the same directory as `index.html`

**✅ Configuration complete!**

---

## Step 4: Test & Deploy

### Local Testing

#### Option A: Direct File Opening
1. Open `index.html` in your web browser
2. You should see the Faculty Timetable application load
3. Faculty data should appear in the left sidebar
4. Check browser console (F12) for any errors

#### Option B: Using Local Server (Recommended)

**Windows:**
```batch
python -m http.server 8000
```

**Mac/Linux:**
```bash
python3 -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

Then open: `http://localhost:8000`

### What You Should See

✅ **Success Indicators:**
- Green message: "✅ Synced successfully"
- Faculty names appear in the left panel
- Timetable displays when you click a faculty name
- Last sync time updates

❌ **Error Messages:**
- Check the Troubleshooting section below
- Open browser console (F12) for detailed errors

### Deploy to Internet

1. **Using GitHub Pages:**
   - Push your files to a GitHub repository
   - Enable GitHub Pages in repository settings
   - Access via: `https://username.github.io/faculty-timetable`

2. **Using a Web Server:**
   - Upload files to your web hosting service
   - Ensure Google Sheet is shared publicly
   - Access via your domain

3. **Using Vercel or Netlify:**
   - Connect your GitHub repository
   - Deploy automatically
   - Get a live URL instantly

---

## Troubleshooting

### Problem: "❌ Access Denied"

**Message:** `Access Denied: Make sure your Google Sheet is shared publicly`

**Solutions:**
1. Open your Google Sheet
2. Click **"Share"** button → Verify it says **"Anyone with the link can view"**
3. Try again
4. If still failing, check:
   - API Key restrictions (remove restrictions for testing)
   - Google Sheets API is enabled in Cloud Console
   - SHEET_ID is correct

---

### Problem: "❌ Error 403: Access Denied"

**Cause:** API Key is invalid or doesn't have permissions

**Solutions:**
1. Verify API Key is correct in `config.js`
2. Go to Google Cloud Console
3. Check that **Google Sheets API is ENABLED**
4. Verify API Key hasn't been disabled
5. Try creating a new API Key

---

### Problem: "❌ Sheet not found"

**Message:** `Sheet not found: Check SHEET_ID and SHEET_NAME`

**Solutions:**
1. Double-check your `SHEET_ID`:
   - Extract from URL again: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Make sure no extra spaces or characters

2. Check your `SHEET_NAME`:
   - Must match the tab name exactly
   - Is it "Faculty Timetable" or "Sheet1"?
   - Case-sensitive!

3. Verify `DATA_RANGE`:
   - Should be: `SheetName!A1:H100`
   - Replace "SheetName" with actual tab name

---

### Problem: No Data Shows, No Errors

**Solutions:**
1. Wait 30 seconds for auto-sync
2. Click "Refresh Now" button
3. Check browser console (F12):
   - Look for error messages
   - Check Network tab (F12 → Network)
   - See if API request succeeded
4. Verify Google Sheet has data:
   - Column A has faculty names
   - Columns B-H have data
   - No empty rows at the top

---

### Problem: "CORS Error" in Console

**Message:** Something about CORS or blocked request

**Solutions:**
1. Make sure your Google Sheet is shared with **"Anyone with the link can view"**
2. Check API Key is correct
3. If using HTTPS domain:
   - Go to Google Cloud Console
   - Edit API Key → Add your domain as HTTP referrer
   - Example: `https://yourdomain.com/*`

---

### Problem: Getting "401 Unauthorized"

**Message:** `401 Unauthorized`

**Solutions:**
1. Verify API Key is correct
2. Check you copied the entire API Key
3. Make sure Google Sheets API is enabled
4. Try creating a new API Key in Google Cloud Console

---

### How to Debug

**Open Browser Console (F12):**
1. Press **F12** on your keyboard
2. Go to **"Console"** tab
3. Look for messages starting with:
   - ✅ (Green) = Success
   - 🔄 (Blue) = Loading
   - ❌ (Red) = Error
4. Read error messages carefully
5. Share full error text when asking for help

**Check Network Requests:**
1. Press **F12** → Go to **"Network"** tab
2. Click "Refresh Now" button
3. Look for requests to `sheets.googleapis.com`
4. Click on the request to see details
5. Check Status Code:
   - 200 = Success
   - 403 = Permission denied
   - 404 = Not found
   - 400 = Bad request

---

## Advanced Configuration

### Change Auto-Sync Interval

Edit `config.js`:
```javascript
REFRESH_INTERVAL: 60000,  // 60 seconds instead of 30
```

Common values:
- `10000` = 10 seconds (very frequent)
- `30000` = 30 seconds (default)
- `60000` = 1 minute
- `300000` = 5 minutes (less frequent)

### Add More Time Slots

Edit `config.js`:
```javascript
TIME_SLOTS: [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-01:00 (Lunch Break)',
    '01:00-02:00',
    '02:00-03:00',
    '03:00-04:00',
    '04:00-05:00'
]
```

### Change Columns

If your Google Sheet has a different structure, edit `config.js`:
```javascript
COLUMNS: {
    FACULTY_NAME: 0,      // Column A
    DEPARTMENT: 1,        // Column B
    MONDAY: 2,            // Column C
    TUESDAY: 3,           // Column D
    WEDNESDAY: 4,         // Column E
    THURSDAY: 5,          // Column F
    FRIDAY: 6,            // Column G
    SATURDAY: 7           // Column H (optional)
}
```

### Customize Styling

Edit `styles.css` to change:
- Colors and themes
- Font sizes
- Layout and spacing
- Button styles
- Responsive breakpoints

---

## Next Steps

After successful setup:

1. ✅ Share the application URL with your institution
2. ✅ Add all faculty members to your Google Sheet
3. ✅ Keep the sheet updated with current schedules
4. ✅ Monitor the console for any issues
5. ✅ Consider deploying to a permanent hosting solution

---

## Security Tips

1. **API Key Security:**
   - Don't share your API Key publicly
   - Use environment variables in production
   - Regenerate if accidentally exposed
   - Restrict to specific domains

2. **Sheet Sharing:**
   - Only share read-only access
   - Don't include sensitive personal data
   - Use a dedicated Google account for API

3. **Updates:**
   - Keep the application files backed up
   - Test changes before deploying
   - Monitor for any security updates

---

## Getting Help

If you encounter issues:

1. **Check the Troubleshooting section above**
2. **Review browser console (F12) for errors**
3. **Verify all configuration values in config.js**
4. **Ensure Google Sheet is public and has correct data**
5. **Check Google Sheets API is enabled in Cloud Console**

For additional support:
- Open an issue on GitHub
- Check Google Sheets API documentation
- Review the main README.md file

---

## Congratulations! 🎉

You've successfully set up the Faculty Timetable Management System!

**Enjoy your automated timetable management!** 📚✨

---

**Last Updated:** September 14, 2024  
**Version:** 2.0
