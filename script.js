// Main JavaScript functionality for Faculty Timetable

let selectedFaculty = null;
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadFacultyList();
    setupEventListeners();
});

// Load and display faculty list
function loadFacultyList() {
    const container = document.getElementById('facultyListContainer');
    container.innerHTML = '';

    facultyData.forEach(faculty => {
        const facultyItem = document.createElement('div');
        facultyItem.className = 'faculty-item';
        facultyItem.textContent = faculty.name;
        facultyItem.dataset.id = faculty.id;

        facultyItem.addEventListener('click', () => {
            selectFaculty(faculty.id);
        });

        container.appendChild(facultyItem);
    });
}

// Select a faculty and display their timetable
function selectFaculty(facultyId) {
    selectedFaculty = facultyData.find(f => f.id === facultyId);

    if (!selectedFaculty) return;

    // Update active state
    document.querySelectorAll('.faculty-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.id) === facultyId) {
            item.classList.add('active');
        }
    });

    // Update title
    document.getElementById('selectedFacultyTitle').textContent = `${selectedFaculty.name} - ${selectedFaculty.department}`;

    // Render timetable
    renderTimetable();
}

// Render the timetable for selected faculty
function renderTimetable() {
    if (!selectedFaculty) return;

    const tbody = document.getElementById('timetableBody');
    tbody.innerHTML = '';

    const timeSlots = Object.keys(selectedFaculty.timetable);
    const filterDay = document.getElementById('filterDay').value;

    timeSlots.forEach(timeSlot => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.className = 'time-slot';
        timeCell.textContent = timeSlot;
        row.appendChild(timeCell);

        const daysToShow = filterDay ? [filterDay] : days;

        daysToShow.forEach(day => {
            const cell = document.createElement('td');
            const classInfo = selectedFaculty.timetable[timeSlot][day] || 'Free';

            if (classInfo === 'Free') {
                cell.innerHTML = `<div class="class-info free">${classInfo}</div>`;
            } else if (classInfo.toLowerCase().includes('break')) {
                cell.innerHTML = `<div class="class-info break">${classInfo}</div>`;
            } else if (classInfo.toLowerCase().includes('lunch')) {
                cell.innerHTML = `<div class="class-info break">${classInfo}</div>`;
            } else if (classInfo.toLowerCase().includes('cancelled')) {
                cell.innerHTML = `<div class="class-info cancelled">${classInfo}</div>`;
            } else {
                cell.innerHTML = `<div class="class-info">${classInfo}</div>`;
            }

            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search faculty
    document.getElementById('searchFaculty').addEventListener('input', (e) => {
        filterFacultyList(e.target.value);
    });

    // Filter by day
    document.getElementById('filterDay').addEventListener('change', () => {
        if (selectedFaculty) {
            renderTimetable();
        }
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);

    // Import button
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importSection').style.display =
            document.getElementById('importSection').style.display === 'none' ? 'block' : 'none';
    });

    // Process import button
    document.getElementById('processImportBtn').addEventListener('click', processImport);
}

// Filter faculty list by name
function filterFacultyList(searchTerm) {
    const items = document.querySelectorAll('.faculty-item');
    items.forEach(item => {
        const facultyName = item.textContent.toLowerCase();
        if (facultyName.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Export timetable to CSV
function exportToCSV() {
    if (!selectedFaculty) {
        alert('Please select a faculty member first');
        return;
    }

    let csv = `Faculty Timetable - ${selectedFaculty.name}\n`;
    csv += `Department: ${selectedFaculty.department}\n`;
    csv += `Email: ${selectedFaculty.email}\n\n`;

    // Add header row
    csv += 'Time Slot,' + days.join(',') + '\n';

    // Add timetable data
    const timeSlots = Object.keys(selectedFaculty.timetable);
    timeSlots.forEach(timeSlot => {
        let row = `"${timeSlot}"`;
        days.forEach(day => {
            const classInfo = selectedFaculty.timetable[timeSlot][day] || 'Free';
            row += `,"${classInfo}"`;
        });
        csv += row + '\n';
    });

    // Download CSV
    downloadCSV(csv, `${selectedFaculty.name.replace(/\s+/g, '_')}_timetable.csv`);
}

// Download CSV file
function downloadCSV(csv, filename) {
    const link = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Process CSV import from Google Sheet
function processImport() {
    const csvInput = document.getElementById('csvInput').value;

    if (!csvInput.trim()) {
        alert('Please paste CSV data first');
        return;
    }

    try {
        const lines = csvInput.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        // Validate headers
        if (headers[0].toLowerCase() !== 'faculty' && headers[0].toLowerCase() !== 'name') {
            alert('CSV must have a "Faculty" or "Name" column as the first column');
            return;
        }

        // Parse CSV data
        const importedFaculty = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            const values = parseCSVLine(lines[i]);

            const facultyName = values[0];
            const department = values[1] || 'Department';

            const timetable = {};
            const timeSlots = lines[0].split(',').length > 2 ? 
                extractTimeSlots(lines) : 
                generateDefaultTimeSlots();

            timeSlots.forEach((slot, index) => {
                if (!timetable[slot]) {
                    timetable[slot] = {};
                }
                days.forEach((day, dayIndex) => {
                    const valueIndex = dayIndex + 2;
                    timetable[slot][day] = values[valueIndex] || 'Free';
                });
            });

            importedFaculty.push({
                id: facultyData.length + importedFaculty.length + 1,
                name: facultyName,
                department: department,
                email: `${facultyName.replace(/\s+/g, '.')}@university.edu`,
                timetable: timetable
            });
        }

        // Add imported faculty to data
        facultyData.push(...importedFaculty);

        // Reload UI
        loadFacultyList();
        document.getElementById('csvInput').value = '';
        document.getElementById('importSection').style.display = 'none';

        alert(`Successfully imported ${importedFaculty.length} faculty member(s)`);
    } catch (error) {
        alert('Error parsing CSV: ' + error.message);
        console.error(error);
    }
}

// Parse CSV line handling quoted values
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

// Extract time slots from CSV
function extractTimeSlots(lines) {
    const slots = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = parseCSVLine(lines[i]);
            slots.push(values[0]);
        }
    }
    return slots;
}

// Generate default time slots
function generateDefaultTimeSlots() {
    return [
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-01:00',
        '01:00-02:00',
        '02:00-03:00'
    ];
}

// Utility function to print timetable
function printTimetable() {
    if (!selectedFaculty) {
        alert('Please select a faculty member first');
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
        <head>
            <title>${selectedFaculty.name} Timetable</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #2c3e50; }
                table { border-collapse: collapse; width: 100%; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                th { background-color: #34495e; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
        </head>
        <body>
            <h1>${selectedFaculty.name}</h1>
            <p><strong>Department:</strong> ${selectedFaculty.department}</p>
            <p><strong>Email:</strong> ${selectedFaculty.email}</p>
            ${document.getElementById('timetableTable').outerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
