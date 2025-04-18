/**
 * Image Resize Script
 * This script standardizes all images in the website to a consistent size
 * while maintaining aspect ratios where possible.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Standard dimensions to resize all images to
    const standardWidth = 400;
    const standardHeight = 300;
    
    // Target all images in the site except icons and logos
    const imagesToResize = document.querySelectorAll('.service-image img, .overview-image img, .portfolio-item img, .team-member-image img');
    
    // Target logo images separately to maintain their specific size
    const logoImages = document.querySelectorAll('.logo img, .footer-logo img');
    
    // Resize service, overview, portfolio and team member images
    imagesToResize.forEach(img => {
        // Remove any inline dimensions
        img.removeAttribute('width');
        img.removeAttribute('height');
        
        // Apply standard dimensions
        img.style.width = standardWidth + 'px';
        img.style.height = standardHeight + 'px';
        img.style.objectFit = 'cover'; // Maintain aspect ratio while covering the area
        img.style.objectPosition = 'center'; // Center the image within the container
    });
    
    // Set consistent size for logo images
    logoImages.forEach(img => {
        // Remove any inline dimensions
        img.removeAttribute('width');
        img.removeAttribute('height');
        
        // Apply standard logo dimensions
        img.style.width = '150px';
        img.style.height = 'auto'; // Maintain aspect ratio
    });
    
    console.log('All images have been resized to standard dimensions');
});