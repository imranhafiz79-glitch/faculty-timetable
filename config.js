// Google Sheets Configuration
// Replace these values with your actual Google Sheet details

const CONFIG = {
    // Your Google Sheet ID (from the URL)
    SHEET_ID: '1q8hTVuITJAltGci4K-iJiKkaLLsn_KdPNVl0Ro_-7sk',
    
    // Get your API Key from: https://console.cloud.google.com/apis/credentials
    // 1. Create a new project in Google Cloud Console
    // 2. Enable "Google Sheets API"
    // 3. Create an API Key (not OAuth)
    // 4. Make sure your Google Sheet is shared publicly or with "Anyone with the link can view"
    API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY', // Replace with your actual API key
    
    // Sheet name (tab name in your Google Sheet)
    SHEET_NAME: 'Faculty Timetable', // Change if your sheet tab has a different name
    
    // Data range - adjust based on your sheet structure
    // Format: 'SheetName!A1:G100'
    DATA_RANGE: 'Faculty Timetable!A1:G100',
    
    // Auto-refresh interval in milliseconds (30 seconds = 30000)
    REFRESH_INTERVAL: 30000,
    
    // Column configuration - adjust based on your sheet columns
    COLUMNS: {
        FACULTY_NAME: 0,      // Column A - Faculty Name
        DEPARTMENT: 1,        // Column B - Department
        MONDAY: 2,            // Column C - Monday
        TUESDAY: 3,           // Column D - Tuesday
        WEDNESDAY: 4,         // Column E - Wednesday
        THURSDAY: 5,          // Column F - Thursday
        FRIDAY: 6,            // Column G - Friday
        SATURDAY: 7           // Column H - Saturday (if exists)
    },
    
    // Time slots - adjust based on your sheet structure
    TIME_SLOTS: [
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-01:00',
        '01:00-02:00',
        '02:00-03:00'
    ]
};

// Days of the week
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Setup Instructions
console.log(`
╔════════════════════════════════════════════════════════════════╗
║     FACULTY TIMETABLE - GOOGLE SHEETS SETUP INSTRUCTIONS       ║
╚════════════════════════════════════════════════════════════════╝

📋 STEP 1: Get Your Google Sheets API Key
─────────────────────────────────────────
1. Visit: https://console.cloud.google.com/
2. Create a new project
3. Enable "Google Sheets API"
4. Go to Credentials → Create Credentials → API Key
5. Copy your API Key

📊 STEP 2: Share Your Google Sheet
─────────────────────────────────────────
1. Open your Google Sheet
2. Click "Share" button
3. Set to "Anyone with the link can view"
4. Or share with the Google Cloud project service account email

🔧 STEP 3: Update config.js
─────────────────────────────────────────
1. Replace 'YOUR_GOOGLE_SHEETS_API_KEY' with your actual API key
2. Verify SHEET_ID matches your sheet URL
3. Verify SHEET_NAME matches your tab name
4. Adjust COLUMNS if your data structure is different

📝 STEP 4: Sheet Data Format
─────────────────────────────────────────
Your Google Sheet should look like this:

┌──────────────┬────────────┬────────────┬────────────┬────────────┐
│ Faculty Name │ Department │   Monday   │  Tuesday   │ Wednesday  │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Dr. John     │ CS         │ CS101 9-10 │ Office Hrs │ CS101 9-10 │
│ Prof. Sarah  │ Math       │ MATH101    │ MATH102    │ MATH101    │
└──────────────┴────────────┴────────────┴────────────┴────────────┘

✅ STEP 5: Test
─────────────────────────────────────────
1. Open index.html in your browser
2. Check browser console for any errors
3. Faculty data should load automatically

⚠️  TROUBLESHOOTING
─────────────────────────────────────────
- CORS Error: Make sure your Google Sheet is shared publicly
- 403 Error: API Key invalid or API not enabled
- No data loading: Check SHEET_ID and SHEET_NAME are correct
- Check browser console (F12) for detailed error messages
`);
