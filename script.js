document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    function resetInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 7000);
    }

    slides[0].classList.add('active');

    function showSlide(nextIndex) {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[nextIndex];
        
        slides.forEach(slide => {
            if (slide !== currentSlideElement && slide !== nextSlideElement) {
                slide.classList.remove('active', 'fade-out');
            }
        });
        
        currentSlideElement.classList.add('fade-out');
        
        setTimeout(() => {
            currentSlideElement.classList.remove('active', 'fade-out');
            nextSlideElement.classList.add('active');
            banner.classList.toggle('bg2', nextIndex === 1);
            currentSlide = nextIndex;
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide(isUserClick = false) {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        if (isUserClick) {
            resetInterval();
        }
    }

    function prevSlide() {
        const nextIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(nextIndex);
        resetInterval();
    }

    prevButton.addEventListener('click', () => prevSlide());
    nextButton.addEventListener('click', () => nextSlide(true));

    slideInterval = setInterval(() => nextSlide(false), 7000);
});