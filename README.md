# 📚 Faculty Timetable Management System

A real-time faculty timetable management application with automatic synchronization to Google Sheets. Display, search, filter, and export faculty schedules effortlessly!

![Status](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Version](https://img.shields.io/badge/version-2.0-orange)

## ✨ Features

- 📊 **Real-Time Google Sheets Sync** - Automatic data synchronization every 30 seconds
- 🔍 **Smart Search** - Filter faculty by name or department
- 📅 **Day Filtering** - View specific day's schedule
- 📥 **Export to CSV** - Download timetables for offline use
- 🎨 **Clean UI** - Modern, responsive interface
- ⚡ **Fast & Reliable** - Lightweight, no dependencies
- 🔄 **Auto-Refresh** - Configurable sync intervals
- 📱 **Mobile Friendly** - Works on all devices
- 🛡️ **Error Handling** - Detailed error messages and troubleshooting

## 🚀 Quick Start

### 1. Get Google Sheets API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Search for "Google Sheets API" and enable it
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API Key

### 2. Share Your Google Sheet

1. Open your Google Sheet
2. Click **Share** button
3. Set to **"Anyone with the link can view"**

### 3. Update Configuration

Edit `config.js` and replace:
```javascript
SHEET_ID: 'your-sheet-id-here'
API_KEY: 'your-api-key-here'
SHEET_NAME: 'Faculty Timetable'  // Your sheet tab name
DATA_RANGE: 'Faculty Timetable!A1:H100'  // Adjust if needed
```

### 4. Format Your Google Sheet

Organize your data like this:

| Faculty Name | Department | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday |
|---|---|---|---|---|---|---|---|
| Dr. John Smith | Computer Science | CS101 9-10 | Office hrs | CS101 9-10 | Lab 10-11 | CS102 2-3 | - |
| Prof. Sarah Johnson | Mathematics | MATH201 9-10 | MATH202 10-11 | MATH201 9-10 | Office hrs | MATH203 1-2 | - |

### 5. Open in Browser

Simply open `index.html` in your web browser. Data will load automatically!

## 📋 Project Structure

```
faculty-timetable/
├── index.html              # Main HTML file
├── config.js               # Configuration & setup guide
├── script.js               # Main application logic
├── google-sheets-api.js    # Google Sheets API wrapper
├── styles.css              # Styling
├── README.md               # This file
└── LICENSE                 # MIT License
```

## 🛠️ Configuration Guide

### config.js Options

```javascript
CONFIG = {
    SHEET_ID: '',              // Your Google Sheet ID
    API_KEY: '',               // Your Google Sheets API Key
    SHEET_NAME: '',            // Tab name in your sheet
    DATA_RANGE: '',            // Data range (e.g., 'Sheet!A1:H100')
    REFRESH_INTERVAL: 30000,   // Sync interval in ms
    TIME_SLOTS: [...]          // Time slots for display
}
```

### Column Mapping

By default, columns are:
- **A**: Faculty Name
- **B**: Department  
- **C-H**: Monday through Saturday

Adjust in `config.js` if your layout differs.

## 🎯 Usage

### Searching Faculty
- Type in the search box to filter by name or department
- Results update instantly

### Filtering by Day
- Use the day dropdown to view a specific day's schedule
- Select "All Days" to see the full week

### Exporting Data
1. Select a faculty member
2. Click "Export to CSV"
3. File downloads to your computer

### Refreshing Data
- Click "Refresh Now" button to sync immediately
- Auto-sync happens every 30 seconds (configurable)

## ⚠️ Troubleshooting

### "Access Denied" Error
```
❌ Access Denied: Make sure your Google Sheet is shared publicly
```
**Solution:** 
- Open your Google Sheet
- Click Share → Set to "Anyone with the link can view"
- Ensure API is enabled in Google Cloud Console

### "Sheet not found" Error
```
❌ Sheet not found: Check SHEET_ID and SHEET_NAME
```
**Solution:**
- Extract SHEET_ID from your sheet URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- Verify SHEET_NAME matches your tab name (case-sensitive)
- Check DATA_RANGE covers all your data

### API Key Errors
```
❌ Error 403: Access Denied
```
**Solution:**
- Verify API Key is correct and not expired
- Enable "Google Sheets API" in Google Cloud Console
- Check if API Key restrictions are too strict

### No Data Loading
```
⏳ Loading faculty data from Google Sheets...
```
**Solution:**
- Check browser console (F12) for detailed errors
- Verify Google Sheet has data in columns A-H
- Ensure column A (Faculty Name) is not empty
- Wait 30 seconds for first auto-sync

### Browser Console Debugging

Press **F12** to open developer console and check for:
- ✅ Green messages = Success
- 🔄 Blue messages = Syncing
- ❌ Red messages = Errors

## 📱 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ⚠️ Limited |

## 🎨 Customization

### Change Refresh Interval
Edit `config.js`:
```javascript
REFRESH_INTERVAL: 60000  // Change 30000 to 60000 for 60 seconds
```

### Change Time Slots
Edit `config.js`:
```javascript
TIME_SLOTS: [
    '08:30-09:30',
    '09:30-10:30',
    // ... add your times
]
```

### Customize Styling
Edit `styles.css` to change colors, fonts, layout, etc.

## 📊 Data Format Examples

### Simple Format
```
Faculty Name | Dept | CS101 9-10 | MATH101 2-3 | ...
```

### Detailed Format
```
Faculty Name | Dept | 9-10: CS101, 10-11: Lab | ...
```

### Multiple Classes
```
Faculty Name | Dept | CS101 9-10, CS102 10-11 | ...
```

### Free/Break Slots
```
Faculty Name | Dept | CS101 9-10 | Break | Office hrs | ...
```

## 🚀 Deployment

### Local Testing
1. Open `index.html` directly in browser
2. Or use a local server: `python -m http.server 8000`

### Deploy to Web
1. Upload all files to your web server
2. Update API Key HTTP restrictions (if using domain)
3. Share sheet URL with others
4. Everyone can access via your URL

### GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in settings
3. Access via: `https://username.github.io/faculty-timetable`

## 📈 Performance Tips

- Use smaller `DATA_RANGE` if you have many rows
- Increase `REFRESH_INTERVAL` to reduce API calls
- Cache data locally if needed
- Use API Key restrictions to prevent abuse

## 🐛 Known Issues

- CORS may block requests on some networks (solution: ensure sheet is public)
- API calls limited to 300 per minute (usually not an issue)
- Large sheets (1000+ rows) may take longer to load

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share improvements

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 💡 Tips & Tricks

### Bulk Update
1. Make changes directly in Google Sheet
2. App auto-syncs within 30 seconds
3. No manual refresh needed!

### Department Search
- Search by department name (e.g., "Computer Science")
- Results show all faculty in that department

### Weekly Planning
1. Export each faculty's schedule
2. Print or share CSV files
3. Great for physical timetables

### Integration Ideas
- Email notifications for schedule changes
- SMS alerts for cancellations
- Calendar integration (iCal format)
- Attendance tracking
- Substitute faculty management

## 📞 Support

- Check browser console for error details
- Review troubleshooting section
- Verify all configuration values
- Ensure Google Sheet is public
- Check API Key is valid

## 🎓 Educational Use

Perfect for:
- Universities and colleges
- Schools and institutes
- Training centers
- Corporate training
- Online course management

## ⭐ Features Coming Soon

- 🔔 Email notifications
- 📧 Email export
- 📱 Mobile app
- 🔐 User authentication
- 📊 Analytics dashboard
- 🌍 Multi-language support
- 🎯 Room allocation
- 👥 Student enrollment tracking

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [REST API Guide](https://sheets.googleapis.com/)

---

**Made with ❤️ for educational institutions worldwide**

Last Updated: September 14, 2024  
Version: 2.0 (Google Sheets Integration)
