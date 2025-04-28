
var swiper = new Swiper(".mySwiperservices", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      700: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
});

var swiper = new Swiper(".mySwiperteam", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      560: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1250: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
});

var swiper = new Swiper(".mySwipertesti", {
    pagination: {
      el: ".swiper-pagination",
    },
});

document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('#menu a[href^="#"]');
    
    
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    
    function smoothScroll(target, isInitialLoad = false) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            
            const header = document.querySelector('.navigation');
            const headerHeight = header ? header.offsetHeight : 80;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
           
            if (isInitialLoad && window.pageYOffset === 0) {
                window.scrollTo(0, targetPosition);
                return;
            }
            
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            requestAnimationFrame(animation);
            
           
            const menuBtn = document.getElementById('menu-btn');
            if (menuBtn && menuBtn.checked) {
                menuBtn.checked = false;
            }
            
           
            if (history.pushState) {
                history.pushState(null, null, target);
            }
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    if (window.location.hash && window.pageYOffset > 0) {
        setTimeout(() => {
            smoothScroll(window.location.hash, true);
        }, 100);
    }
});