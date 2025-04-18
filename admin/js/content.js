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
            filterContent(searchTerm);
        }, 300));
    }

    // Filter Functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function(e) {
            const filterValue = e.target.value;
            filterContentByStatus(filterValue);
        });
    }

    // Add New Content Button
    const addContentBtn = document.querySelector('.btn-primary');
    if (addContentBtn) {
        addContentBtn.addEventListener('click', function() {
            showContentModal();
        });
    }

    // Action Buttons (Edit/Preview/Delete)
    const actionButtons = document.querySelectorAll('.action-buttons .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('title').toLowerCase();
            const contentRow = this.closest('tr');
            const contentData = getContentDataFromRow(contentRow);

            switch(action) {
                case 'edit':
                    showContentModal(contentData);
                    break;
                case 'preview':
                    previewContent(contentData);
                    break;
                case 'delete':
                    showDeleteConfirmation(contentData);
                    break;
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

    function filterContent(searchTerm) {
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    }

    function filterContentByStatus(status) {
        const rows = document.querySelectorAll('.dashboard-table tbody tr');
        rows.forEach(row => {
            if (status === 'all') {
                row.style.display = '';
                return;
            }
            const contentStatus = row.querySelector('.status').textContent.toLowerCase();
            row.style.display = contentStatus === status ? '' : 'none';
        });
    }

    function getContentDataFromRow(row) {
        return {
            title: row.querySelector('.content-info span').textContent,
            type: row.querySelector('td:nth-child(2)').textContent,
            author: row.querySelector('td:nth-child(3)').textContent,
            status: row.querySelector('.status').textContent
        };
    }

    function showContentModal(contentData = null) {
        // Implement content modal for add/edit
        console.log('Show content modal', contentData);
    }

    function previewContent(contentData) {
        // Implement content preview functionality
        console.log('Preview content', contentData);
    }

    function showDeleteConfirmation(contentData) {
        if (confirm(`Are you sure you want to delete ${contentData.title}?`)) {
            // Implement delete functionality
            console.log('Delete content', contentData);
        }
    }
});