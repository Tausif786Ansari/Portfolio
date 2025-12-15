document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Typing Effect
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Developer", "Data Enthusiast", "Problem Solver", "Automation Expert", "OpenCV Specialist"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 60;
    let pauseBeforeDelete = 1500;
    let pauseBeforeType = 500;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, pauseBeforeType);
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, speed);
        }
    }
    typeEffect();

    // Progress Bar Animation (on scroll into view)
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');

    const animateProgressBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
                observer.disconnect(); // Stop observing once animated
            }
        });
    };

    const skillsObserver = new IntersectionObserver(animateProgressBars, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Testimonials Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    function updateSlider() {
        const itemWidth = testimonials[0].offsetWidth; // Get computed width
        const gap = parseFloat(getComputedStyle(testimonialWrapper).gap || '0px'); // Get gap
        testimonialWrapper.style.transform = `translateX(-${currentIndex * (itemWidth + gap * 2 / 3)}px)`; // Account for item margin/gap
    }

    function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    }

    function showPrevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', showPrevTestimonial);
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    // Auto-slide testimonials
    let slideInterval = setInterval(showNextTestimonial, 5000);

    // Pause auto-slide on hover
    if (testimonialWrapper) {
        testimonialWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        testimonialWrapper.addEventListener('mouseleave', () => {
            slideInterval = setInterval(showNextTestimonial, 5000);
        });
    }

    // Update slider on resize
    window.addEventListener('resize', updateSlider);
    updateSlider(); // Initial update

    // Project Card Hover Glow Effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 100;
            const y = (e.clientY - rect.top) / rect.height * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});