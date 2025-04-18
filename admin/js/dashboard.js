// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 2]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    const usersChart = new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Users',
                data: [500, 600, 450, 700, 800, 1000],
                backgroundColor: '#2196F3',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 2]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('.dashboard-sidebar').classList.toggle('active');
        this.classList.toggle('active');
    });

    // Notifications Dropdown
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            // Add notification dropdown functionality here
            console.log('Notifications clicked');
        });
    }

    // User Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Add user profile dropdown functionality here
            console.log('User profile clicked');
        });
    }

    // Search Functionality
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            // Add search functionality here
            console.log('Search query:', e.target.value);
        });
    }

    // Table Row Actions
    const tableRows = document.querySelectorAll('.dashboard-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Add row click functionality here
            console.log('Row clicked:', this);
        });
    });

    // Responsive Chart Resizing
    function resizeCharts() {
        revenueChart.resize();
        usersChart.resize();
    }

    window.addEventListener('resize', resizeCharts);
});