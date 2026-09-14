# Faculty Timetable Management System

A web-based application for managing and displaying individual faculty timetables. This system allows universities and educational institutions to easily organize and view faculty schedules.

## 📋 Features

- **Faculty Directory**: Browse all faculty members by name and department
- **Interactive Timetable**: View detailed weekly schedules for each faculty member
- **Search Functionality**: Quickly find faculty members by name
- **Day Filtering**: Filter timetable view by specific days
- **Export to CSV**: Download faculty timetables for external use
- **Import from Google Sheets**: Easily import faculty data from CSV format
- **Print Support**: Print individual faculty timetables
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual Status Indicators**: Different colors for classes, breaks, lunch, and free time

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imranhafiz79-glitch/faculty-timetable.git
   cd faculty-timetable
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local web server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Access the application**
   - Open `http://localhost:8000` (or your server port)

## 📖 Usage Guide

### Viewing Faculty Timetables

1. **Select a Faculty Member**
   - Click on any faculty name in the left sidebar
   - The faculty's complete timetable will display

2. **Search Faculty**
   - Use the search box at the top to find faculty by name
   - Matches appear in real-time as you type

3. **Filter by Day**
   - Use the "All Days" dropdown to view specific days only
   - Useful for detailed single-day analysis

### Exporting Data

1. **Export to CSV**
   - Select a faculty member
   - Click "Export to CSV" button
   - File downloads automatically with faculty name

2. **CSV Format**
   The exported file includes:
   - Faculty name and department
   - Email address
   - Complete weekly schedule
   - Time slots and class information

### Importing from Google Sheets

1. **Prepare Your Data**
   - Organize data in Google Sheets with columns: Faculty Name, Department, Time Slots, Monday-Saturday
   - Export the sheet as CSV

2. **Import Process**
   - Click "Import from Google Sheet" button
   - Paste CSV content in the text area
   - Click "Process Import"
   - New faculty members are added to the system

3. **CSV Format for Import**
   ```
   Faculty,Department,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday
   Dr. John Smith,Computer Science,CS101 - Web Dev,CS201 - Database,...
   ```

### Printing Timetables

- Select a faculty member
- Use browser's Print function (Ctrl+P or Cmd+P)
- Timetable is formatted for clean printing

## 📁 Project Structure

```
faculty-timetable/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── data.js             # Sample faculty data
├── script.js           # Core functionality and logic
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🎨 User Interface

### Header Section
- Title and application name
- Search box for faculty lookup
- Day filter dropdown
- Export and Import buttons

### Main Content Area
- **Left Sidebar**: Faculty member list with selection
- **Main Panel**: Selected faculty timetable display

### Timetable Display
- Time slots in first column
- Days of week as column headers
- Color-coded class types:
  - **Blue**: Regular classes
  - **Green**: Free time
  - **Orange**: Breaks and lunch
  - **Red**: Cancelled classes

## 📊 Data Format

### Faculty Object Structure
```javascript
{
    id: 1,
    name: "Dr. John Smith",
    department: "Computer Science",
    email: "john.smith@university.edu",
    timetable: {
        "08:00-09:00": {
            "Monday": "CS101 - Web Dev",
            "Tuesday": "Office Hours",
            // ... rest of week
        }
        // ... rest of time slots
    }
}
```

## 🔧 Customization

### Adding Sample Data

Edit `data.js` to add more faculty members:

```javascript
const facultyData = [
    {
        id: 1,
        name: "Your Name",
        department: "Your Department",
        email: "email@university.edu",
        timetable: {
            "08:00-09:00": {
                "Monday": "CLASS101",
                "Tuesday": "Office Hours",
                // ... etc
            }
        }
    }
    // Add more faculty...
];
```

### Modifying Time Slots

In `script.js`, update the `generateDefaultTimeSlots()` function:

```javascript
function generateDefaultTimeSlots() {
    return [
        '08:00-09:00',
        '09:00-10:00',
        // Add or modify time slots as needed
    ];
}
```

### Styling Changes

Edit `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Responsive breakpoints
- Font sizes and families

## 🌐 Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Internet Explorer 11: ⚠️ Limited support

## 📱 Responsive Features

- **Desktop**: Full grid layout with sidebar and main panel
- **Tablet**: Adapted layout with scrollable timetable
- **Mobile**: Stacked layout with horizontal scrolling for timetable

## 🔒 Data Privacy

- All data is stored locally in the browser
- No data is sent to external servers
- Import/Export functions work entirely client-side
- Clear browser cache to remove all data

## 🐛 Troubleshooting

### Issue: Timetable not displaying
**Solution**: Ensure a faculty member is selected from the left sidebar

### Issue: Import not working
**Solution**: Verify CSV format matches expected structure with correct headers

### Issue: Export file not downloading
**Solution**: Check browser download settings and permissions

### Issue: Layout looks broken on mobile
**Solution**: Clear browser cache and refresh page (Ctrl+Shift+R)

## 💡 Tips & Tricks

1. **Keyboard Navigation**: Use Tab to navigate between faculty members
2. **Quick Search**: Start typing faculty name - search auto-activates
3. **Batch Operations**: Export multiple timetables and compile in Excel
4. **Data Backup**: Regularly export faculty data as CSV backup
5. **Mobile Access**: Bookmark on mobile device for quick access

## 📈 Future Enhancements

Potential features for future versions:
- Database integration for persistent storage
- User authentication and role-based access
- Real-time timetable updates
- Email notifications for schedule changes
- Integration with calendar applications
- Advanced conflict detection
- Analytics and reporting dashboard
- Multi-language support

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License. See LICENSE file for details.

## 👨‍💼 Support

For issues, questions, or suggestions:
- Open an GitHub Issue
- Contact: imranhafiz79@gmail.com
- Check existing documentation above

## 🙏 Acknowledgments

- Built with vanilla JavaScript (no external dependencies)
- Inspired by educational institution scheduling needs
- Designed for ease of use and accessibility

---

**Version**: 1.0.0  
**Last Updated**: September 2024  
**Author**: Imran Hafiz

Happy scheduling! 📚✨
