// Google Sheets Configuration
// Replace these values with your actual Google Sheet details

const CONFIG = {
    // Your Google Sheet ID (from the URL)
    // Example URL: https://docs.google.com/spreadsheets/d/1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk/edit
    // Sheet ID: 1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk
    SHEET_ID: '1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk',
    
    // Get your API Key from: https://console.cloud.google.com/apis/credentials
    // Steps:
    // 1. Go to Google Cloud Console
    // 2. Create a new project (or select existing)
    // 3. Search for "Google Sheets API" and enable it
    // 4. Go to Credentials → Create Credentials → API Key (Restrict it to HTTP referrers)
    // 5. Copy the API Key and paste it below
    // 6. Make sure your Google Sheet is shared publicly or with "Anyone with the link can view"
    API_KEY: 'AIzaSyCA71KyUK-Bbxm84YqCtLORYAYOoO-8PPo', // ⚠️ REPLACE WITH YOUR ACTUAL API KEY
    
    // Sheet name (tab name in your Google Sheet)
    // This is the name of the sheet/tab, not the file name
    SHEET_NAME: 'Faculty Timetable',
    
    // Data range - adjust based on your sheet structure
    // Format: 'SheetName!A1:H100' (includes Faculty Name, Department, and 6 days)
    // A1:H100 means from cell A1 to H100 (adjust if you have more rows)
    DATA_RANGE: 'Sheet1!b5:b264',
    
    // Auto-refresh interval in milliseconds
    // 30000 = 30 seconds (how often to sync with Google Sheets)
    // Decrease for more frequent updates, increase to reduce API calls
    REFRESH_INTERVAL: 30000,
    
    // Column configuration - adjust based on your sheet structure
    COLUMNS: {
        FACULTY_NAME: 0,      // Column A - Faculty Name
        DEPARTMENT: 1,        // Column B - Department
        MONDAY: 2,            // Column C - Monday classes
        TUESDAY: 3,           // Column D - Tuesday classes
        WEDNESDAY: 4,         // Column E - Wednesday classes
        THURSDAY: 5,          // Column F - Thursday classes
        FRIDAY: 6,            // Column G - Friday classes
        SATURDAY: 7,          // Column H - Saturday classes
        DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    
    // Time slots - configure these to match your institution's schedule
    // These are used as row headers in the timetable display
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

// Days of the week (used throughout the application)
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ============================================================================
// 📋 SETUP INSTRUCTIONS FOR GOOGLE SHEETS INTEGRATION
// ============================================================================

console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                   FACULTY TIMETABLE - SETUP GUIDE                          ║
║              Google Sheets Real-Time Synchronization                       ║
╚════════════════════════════════════════════════════════════════════════════╝

🚀 QUICK START (5 MINUTES)
──────────────────────────────────────────────────────────────────────────────

STEP 1: Create Google Cloud Project & Get API Key
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Open: https://console.cloud.google.com/                              │
│ 2. Create a new project (or use existing)                               │
│ 3. Search for "Google Sheets API" and click "Enable"                    │
│ 4. Go to "Credentials" tab                                              │
│ 5. Click "Create Credentials" → Choose "API Key"                        │
│ 6. Copy the API Key                                                     │
│ 7. (RECOMMENDED) Click "Edit API Key" → Add HTTP referrer restriction   │
│    Add: https://yourdomain.com/* (or file:// for local testing)         │
└─────────────────────────────────────────────────────────────────────────┘

STEP 2: Share Your Google Sheet
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Open your Google Sheet in Google Drive                               │
│ 2. Click the "Share" button (top right)                                 │
│ 3. Set sharing to: "Anyone with the link can view"                      │
│ 4. Copy the Sheet URL                                                   │
│ 5. Extract the Sheet ID from the URL:                                   │
│    https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit               │
│    → Copy the part between /d/ and /edit                                │
└─────────────────────────────────────────────────────────────────────────┘

STEP 3: Update config.js
┌─────────────────────────────────────────────────────────────────────────┐
│ Replace these values in this file:                                      │
│                                                                          │
│ SHEET_ID: 'paste-your-sheet-id-here'                                    │
│ API_KEY: 'paste-your-api-key-here'                                      │
│ SHEET_NAME: 'Your-Tab-Name' (if different from 'Faculty Timetable')    │
│ DATA_RANGE: 'Sheet-Name!A1:H100' (adjust row count if needed)           │
└─────────────────────────────────────────────────────────────────────────┘

STEP 4: Format Your Google Sheet
┌─────────────────────────────────────────────────────────────────────────┐
│ Column A: Faculty Name (e.g., "Dr. John Smith")                         │
│ Column B: Department (e.g., "Computer Science", "Mathematics")          │
│ Column C: Monday Classes (e.g., "CS101 9-10, Lab 10-11")                │
│ Column D: Tuesday Classes                                               │
│ Column E: Wednesday Classes                                             │
│ Column F: Thursday Classes                                              │
│ Column G: Friday Classes                                                │
│ Column H: Saturday Classes (optional)                                   │
│                                                                          │
│ Example Row:                                                            │
│ Dr. Sarah Johnson | Mathematics | MATH201 9-10 | Office hrs | ...      │
│                                                                          │
│ Note: You can use any format for classes, e.g.:                         │
│ - "CS101 9-10, CS102 10-11" (multiple classes)                          │
│ - "9-10: CS101, 10-11: CS102" (with time format)                        │
│ - Leave empty or use "-" for free slots                                 │
└─────────────────────────────────────────────────────────────────────────┘

STEP 5: Test the Integration
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Save this file (config.js) with your changes                         │
│ 2. Open index.html in your web browser                                  │
│ 3. Check browser console (F12 → Console tab) for messages               │
│ 4. You should see "✅ Data fetched successfully!" message                │
│ 5. Faculty list should appear on the left side                          │
│                                                                          │
│ If you see errors, check the console for details and refer to           │
│ the TROUBLESHOOTING section below                                       │
└─────────────────────────────────────────────────────────────────────────┘


🔄 HOW AUTO-SYNC WORKS
──────────────────────────────────────────────────────────────────────────────

• The application fetches data from your Google Sheet every 30 seconds
• Any changes you make to the sheet will appear in the app automatically
• No manual refresh needed - it's all real-time!
• You'll see a status message showing the last sync time
• Changes to faculty names, departments, or classes are instantly reflected


⚠️  TROUBLESHOOTING
──────────────────────────────────────────────────────────────────────────────

Issue: "❌ Access Denied: Make sure your Google Sheet is shared publicly"
Solution:
  - Open your Google Sheet
  - Click Share button
  - Change to "Anyone with the link can view"
  - Try again

Issue: "❌ Error 403: Access Denied"
Solution:
  - Check your API Key is correct
  - Make sure Google Sheets API is ENABLED in Google Cloud Console
  - Verify the sheet is shared publicly or with service account

Issue: "❌ Sheet not found: Check SHEET_ID and SHEET_NAME"
Solution:
  - Copy SHEET_ID from your sheet URL again
  - Make sure SHEET_NAME matches the tab name exactly (case-sensitive)
  - Data should be in range A1:H100 or adjust DATA_RANGE

Issue: No data showing but no errors in console
Solution:
  - Check that your Google Sheet has data in columns A-H
  - Verify column A (Faculty Name) is not empty
  - Make sure COLUMNS configuration matches your sheet layout

Issue: Getting CORS error (in console)
Solution:
  - This is normal for public sheets
  - Make sure your sheet is shared with "Anyone with the link can view"
  - If using on a domain, configure API Key HTTP referrers


📞 SUPPORT & DEBUGGING
──────────────────────────────────────────────────────────────────────────────

• Open browser Developer Console: Press F12
• Check the "Console" tab for error messages
• Look for messages starting with:
  - ✅ (success) - Operation completed
  - 🔄 (syncing) - Currently fetching data
  - ❌ (error) - Something went wrong
• Share console errors for support


🔐 SECURITY BEST PRACTICES
──────────────────────────────────────────────────────────────────────────────

1. API Key Management:
   - Never commit API keys to public repositories
   - Use environment variables in production
   - Restrict API Key to HTTP referrers (recommended)
   - Regenerate key if it's been exposed

2. Sheet Sharing:
   - Only share with "Anyone with the link can view" for read-only
   - Use service accounts for production deployments
   - Don't share editing permissions publicly

3. Data Privacy:
   - This tool fetches publicly shared data
   - Don't put sensitive personal information in the sheet
   - Consider using a dedicated Google account for API credentials


🎯 NEXT STEPS
──────────────────────────────────────────────────────────────────────────────

After successful setup, you can:
1. Customize the UI by editing styles.css
2. Add more features (email notifications, SMS alerts, etc.)
3. Deploy to a web server for team access
4. Integrate with your institution's portal
5. Add authentication for restricted access

Happy scheduling! 📚✨
`);
