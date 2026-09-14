// Sample faculty timetable data
// Replace this with your actual data from Google Sheets

const facultyData = [
    {
        id: 1,
        name: "Dr. John Smith",
        department: "Computer Science",
        email: "john.smith@university.edu",
        timetable: {
            "08:00-09:00": { Monday: "CS101 - Web Dev", Tuesday: "Office Hours", Wednesday: "CS101 - Web Dev", Thursday: "Office Hours", Friday: "CS101 - Web Dev", Saturday: "Free" },
            "09:00-10:00": { Monday: "CS101 - Web Dev", Tuesday: "CS201 - Database", Wednesday: "CS101 - Web Dev", Thursday: "CS201 - Database", Friday: "CS101 - Web Dev", Saturday: "Free" },
            "10:00-11:00": { Monday: "Break", Tuesday: "Break", Wednesday: "Break", Thursday: "Break", Friday: "Break", Saturday: "Free" },
            "11:00-12:00": { Monday: "CS201 - Database", Tuesday: "CS101 - Web Dev", Wednesday: "CS201 - Database", Thursday: "CS101 - Web Dev", Wednesday: "CS201 - Database", Saturday: "Free" },
            "12:00-01:00": { Monday: "Lunch", Tuesday: "Lunch", Wednesday: "Lunch", Thursday: "Lunch", Friday: "Lunch", Saturday: "Free" },
            "01:00-02:00": { Monday: "Office Hours", Tuesday: "Research", Wednesday: "Office Hours", Thursday: "Research", Friday: "Office Hours", Saturday: "Free" },
            "02:00-03:00": { Monday: "Research", Tuesday: "CS301 - AI", Wednesday: "Research", Thursday: "CS301 - AI", Friday: "Research", Saturday: "Free" }
        }
    },
    {
        id: 2,
        name: "Prof. Sarah Johnson",
        department: "Mathematics",
        email: "sarah.johnson@university.edu",
        timetable: {
            "08:00-09:00": { Monday: "MATH101 - Calculus", Tuesday: "MATH102 - Algebra", Wednesday: "MATH101 - Calculus", Thursday: "MATH102 - Algebra", Friday: "MATH101 - Calculus", Saturday: "Free" },
            "09:00-10:00": { Monday: "MATH101 - Calculus", Tuesday: "MATH102 - Algebra", Wednesday: "MATH101 - Calculus", Thursday: "MATH102 - Algebra", Friday: "MATH101 - Calculus", Saturday: "Free" },
            "10:00-11:00": { Monday: "Break", Tuesday: "Break", Wednesday: "Break", Thursday: "Break", Friday: "Break", Saturday: "Free" },
            "11:00-12:00": { Monday: "MATH102 - Algebra", Tuesday: "MATH101 - Calculus", Wednesday: "MATH102 - Algebra", Thursday: "MATH101 - Calculus", Friday: "MATH102 - Algebra", Saturday: "Free" },
            "12:00-01:00": { Monday: "Lunch", Tuesday: "Lunch", Wednesday: "Lunch", Thursday: "Lunch", Friday: "Lunch", Saturday: "Free" },
            "01:00-02:00": { Monday: "Office Hours", Tuesday: "Research", Wednesday: "Office Hours", Thursday: "Research", Friday: "Office Hours", Saturday: "Free" },
            "02:00-03:00": { Monday: "Research", Tuesday: "Seminar", Wednesday: "Research", Thursday: "Seminar", Friday: "Research", Saturday: "Free" }
        }
    },
    {
        id: 3,
        name: "Dr. Michael Brown",
        department: "Physics",
        email: "michael.brown@university.edu",
        timetable: {
            "08:00-09:00": { Monday: "PHYS101 - Mechanics", Tuesday: "Office Hours", Wednesday: "PHYS101 - Mechanics", Thursday: "Office Hours", Friday: "PHYS101 - Mechanics", Saturday: "Free" },
            "09:00-10:00": { Monday: "PHYS101 - Mechanics", Tuesday: "PHYS201 - Thermodynamics", Wednesday: "PHYS101 - Mechanics", Thursday: "PHYS201 - Thermodynamics", Friday: "PHYS101 - Mechanics", Saturday: "Free" },
            "10:00-11:00": { Monday: "Break", Tuesday: "Break", Wednesday: "Break", Thursday: "Break", Friday: "Break", Saturday: "Free" },
            "11:00-12:00": { Monday: "Lab Setup", Tuesday: "PHYS101 - Mechanics", Wednesday: "Lab Setup", Thursday: "PHYS101 - Mechanics", Friday: "Lab Setup", Saturday: "Free" },
            "12:00-01:00": { Monday: "Lunch", Tuesday: "Lunch", Wednesday: "Lunch", Thursday: "Lunch", Friday: "Lunch", Saturday: "Free" },
            "01:00-02:00": { Monday: "Lab Session", Tuesday: "Lab Session", Wednesday: "Lab Session", Thursday: "Lab Session", Friday: "Lab Session", Saturday: "Free" },
            "02:00-03:00": { Monday: "Research", Tuesday: "Research", Wednesday: "Research", Thursday: "Research", Friday: "Research", Saturday: "Free" }
        }
    },
    {
        id: 4,
        name: "Dr. Emily White",
        department: "Chemistry",
        email: "emily.white@university.edu",
        timetable: {
            "08:00-09:00": { Monday: "CHEM101 - Basics", Tuesday: "Office Hours", Wednesday: "CHEM101 - Basics", Thursday: "Office Hours", Friday: "CHEM101 - Basics", Saturday: "Free" },
            "09:00-10:00": { Monday: "CHEM101 - Basics", Tuesday: "CHEM201 - Organic", Wednesday: "CHEM101 - Basics", Thursday: "CHEM201 - Organic", Friday: "CHEM101 - Basics", Saturday: "Free" },
            "10:00-11:00": { Monday: "Break", Tuesday: "Break", Wednesday: "Break", Thursday: "Break", Friday: "Break", Saturday: "Free" },
            "11:00-12:00": { Monday: "Lab Prep", Tuesday: "Lab Prep", Wednesday: "Lab Prep", Thursday: "Lab Prep", Friday: "Lab Prep", Saturday: "Free" },
            "12:00-01:00": { Monday: "Lunch", Tuesday: "Lunch", Wednesday: "Lunch", Thursday: "Lunch", Friday: "Lunch", Saturday: "Free" },
            "01:00-02:00": { Monday: "Lab Session", Tuesday: "Lab Session", Wednesday: "Lab Session", Thursday: "Lab Session", Friday: "Lab Session", Saturday: "Free" },
            "02:00-03:00": { Monday: "Research", Tuesday: "Research", Wednesday: "Seminar", Thursday: "Research", Friday: "Research", Saturday: "Free" }
        }
    },
    {
        id: 5,
        name: "Prof. David Lee",
        department: "English",
        email: "david.lee@university.edu",
        timetable: {
            "08:00-09:00": { Monday: "ENG101 - Literature", Tuesday: "ENG102 - Writing", Wednesday: "ENG101 - Literature", Thursday: "ENG102 - Writing", Friday: "ENG101 - Literature", Saturday: "Free" },
            "09:00-10:00": { Monday: "ENG101 - Literature", Tuesday: "ENG102 - Writing", Wednesday: "ENG101 - Literature", Thursday: "ENG102 - Writing", Friday: "ENG101 - Literature", Saturday: "Free" },
            "10:00-11:00": { Monday: "Break", Tuesday: "Break", Wednesday: "Break", Thursday: "Break", Friday: "Break", Saturday: "Free" },
            "11:00-12:00": { Monday: "ENG102 - Writing", Tuesday: "ENG201 - Drama", Wednesday: "ENG102 - Writing", Thursday: "ENG201 - Drama", Friday: "ENG102 - Writing", Saturday: "Free" },
            "12:00-01:00": { Monday: "Lunch", Tuesday: "Lunch", Wednesday: "Lunch", Thursday: "Lunch", Friday: "Lunch", Saturday: "Free" },
            "01:00-02:00": { Monday: "Office Hours", Tuesday: "Research", Wednesday: "Office Hours", Thursday: "Research", Friday: "Office Hours", Saturday: "Free" },
            "02:00-03:00": { Monday: "Grading", Tuesday: "Committee", Wednesday: "Grading", Thursday: "Committee", Friday: "Grading", Saturday: "Free" }
        }
    }
];

// Export data for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = facultyData;
}
