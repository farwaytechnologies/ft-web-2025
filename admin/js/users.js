document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('.dashboard-sidebar').classList.toggle('active');
        this.classList.toggle('active');
    });

    // Search Functionality
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterUsers(searchTerm);
        }, 300));
    }

    // Filter Functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function(e) {
            const filterValue = e.target.value;
            filterUsersByStatus(filterValue);
        });
    }

    // Add New User Button
    const addUserBtn = document.querySelector('.btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            showUserModal();
        });
    }

    // Action Buttons (Edit/Delete)
    const actionButtons = document.querySelectorAll('.action-buttons .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('title').toLowerCase();
            const userRow = this.closest('tr');
            const userData = getUserDataFromRow(userRow);

            if (action === 'edit') {
                showUserModal(userData);
            } else if (action === 'delete') {
                showDeleteConfirmation(userData);
            }
        });
    });

    // Helper Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function filterUsers(searchTerm) {
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    function filterUsersByStatus(status) {
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        rows.forEach(row => {
            if (status === 'all') {
                row.style.display = '';
                return;
            }
            const userStatus = row.querySelector('.status').textContent.toLowerCase();
            row.style.display = userStatus === status ? '' : 'none';
        });
    }

    function getUserDataFromRow(row) {
        return {
            name: row.querySelector('.user-info span').textContent,
            email: row.querySelector('td:nth-child(2)').textContent,
            role: row.querySelector('td:nth-child(3)').textContent,
            status: row.querySelector('.status').textContent
        };
    }

    function showUserModal(userData = null) {
        // Implement user modal for add/edit
        console.log('Show user modal', userData);
    }

    function showDeleteConfirmation(userData) {
        if (confirm(`Are you sure you want to delete user ${userData.name}?`)) {
            // Implement delete functionality
            console.log('Delete user', userData);
        }
    }
});