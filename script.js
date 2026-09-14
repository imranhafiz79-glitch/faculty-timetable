// Main Application Script
// Handles UI updates and real-time synchronization with Google Sheets

class FacultyTimetableApp {
    constructor(config) {
        this.config = config;
        this.api = new GoogleSheetsAPI(config);
        this.facultyData = {};
        this.selectedFaculty = null;
        this.filteredFaculty = [];
        this.refreshInterval = null;
        
        // DOM Elements
        this.syncStatus = document.getElementById('syncStatus');
        this.lastSyncTime = document.getElementById('lastSyncTime');
        this.facultyListContainer = document.getElementById('facultyListContainer');
        this.timetableTable = document.getElementById('timetableTable');
        this.timetableBody = document.getElementById('timetableBody');
        this.selectedFacultyTitle = document.getElementById('selectedFacultyTitle');
        this.searchInput = document.getElementById('searchFaculty');
        this.filterDay = document.getElementById('filterDay');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.exportBtn = document.getElementById('exportBtn');
        
        this.initializeEventListeners();
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            this.filterFacultyList(e.target.value);
        });

        // Day filter
        this.filterDay.addEventListener('change', (e) => {
            if (this.selectedFaculty) {
                this.renderTimetable(this.selectedFaculty, e.target.value);
            }
        });

        // Refresh button
        this.refreshBtn.addEventListener('click', () => {
            this.syncData();
        });

        // Export button
        this.exportBtn.addEventListener('click', () => {
            this.exportToCSV();
        });
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('🚀 Initializing Faculty Timetable App...');
        try {
            await this.syncData();
            this.startAutoSync();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.updateSyncStatus('❌ Failed to load data', 'error');
        }
    }

    /**
     * Sync data from Google Sheets
     */
    async syncData() {
        try {
            this.updateSyncStatus('🔄 Syncing with Google Sheets...', 'syncing');
            
            const rawData = await this.api.fetchData();
            this.facultyData = this.api.parseData(rawData);
            
            this.renderFacultyList();
            this.updateSyncStatus('✅ Synced successfully', 'success');
            this.updateLastSyncTime();
            
            return true;
        } catch (error) {
            console.error('Sync error:', error);
            this.updateSyncStatus(`❌ ${error.message}`, 'error');
            return false;
        }
    }

    /**
     * Start auto-sync with interval
     */
    startAutoSync() {
        // Clear existing interval if any
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        // Set up new interval
        this.refreshInterval = setInterval(() => {
            console.log('⏰ Auto-syncing...');
            this.syncData();
        }, this.config.REFRESH_INTERVAL);

        console.log(`⏰ Auto-sync started (every ${this.config.REFRESH_INTERVAL / 1000} seconds)`);
    }

    /**
     * Stop auto-sync
     */
    stopAutoSync() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
            console.log('⏹️ Auto-sync stopped');
        }
    }

    /**
     * Render faculty list
     */
    renderFacultyList() {
        const facultyNames = this.api.getFacultyNames(this.facultyData);
        this.filteredFaculty = facultyNames;

        this.facultyListContainer.innerHTML = '';

        if (facultyNames.length === 0) {
            this.facultyListContainer.innerHTML = '<p class="no-data">No faculty data available</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'faculty-list-items';

        facultyNames.forEach(name => {
            const li = document.createElement('li');
            li.className = 'faculty-item';
            
            const faculty = this.facultyData[name];
            li.innerHTML = `
                <div class="faculty-info">
                    <strong>${name}</strong>
                    <span class="department">${faculty.department}</span>
                </div>
            `;

            li.addEventListener('click', () => {
                this.selectFaculty(name);
            });

            ul.appendChild(li);
        });

        this.facultyListContainer.appendChild(ul);
    }

    /**
     * Filter faculty list based on search term
     */
    filterFacultyList(searchTerm) {
        const term = searchTerm.toLowerCase();
        const allFaculty = this.api.getFacultyNames(this.facultyData);
        
        this.filteredFaculty = allFaculty.filter(name => {
            const faculty = this.facultyData[name];
            return name.toLowerCase().includes(term) || 
                   faculty.department.toLowerCase().includes(term);
        });

        // Re-render with filtered list
        this.facultyListContainer.innerHTML = '';

        if (this.filteredFaculty.length === 0) {
            this.facultyListContainer.innerHTML = '<p class="no-data">No faculty found</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'faculty-list-items';

        this.filteredFaculty.forEach(name => {
            const li = document.createElement('li');
            li.className = 'faculty-item';
            
            const faculty = this.facultyData[name];
            li.innerHTML = `
                <div class="faculty-info">
                    <strong>${name}</strong>
                    <span class="department">${faculty.department}</span>
                </div>
            `;

            li.addEventListener('click', () => {
                this.selectFaculty(name);
            });

            ul.appendChild(li);
        });

        this.facultyListContainer.appendChild(ul);
    }

    /**
     * Select a faculty member
     */
    selectFaculty(facultyName) {
        this.selectedFaculty = facultyName;
        this.selectedFacultyTitle.textContent = `📋 ${facultyName}'s Timetable`;
        
        // Highlight selected faculty
        document.querySelectorAll('.faculty-item').forEach(item => {
            item.classList.remove('active');
            if (item.textContent.includes(facultyName)) {
                item.classList.add('active');
            }
        });

        // Reset day filter
        this.filterDay.value = '';
        this.renderTimetable(facultyName);
    }

    /**
     * Render timetable for selected faculty
     */
    renderTimetable(facultyName, dayFilter = '') {
        const faculty = this.api.getFacultyByName(facultyName, this.facultyData);
        
        if (!faculty) {
            this.timetableBody.innerHTML = '<tr><td colspan="7" class="no-data">Faculty not found</td></tr>';
            return;
        }

        const timetable = faculty.timetable;
        this.timetableBody.innerHTML = '';

        // Get days to display
        const daysToShow = dayFilter 
            ? [dayFilter] 
            : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Render rows for each time slot
        this.config.TIME_SLOTS.forEach((timeSlot, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="time-slot">${timeSlot}</td>`;

            daysToShow.forEach(day => {
                const cellData = timetable[day];
                const cell = document.createElement('td');
                cell.className = 'class-cell';

                if (cellData && cellData.length > 0) {
                    const cellContent = cellData
                        .map(slot => `<div class="class-item">${slot.class}</div>`)
                        .join('');
                    cell.innerHTML = cellContent;
                    cell.classList.add('has-class');
                } else {
                    cell.textContent = '-';
                }

                row.appendChild(cell);
            });

            this.timetableBody.appendChild(row);
        });
    }

    /**
     * Export timetable to CSV
     */
    exportToCSV() {
        if (!this.selectedFaculty) {
            alert('Please select a faculty member first');
            return;
        }

        const faculty = this.facultyData[this.selectedFaculty];
        const lines = [];
        
        // Header
        lines.push(`Faculty Timetable Export - ${this.selectedFaculty}`);
        lines.push(`Department: ${faculty.department}`);
        lines.push(`Exported: ${new Date().toLocaleString()}`);
        lines.push('');
        
        // Timetable header
        lines.push('Time Slot,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday');
        
        // Timetable data
        this.config.TIME_SLOTS.forEach((timeSlot, index) => {
            const row = [timeSlot];
            
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
                const cellData = faculty.timetable[day];
                const cellValue = cellData && cellData.length > 0
                    ? cellData.map(slot => slot.class).join('; ')
                    : '-';
                row.push(`"${cellValue}"`);
            });
            
            lines.push(row.join(','));
        });

        // Create and download file
        const csvContent = lines.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `${this.selectedFaculty}-timetable.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Exported to CSV:', `${this.selectedFaculty}-timetable.csv`);
    }

    /**
     * Update sync status display
     */
    updateSyncStatus(message, status = 'default') {
        this.syncStatus.textContent = message;
        this.syncStatus.className = `sync-status ${status}`;
    }

    /**
     * Update last sync time display
     */
    updateLastSyncTime() {
        const now = new Date();
        this.lastSyncTime.textContent = now.toLocaleTimeString();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Loaded, initializing app...');
    const app = new FacultyTimetableApp(CONFIG);
    app.initialize();
    
    // Make app available globally for debugging
    window.app = app;
});
