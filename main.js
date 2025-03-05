// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (document.querySelector('.nav-list.active')) {
                    document.querySelector('.nav-list').classList.remove('active');
                    document.querySelector('.mobile-toggle').classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll class
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 700) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Transform hamburger to X
        if (this.classList.contains('active')) {
            this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.querySelector('span:nth-child(2)').style.opacity = '0';
            this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.querySelector('span:nth-child(1)').style.transform = 'none';
            this.querySelector('span:nth-child(2)').style.opacity = '1';
            this.querySelector('span:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Mobile dropdown toggle
    const dropdownItems = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdownItems.forEach(item => {
            const dropdownLink = item.querySelector('.nav-link');
            
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                item.classList.toggle('active');
            });
        });
    }
    
    // Form submission with animation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual AJAX request in production)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
                
                // Show success message
                showFormMessage('Your message has been sent successfully!', 'success');
            }, 1500);
        });
    }
    
    // Function to show form submission message
    function showFormMessage(message, type) {
        // Check if message element already exists
        let messageElement = document.querySelector('.form-message');
        
        // If not, create a new one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Set message content and class
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Add slide-in animation
        messageElement.style.animation = 'slideInUp 0.3s ease forwards';
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.style.animation = 'slideOutDown 0.3s ease forwards';
            
            // Remove element after animation completes
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 0) {
                heroSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.5}px)`;
            }
        });
    }
    
    // Add hover effects for dish cards
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            this.querySelector('.dish-image img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.querySelector('.dish-image img').style.transform = '';
        });
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add CSS animations for various elements on interaction
    const addHoverAnimation = (elements, animationClass) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add(animationClass);
            });
            
            element.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    element.classList.remove(animationClass);
                }, 300);
            });
        });
    };
    
    // Add pulse animation to buttons
    addHoverAnimation(document.querySelectorAll('.btn'), 'pulse');
    
    // Add styles for form message animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .pulse {
            animation: pulse 0.5s ease;
        }
        
        .form-message {
            padding: 10px 15px;
            margin-top: 15px;
            border-radius: 5px;
            font-weight: 500;
        }
        
        .form-message.success {
            background-color: rgba(76, 175, 80, 0.1);
            color: #4CAF50;
            border: 1px solid #4CAF50;
        }
        
        .form-message.error {
            background-color: rgba(244, 67, 54, 0.1);
            color: #F44336;
            border: 1px solid #F44336;
        }
    `;
    document.head.appendChild(style);

    // Dish Spotlight slideshow
    const spotlightSlides = document.querySelectorAll('.spotlight-slide');
    const spotlightIndicators = document.querySelectorAll('.spotlight-indicator');
    const prevButton = document.querySelector('.spotlight-control.prev');
    const nextButton = document.querySelector('.spotlight-control.next');
    let currentSlide = 0;
    const slideCount = spotlightSlides.length;
    let slideInterval;

    if (spotlightSlides.length > 0) {
        // Function to change slide
        const goToSlide = (slideIndex) => {
            // Remove active class from all slides and indicators
            spotlightSlides.forEach(slide => slide.classList.remove('active'));
            spotlightIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            spotlightSlides[slideIndex].classList.add('active');
            spotlightIndicators[slideIndex].classList.add('active');
            
            // Update current slide index
            currentSlide = slideIndex;
        };
        
        // Next slide function
        const nextSlide = () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slideCount) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        };
        
        // Previous slide function
        const prevSlide = () => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slideCount - 1;
            }
            goToSlide(prevIndex);
        };
        
        // Start automatic slideshow
        const startSlideshow = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };
        
        // Stop automatic slideshow (when user interacts)
        const stopSlideshow = () => {
            clearInterval(slideInterval);
        };
        
        // Event listeners for controls
        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopSlideshow();
                startSlideshow(); // Restart with new timer
            });
            
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopSlideshow();
                startSlideshow(); // Restart with new timer
            });
        }
        
        // Event listeners for indicators
        spotlightIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopSlideshow();
                startSlideshow(); // Restart with new timer
            });
        });
        
        // Start slideshow
        startSlideshow();
        
        // Pause slideshow on hover
        const spotlightContainer = document.querySelector('.spotlight-container');
        if (spotlightContainer) {
            spotlightContainer.addEventListener('mouseenter', stopSlideshow);
            spotlightContainer.addEventListener('mouseleave', startSlideshow);
        }
    }
}); 