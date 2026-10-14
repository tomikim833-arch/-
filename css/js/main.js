const defaultProducts = [
    { id: 1, title: "Calculus Early Transcendentals", price: 4000, category: "books", dorm: "№1 Жатақхана", desc: "Математика кітабы, беттері түгел, таза." },
    { id: 2, title: "Mechanical Keyboard Red Switches", price: 9500, category: "electronics", dorm: "Бас корпус", desc: "RGB жарығы бар, жағдайы өте жақсы." },
    { id: 3, title: "Студенттік Оверсайз Худи (L)", price: 6000, category: "clothes", dorm: "№2 Жатақхана", desc: "Жылы, сапалы материалдан жасалған." }
];

function getProducts() {
    const data = localStorage.getItem('minimarket_ads');
    if (!data) {
        localStorage.setItem('minimarket_ads', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(data);
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('minimarket_favs')) || [];
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Темная тема переключатель
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(themeToggle) themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // 2. Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }

    // 3. Главная страница: Рендеринг и фильтрация
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const favCountSpan = document.getElementById('favCount');

    function updateFavCounter() {
        const favs = getFavorites();
        if(favCountSpan) favCountSpan.textContent = favs.length;
    }
    updateFavCounter();

    function renderGrid(items) {
        if(!productGrid) return;
        productGrid.innerHTML = '';
        if(items.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Тауарлар табылмады 🔍</p>';
            return;
        }

        const favs = getFavorites();
        items.forEach(p => {
            const isFav = favs.includes(p.id);
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div>
                    <div class="card-top">
                        <span class="cat-badge">${p.category}</span>
                        <button class="fav-btn" data-id="${p.id}">${isFav ? '❤️' : '🤍'}</button>
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.desc.substring(0, 60)}...</p>
                </div>
                <div>
                    <span class="dorm-tag">📍 ${p.dorm || 'Кампус'}</span>
                    <div class="card-bottom">
                        <div class="price">${p.price} ₸</div>
                        <button class="btn-primary-sm view-btn" data-id="${p.id}">Толығырақ</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Кнопка избранного
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = Number(btn.getAttribute('data-id'));
                let favs = getFavorites();
                if(favs.includes(id)) {
                    favs = favs.filter(favId => favId !== id);
                } else {
                    favs.push(id);
                }
                localStorage.setItem('minimarket_favs', JSON.stringify(favs));
                renderGrid(getProducts());
                updateFavCounter();
            });
        });

        // Открытие деталей в модалке
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = Number(btn.getAttribute('data-id'));
                const product = getProducts().find(item => item.id === id);
                openModal(product);
            });
        });
    }

    if(productGrid) {
        let products = getProducts();
        renderGrid(products);

        function filterAndSort() {
            let filtered = getProducts();
            const query = searchInput.value.toLowerCase();
            const cat = categoryFilter.value;
            const sort = sortFilter.value;

            if(query) {
                filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
            }
            if(cat !== 'all') {
                filtered = filtered.filter(p => p.category === cat);
            }
            if(sort === 'cheap') {
                filtered.sort((a, b) => a.price - b.price);
            } else if(sort === 'expensive') {
                filtered.sort((a, b) => b.price - a.price);
            }
            renderGrid(filtered);
        }

        if(searchInput) searchInput.addEventListener('input', filterAndSort);
        if(categoryFilter) categoryFilter.addEventListener('change', filterAndSort);
        if(sortFilter) sortFilter.addEventListener('change', filterAndSort);
    }

    // Модальное окно
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    function openModal(p) {
        if(!modal) return;
        modalBody.innerHTML = `
            <h2>${p.title}</h2>
            <p style="color:var(--primary); font-size:22px; font-weight:700; margin:10px 0;">${p.price} ₸</p>
            <p><strong>Категория:</strong> ${p.category}</p>
            <p><strong>Орнақласқан орны:</strong> ${p.dorm}</p>
            <p style="margin: 15px 0;"><strong>Сипаттамасы:</strong><br>${p.desc}</p>
            <button class="btn-primary" onclick="alert('Сатушымен байланыс орнату үшін чат ашылуда...')">Сатушыға хат жазу 💬</button>
        `;
        modal.style.display = 'flex';
    }

    if(closeModal) {
        closeModal.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (e) => {
        if(e.target === modal) modal.style.display = 'none';
    });

    // 4. Валидация и добавление товара
    const adForm = document.getElementById('adForm');
    if(adForm) {
        adForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const title = document.getElementById('title');
            const price = document.getElementById('price');
            const category = document.getElementById('category');
            const desc = document.getElementById('description');
            const dorm = document.getElementById('dormLocation');

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            if(!title.value.trim()) { document.getElementById('titleError').textContent = 'Атауын жазыңыз!'; isValid = false; }
            if(!price.value || price.value <= 0) { document.getElementById('priceError').textContent = 'Дұрыс баға қойыңыз!'; isValid = false; }
            if(!category.value) { document.getElementById('categoryError').textContent = 'Категорияны таңдаңыз!'; isValid = false; }
            if(!desc.value.trim()) { document.getElementById('descError').textContent = 'Сипаттама жазу міндетті!'; isValid = false; }

            if(isValid) {
                const newAd = {
                    id: Date.now(),
                    title: title.value,
                    price: Number(price.value),
                    category: category.value,
                    dorm: dorm.value,
                    desc: desc.value
                };

                const products = getProducts();
                products.unshift(newAd);
                localStorage.setItem('minimarket_ads', JSON.stringify(products));

                alert('Хабарландыру сәтті қосылды!');
                window.location.href = 'index.html';
            }
        });
    }

    // 5. Профиль страница
    const myAdsGrid = document.getElementById('myAdsGrid');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const myAdsCount = document.getElementById('myAdsCount');
    const favsCountDisplay = document.getElementById('favsCountDisplay');

    if(myAdsGrid) {
        const allProducts = getProducts();
        if(myAdsCount) myAdsCount.textContent = allProducts.length;

        myAdsGrid.innerHTML = allProducts.map(p => `
            <div class="card">
                <h3>${p.title}</h3>
                <div class="price">${p.price} ₸</div>
            </div>
        `).join('');

        const favIds = getFavorites();
        if(favsCountDisplay) favsCountDisplay.textContent = favIds.length;
        const favProducts = allProducts.filter(p => favIds.includes(p.id));
        favoritesGrid.innerHTML = favProducts.length ? favProducts.map(p => `
            <div class="card">
                <h3>${p.title}</h3>
                <div class="price">${p.price} ₸</div>
            </div>
        `).join('') : '<p style="color:var(--text-muted)">Әзірге таңдаулылар жоқ.</p>';

        // Переключение табов в профиле
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.getAttribute('data-tab') + 'Pane').classList.add('active');
            });
        });
    }
});
