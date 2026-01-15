document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация появления элементов при скролле (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

    // 2. Интерактивный фон (Parallax эффект мыши)
    const hero = document.querySelector('.hero');
    const glow1 = document.querySelector('.hero__glow--1');
    const glow2 = document.querySelector('.hero__glow--2');

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) - 0.5;
        const yPos = (clientY / window.innerHeight) - 0.5;

        glow1.style.transform = `translate(${xPos * 50}px, ${yPos * 50}px)`;
        glow2.style.transform = `translate(${xPos * -50}px, ${yPos * -50}px)`;
    });

    // 3. Создание простых частиц на нативном JS
    const particlesContainer = document.getElementById('hero-particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        
        // Нативная анимация через Keyframes
        const duration = Math.random() * 10 + 10;
        particle.animate([
            { transform: 'translateY(0) opacity(0)' },
            { transform: `translateY(-${Math.random() * 100 + 50}px) opacity(1)`, offset: 0.5 },
            { transform: `translateY(-${Math.random() * 200 + 100}px) opacity(0)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
        });
        
        particlesContainer.appendChild(particle);
    }
    // Интерактивный свет в карточках
const cards = document.querySelectorAll('.platform-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});
    // Добавьте это внутрь DOMContentLoaded, если хотите кастомную задержку для списка
const items = document.querySelectorAll('.benefit-item');
items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});
    // Добавьте это в DOMContentLoaded
const stats = document.querySelectorAll('.stat-num');
const animateStats = (el) => {
    const target = parseFloat(el.innerText);
    let count = 0;
    const speed = 2000 / target;

    const updateCount = () => {
        count += target / 100;
        if (count < target) {
            el.innerText = target % 1 === 0 ? Math.floor(count) : count.toFixed(1);
            setTimeout(updateCount, 1);
        } else {
            el.innerText = target;
        }
    };
    updateCount();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateStats(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 1 });

    stats.forEach(s => statsObserver.observe(s));
    // Логика управления слайдером направлений
const slider = document.getElementById('tracks-slider');
const btnNext = document.getElementById('track-next');
const btnPrev = document.getElementById('track-prev');

if (slider && btnNext && btnPrev) {
    btnNext.addEventListener('click', () => {
        const cardWidth = slider.querySelector('.track-card').offsetWidth + 30;
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        const cardWidth = slider.querySelector('.track-card').offsetWidth + 30;
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    }
    // 1. Математическая капча
let captchaAnswer;
function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    const questionEl = document.getElementById('captcha-question');
    if (questionEl) questionEl.textContent = `${a} + ${b}`;
}

// 2. Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone-input');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// 3. Обработка формы
const form = document.getElementById('main-form');
const status = document.getElementById('form-status');

if (form) {
    generateCaptcha();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userCaptcha = document.getElementById('captcha-input').value;
        const submitBtn = form.querySelector('.btn--form');
        
        // Сброс статуса
        status.className = 'form__message';
        status.textContent = '';

        // Проверка капчи
        if (parseInt(userCaptcha) !== captchaAnswer) {
            status.textContent = 'Ошибка: пример решен неверно.';
            status.classList.add('error');
            generateCaptcha();
            return;
        }

        // Имитация AJAX
        submitBtn.style.opacity = '0.7';
        submitBtn.querySelector('.btn-text').textContent = 'Отправка...';
        
        setTimeout(() => {
            submitBtn.style.opacity = '1';
            submitBtn.querySelector('.btn-text').textContent = 'Отправить запрос';
            
            status.textContent = 'Успешно! Мы свяжемся с вами в течение 15 минут.';
            status.classList.add('success');
            
            form.reset();
            generateCaptcha();
        }, 1500);
    });
    }
    // Cookie Popup Logic
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

if (cookiePopup && cookieAccept) {
    // Проверяем, давал ли пользователь согласие ранее
    if (!localStorage.getItem('zephyx_cookie_consent')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }

    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('zephyx_cookie_consent', 'true');
        cookiePopup.classList.remove('active');
    });
}

// Плавный скролл для якорных ссылок (Native JS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
    const burger = document.getElementById('burger-menu');
const nav = document.getElementById('nav-menu');
const body = document.body;
const navLinks = document.querySelectorAll('.nav__link');

// Переключение меню
function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
}

burger.addEventListener('click', toggleMenu);

// Закрытие при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Закрытие при клике вне меню (на оверлей)
nav.addEventListener('click', (e) => {
    if (e.target === nav) {
        toggleMenu();
    }
});
});