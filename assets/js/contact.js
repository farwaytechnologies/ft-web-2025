document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    // Error message display function
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        input.classList.add('error');
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            formGroup.removeChild(errorDiv);
        }
        input.classList.remove('error');
    }

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();

        switch(input.id) {
            case 'name':
                if (value.length < 2) {
                    showError(input, 'Name must be at least 2 characters long');
                    return false;
                }
                break;

            case 'email':
                if (!emailRegex.test(value)) {
                    showError(input, 'Please enter a valid email address');
                    return false;
                }
                break;

            case 'phone':
                if (value && !phoneRegex.test(value)) {
                    showError(input, 'Please enter a valid phone number');
                    return false;
                }
                break;

            case 'subject':
                if (value.length < 3) {
                    showError(input, 'Subject must be at least 3 characters long');
                    return false;
                }
                break;

            case 'message':
                if (value.length < 10) {
                    showError(input, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }

        return true;
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message. We\'ll get back to you soon!';
            contactForm.insertBefore(successMessage, contactForm.firstChild);

            contactForm.reset();

            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });

    // FAQ Accordion with smooth animation
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other open FAQs with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });

            // Toggle current FAQ with smooth animation
            item.classList.toggle('active');
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.querySelector('i').className = 'fas fa-minus';
            } else {
                answer.style.maxHeight = '0px';
                toggle.querySelector('i').className = 'fas fa-plus';
            }
        });
    });

    // Interactive Social Media Links
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});