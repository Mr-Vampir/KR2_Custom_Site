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


