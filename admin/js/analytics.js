// Analytics Dashboard Initialization
function initializeAnalyticsDashboard() {
    try {
        // Initialize Charts if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js library not loaded');
        }

        // Mobile Menu Toggle
        initializeMobileMenu();

        // Initialize Charts
        initializeTrafficSourcesChart();
        initializeUserEngagementChart();

        // Initialize Event Listeners
        initializeEventListeners();

        // Initial data load
        updateAnalytics('7');
    } catch (error) {
        console.error('Analytics initialization failed:', error);
        showErrorMessage('Failed to initialize analytics dashboard');
    }
}

function showErrorMessage(message) {
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #f44336;"></i>
                <h2>${message}</h2>
                <p>Please try refreshing the page. If the problem persists, contact support.</p>
            </div>
        `;
    }
}

function initializeMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const header = document.querySelector('.dashboard-header');
    if (header) {
        header.prepend(menuToggle);
        menuToggle.addEventListener('click', function() {
            document.querySelector('.dashboard-sidebar')?.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function initializeEventListeners() {
    // Date Range Picker
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function(e) {
            updateAnalytics(e.target.value);
        });
    }

    // Export Report Button
    const exportButton = document.querySelector('.btn-secondary');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportAnalyticsReport();
        });
    }
}

// Chart Initialization Functions
function initializeTrafficSourcesChart() {
    const canvas = document.getElementById('trafficSourcesChart');
    if (!canvas) {
        console.error('Traffic sources chart canvas not found');
        return;
    }

    try {
        const ctx = canvas.getContext('2d');
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Organic Search', 'Social Media', 'Referral'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: [
                        '#2196F3',
                        '#4CAF50',
                        '#FF9800',
                        '#E91E63'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Failed to initialize traffic sources chart:', error);
        return null;
    }
}

function initializeUserEngagementChart() {
    const canvas = document.getElementById('userEngagementChart');
    if (!canvas) {
        console.error('User engagement chart canvas not found');
        return;
    }

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [1500, 1800, 1600, 2100, 1900, 1700, 2000],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Page Views',
                    data: [4500, 5200, 4800, 6000, 5500, 5000, 5800],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
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
    } catch (error) {
        console.error('Failed to initialize user engagement chart:', error);
    }

// Update Analytics Data
function updateAnalytics(dateRange) {
    try {
        // Show loading state
        document.querySelectorAll('.stat-number').forEach(el => {
            el.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        });

        // Simulate API call delay
        setTimeout(() => {
            // Update stats based on date range
            const stats = getAnalyticsData(dateRange);
            updateStatCards(stats);
            updateCharts(stats);
        }, 500);
    } catch (error) {
        console.error('Failed to update analytics:', error);
        showErrorMessage('Failed to update analytics data');
    }
}

function getAnalyticsData(dateRange) {
    // Simulate different data for different date ranges
    const multiplier = dateRange === '7' ? 1 : dateRange === '30' ? 4 : 12;
    return {
        pageViews: Math.floor(45678 * multiplier),
        activeUsers: Math.floor(2345 * multiplier),
        avgSession: '4m 32s',
        bounceRate: 32.4
    };
}

function updateStatCards(stats) {
    const elements = {
        pageViews: document.querySelector('.stat-card:nth-child(1) .stat-number'),
        activeUsers: document.querySelector('.stat-card:nth-child(2) .stat-number'),
        avgSession: document.querySelector('.stat-card:nth-child(3) .stat-number'),
        bounceRate: document.querySelector('.stat-card:nth-child(4) .stat-number')
    };

    if (elements.pageViews) elements.pageViews.textContent = stats.pageViews.toLocaleString();
    if (elements.activeUsers) elements.activeUsers.textContent = stats.activeUsers.toLocaleString();
    if (elements.avgSession) elements.avgSession.textContent = stats.avgSession;
    if (elements.bounceRate) elements.bounceRate.textContent = stats.bounceRate + '%';
}

function updateCharts(stats) {
    // Update charts with new data if needed
    const charts = document.querySelectorAll('canvas');
    charts.forEach(canvas => {
        const chart = Chart.getChart(canvas);
        if (chart) {
            chart.update();
        }
    });
}

// Make initializeAnalyticsDashboard available globally
window.initializeAnalyticsDashboard = initializeAnalyticsDashboard;

// Export Analytics Report
function exportAnalyticsReport() {
    try {
        const dateRange = document.getElementById('dateRange')?.value || '7';
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `analytics_report_${timestamp}.csv`;

        // Create CSV content
        const csvContent = 'data:text/csv;charset=utf-8,Date Range,' + dateRange + '\n';
        
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Failed to export report:', error);
        showErrorMessage('Failed to export report');
    }
}

function showErrorMessage(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

    // Responsive Chart Resizing
    function resizeCharts() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) {
                chart.resize();
            }
        });
    }

    // Add resize event listener
    window.addEventListener('resize', resizeCharts);
}