document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function resetInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 7000);
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        banner.classList.toggle('bg2', index === 1);
    }

    function nextSlide(isUserClick = false) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        if (isUserClick) {
            resetInterval();
        }
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetInterval();
    }

    prevButton.addEventListener('click', () => prevSlide());
    nextButton.addEventListener('click', () => nextSlide(true));

    slideInterval = setInterval(() => nextSlide(false), 7000);
});