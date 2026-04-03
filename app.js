// JavaScript code for the dormitory management system
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    loadData();
    setupEventListeners();
});

function setupEventListeners() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showSection(event.target.getAttribute('href').substring(1));
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function loadData() {
    loadRooms();
    loadTenants();
    loadContracts();
    loadPayments();
    updateReports();
}

function updateReports() {
    // Call the report functions from reports.js to update the report section
    updateAvailableRooms();
    updateOccupiedRooms();
    updateMonthlyRevenue();
}