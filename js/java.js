// 0. Универсальная функция красивых уведомлений (вместо стандартного alert)
function showNotification(message, title = 'Успешно!') {
    // Создаём контейнер для уведомлений, если его ещё нет на странице
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Создаём само уведомление
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="toast-icon">✓</div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Запускаем плавное появление
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Автоматически скрываем через 4.5 секунды
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// 1. Калькулятор для главной страницы (index.html)
function calculateTotal() {
    const checkboxes = document.querySelectorAll('.calc-services input[type="checkbox"]');
    const priceDisplay = document.getElementById('total-price');
    if (!priceDisplay) return;

    let total = 0;
    checkboxes.forEach(box => {
        if (box.checked) {
            total += parseInt(box.value, 10);
        }
    });
    priceDisplay.innerText = total > 0 ? total + ' ₽' : '0 ₽';
}

// 2. Калькулятор для страницы компьютеров (comps.html)
function calculateCompTotal() {
    const checkboxes = document.querySelectorAll('.calc-services input[type="checkbox"]');
    const priceDisplay = document.getElementById('comp-total-price');
    if (!priceDisplay) return;

    let total = 0;
    checkboxes.forEach(box => {
        if (box.checked) {
            total += parseInt(box.value, 10);
        }
    });
    priceDisplay.innerText = total > 0 ? total + ' ₽' : '0 ₽';
}

// 3. Плавная прокрутка в самый верх страницы
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 4. Управление модальным окном заявки
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    document.getElementById('selectedServiceText').innerText = serviceName;
    document.getElementById('selectedServiceInput').value = serviceName;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 250);
}

function closeModalOnBg(event) {
    if (event.target.id === 'serviceModal') {
        closeServiceModal();
    }
}

function submitModalForm(event) {
    event.preventDefault();
    const service = document.getElementById('selectedServiceInput').value;
    showNotification(
        `Заявка на услугу «${service}» принята. Мастер свяжется с вами в ближайшее время!`,
        'Заявка отправлена'
    );
    closeServiceModal();
    event.target.reset();
}

// Закрытие модального окна по нажатию клавиши Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Отключаем наблюдение после срабатывания, чтобы анимация не повторялась
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Анимация начнется, когда 15% карточки появится на экране
  });

  cards.forEach((card) => observer.observe(card));
});


// 5. Плавная анимация появления блоков при скролле
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
});
// 6. Переключение темной и светлой темы с сохранением выбора
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (!themeToggleBtn) return;

    // Проверяем, была ли ранее выбрана светлая тема
    const savedTheme = localStorage.getItem('corefix-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.textContent = '🌙';
    } else {
        themeToggleBtn.textContent = '☀️';
    }

    // Обработчик клика по кнопке переключения темы
    themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        // Меняем значок на кнопке и сохраняем настройку
        themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('corefix-theme', isLight ? 'light' : 'dark');
    });
});
// 7. Инициализация Barba.js с эффектом переворачивания страницы
document.addEventListener('DOMContentLoaded', function () {
    if (typeof barba === 'undefined') return;

    // Функция для повторного запуска анимаций появления блоков на новой странице
    function initPageScripts() {
        const animatedElements = document.querySelectorAll('.animate-fade-in');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => observer.observe(el));
        }

        // Обновляем активный класс у ссылок в шапке
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.header-nav .nav-item').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    barba.init({
        transitions: [{
            name: 'page-flip',

            // Анимация ухода текущей страницы
            leave(data) {
                return new Promise(resolve => {
                    data.current.container.classList.add('flip-leave-active');
                    setTimeout(resolve, 550); // Длительность совпадает с transition в CSS (0.55s)
                });
            },

            // Подготовка новой страницы перед появлением
            beforeEnter(data) {
                window.scrollTo(0, 0); // Прокручиваем наверх
                data.next.container.classList.add('flip-enter-from');
            },

            // Анимация разворота новой страницы
            enter(data) {
                return new Promise(resolve => {
                    // Принудительный reflow, чтобы браузер применил начальный угол 90deg
                    void data.next.container.offsetWidth;

                    data.next.container.classList.remove('flip-enter-from');
                    data.next.container.classList.add('flip-enter-active');

                    setTimeout(() => {
                        data.next.container.classList.remove('flip-enter-active');
                        resolve();
                    }, 550);
                });
            },

            // Перезапускаем скрипты для элементов новой страницы
            afterEnter() {
                initPageScripts();
            }
        }]
    });
});



