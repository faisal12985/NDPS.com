
        // Global variables
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        // Navigation functionality
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            event.target.classList.add('active');
            
            // Close mobile menu if open
            document.getElementById('navMenu').classList.remove('show');
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        // Mobile menu toggle
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('show');
        }
        
        // Slider functionality
        function showSlide(index) {
            const slider = document.getElementById('slider');
            const slideWidth = slides[0].offsetWidth;
            
            // Update slide position
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlideIndex = index;
        }
        
        function changeSlide(direction) {
            let newIndex = currentSlideIndex + direction;
            
            if (newIndex >= slides.length) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            
            showSlide(newIndex);
        }
        
        function currentSlide(index) {
            showSlide(index - 1);
        }
        
        // Auto-advance slider
        function autoAdvanceSlider() {
            changeSlide(1);
        }
        
        // Initialize slider auto-advance
        let sliderInterval = setInterval(autoAdvanceSlider, 5000);
        
        // Pause auto-advance on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(autoAdvanceSlider, 5000);
        });
        
        // Form submissions
        document.getElementById('admissionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application! We will contact you soon.');
            this.reset();
        });
        
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will respond within 24 hours.');
            this.reset();
        });
        
        // Handle window resize for slider
        window.addEventListener('resize', () => {
            showSlide(currentSlideIndex);
        });
        
        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add fade-in animation to elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        document.querySelectorAll('.card, .notice-board, .gallery-item').forEach(el => {
            observer.observe(el);
        });
        
        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showSlide(0);
            
            // Add initial loading state
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
        });