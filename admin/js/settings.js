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

    // Theme Handling
    const themeSelect = document.getElementById('theme');
    const primaryColorInput = document.getElementById('primaryColor');

    themeSelect.addEventListener('change', function(e) {
        const selectedTheme = e.target.value;
        updateTheme(selectedTheme);
    });

    primaryColorInput.addEventListener('change', function(e) {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
    });

    // Logo Upload Preview
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Preview logo or update UI
                    console.log('Logo file loaded:', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Maintenance Mode Toggle
    const maintenanceToggle = document.getElementById('maintenance');
    if (maintenanceToggle) {
        maintenanceToggle.addEventListener('change', function(e) {
            const isEnabled = e.target.checked;
            toggleMaintenanceMode(isEnabled);
        });
    }

    // Save Settings
    const saveButton = document.getElementById('saveSettings');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            saveAllSettings();
        });
    }

    // Helper Functions
    function updateTheme(theme) {
        document.body.className = ''; // Reset theme classes
        document.body.classList.add(`theme-${theme}`);

        if (theme === 'custom') {
            primaryColorInput.parentElement.style.display = 'block';
        } else {
            primaryColorInput.parentElement.style.display = 'none';
        }
    }

    function toggleMaintenanceMode(enabled) {
        // Implement maintenance mode toggle functionality
        console.log('Maintenance mode:', enabled ? 'enabled' : 'disabled');
    }

    function saveAllSettings() {
        const settings = {
            general: {
                siteName: document.getElementById('siteName').value,
                siteDescription: document.getElementById('siteDescription').value,
                siteUrl: document.getElementById('siteUrl').value
            },
            appearance: {
                theme: document.getElementById('theme').value,
                primaryColor: document.getElementById('primaryColor').value
            },
            system: {
                timezone: document.getElementById('timezone').value,
                maintenance: document.getElementById('maintenance').checked,
                backupFrequency: document.getElementById('backupFrequency').value
            }
        };

        // Implement settings save functionality
        console.log('Saving settings:', settings);
        
        // Show success message
        showNotification('Settings saved successfully!');
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});