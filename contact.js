document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out'
    });

    // Load cart count from localStorage
    const cartCount = document.querySelector('.nav-cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;

    // Form validation
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('.submit-btn');
    const formSuccess = document.querySelector('.form-success');

    // Add focus/blur effects to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.input-group').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.input-group').classList.remove('focused');
            validateInput(input);
        });
    });

    // Validate input on change
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                formSuccess.classList.add('show');

                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.closest('.input-group').classList.remove('focused');
                });

                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    // Input validation function
    function validateInput(input) {
        const errorMessage = input.closest('.form-group').querySelector('.error-message');
        let isValid = true;
        let message = '';

        // Check if required
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }

        // Validate email format
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Validate phone format
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }

        // Update error message
        if (isValid) {
            errorMessage.classList.remove('show');
            input.closest('.input-group').classList.remove('error');
        } else {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            input.closest('.input-group').classList.add('error');
        }

        return isValid;
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Add hover effects to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Parallax effect for hero section
    const parallaxHero = document.querySelector('.parallax-hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxHero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 