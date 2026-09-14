// Google Sheets API Integration
// Handles all communication with Google Sheets

class GoogleSheetsAPI {
    constructor(config) {
        this.sheetId = config.SHEET_ID;
        this.apiKey = config.API_KEY;
        this.sheetName = config.SHEET_NAME;
        this.dataRange = config.DATA_RANGE;
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    }

    /**
     * Fetch data from Google Sheets
     * @returns {Promise<Array>} Array of rows from the sheet
     */
    async fetchData() {
        try {
            if (this.apiKey === 'YOUR_GOOGLE_SHEETS_API_KEY') {
                throw new Error('❌ API Key not configured! Please update config.js with your Google Sheets API Key');
            }

            const url = `${this.baseUrl}/${this.sheetId}/values/${encodeURIComponent(this.dataRange)}?key=${this.apiKey}`;
            
            console.log('📡 Fetching data from Google Sheets...');
            const response = await fetch(url);

            if (!response.ok) {
                const error = await response.json();
                if (response.status === 403) {
                    throw new Error('❌ Access Denied: Make sure your Google Sheet is shared publicly or check API Key');
                } else if (response.status === 404) {
                    throw new Error('❌ Sheet not found: Check SHEET_ID and SHEET_NAME in config.js');
                } else {
                    throw new Error(`❌ Error ${response.status}: ${error.error.message}`);
                }
            }

            const data = await response.json();
            
            if (!data.values || data.values.length === 0) {
                throw new Error('❌ No data found in the sheet. Check your data range.');
            }

            console.log('✅ Data fetched successfully!');
            return data.values;
        } catch (error) {
            console.error('Error fetching Google Sheets data:', error);
            throw error;
        }
    }

    /**
     * Parse raw sheet data into structured format
     * @param {Array} rawData - Raw data from Google Sheets
     * @returns {Object} Structured faculty data
     */
    parseData(rawData) {
        try {
            const facultyData = {};
            
            // Skip header row (row 0)
            for (let i = 1; i < rawData.length; i++) {
                const row = rawData[i];
                
                if (!row || row.length < 2) continue; // Skip empty rows
                
                const facultyName = row[0]?.trim();
                const department = row[1]?.trim() || 'N/A';
                
                if (!facultyName) continue;
                
                // Parse timetable data for each day
                const timetable = {
                    Monday: this.parseTimeSlots(row[2] || ''),
                    Tuesday: this.parseTimeSlots(row[3] || ''),
                    Wednesday: this.parseTimeSlots(row[4] || ''),
                    Thursday: this.parseTimeSlots(row[5] || ''),
                    Friday: this.parseTimeSlots(row[6] || ''),
                    Saturday: this.parseTimeSlots(row[7] || '')
                };
                
                facultyData[facultyName] = {
                    name: facultyName,
                    department: department,
                    timetable: timetable,
                    rawRow: row
                };
            }
            
            console.log(`✅ Parsed ${Object.keys(facultyData).length} faculty members`);
            return facultyData;
        } catch (error) {
            console.error('Error parsing Google Sheets data:', error);
            throw error;
        }
    }

    /**
     * Parse time slots from a cell
     * Handles formats like "CS101 9-10, CS102 10-11" or "9-10: CS101"
     * @param {String} cellData - Raw cell data
     * @returns {Array} Array of time slot objects
     */
    parseTimeSlots(cellData) {
        if (!cellData || cellData.trim() === '') return [];
        
        const timeSlots = [];
        
        // Split by comma if multiple classes
        const entries = cellData.split(',').map(e => e.trim());
        
        entries.forEach(entry => {
            if (entry) {
                timeSlots.push({
                    time: entry.split(':')[0]?.trim() || 'N/A',
                    class: entry.includes(':') ? entry.split(':')[1]?.trim() : entry,
                    raw: entry
                });
            }
        });
        
        return timeSlots;
    }

    /**
     * Get all faculty names
     * @param {Object} facultyData - Parsed faculty data
     * @returns {Array} Array of faculty names
     */
    getFacultyNames(facultyData) {
        return Object.keys(facultyData).sort();
    }

    /**
     * Get specific faculty data
     * @param {String} facultyName - Name of the faculty
     * @param {Object} facultyData - Parsed faculty data
     * @returns {Object} Faculty data or null
     */
    getFacultyByName(facultyName, facultyData) {
        return facultyData[facultyName] || null;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleSheetsAPI;
}
