document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. МОБИЛЬНОЕ МЕНЮ (Есть на всех страницах) ---
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const body = document.body;

    if (burger && nav) { // Проверка обязательна
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Закрытие при клике на ссылки
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // --- 2. СЛАЙДЕР НАПРАВЛЕНИЙ (Только на главной) ---
    const slider = document.getElementById('tracks-slider');
    const btnNext = document.getElementById('track-next');
    const btnPrev = document.getElementById('track-prev');

    if (slider && btnNext && btnPrev) { // Код выполнится только если элементы найдены
        const scrollStep = () => {
            const firstCard = slider.querySelector('.track-card');
            return firstCard ? firstCard.offsetWidth + 30 : 300;
        };

        btnNext.addEventListener('click', () => {
            slider.scrollBy({ left: scrollStep(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
        });
    }

    // --- 3. ФОРМА КОНТАКТОВ И КАПЧА (Только на главной) ---
    const form = document.getElementById('main-form');
    if (form) {
        let captchaAnswer;
        const captchaQuestion = document.getElementById('captcha-question');

        const generateCaptcha = () => {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            captchaAnswer = a + b;
            if (captchaQuestion) captchaQuestion.textContent = `${a} + ${b}`;
        };

        generateCaptcha();

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userCaptcha = document.getElementById('captcha-input').value;
            const status = document.getElementById('form-status');

            if (parseInt(userCaptcha) !== captchaAnswer) {
                status.textContent = 'Ошибка капчи!';
                status.className = 'form__message error';
                generateCaptcha();
                return;
            }
            
            // Имитация отправки...
            status.textContent = 'Успешно отправлено!';
            status.className = 'form__message success';
            form.reset();
            generateCaptcha();
        });
    }

    // --- 4. АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer) ---
    const reveals = document.querySelectorAll('.reveal-text');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    }

    // --- 5. COOKIE POPUP ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && cookieAccept) {
        if (!localStorage.getItem('zephyx_cookie_consent')) {
            setTimeout(() => cookiePopup.classList.add('active'), 2000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('zephyx_cookie_consent', 'true');
            cookiePopup.classList.remove('active');
        });
    }
});