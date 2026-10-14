const defaultProducts = [
    {
        id: 1,
        title: "METU Брендті Оверсайз Худи (L)",
        price: 6500,
        category: "clothes",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "№1 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
        desc: "METU логотипі бар сапалы оверсайз худи. Киілмеген."
    },
    {
        id: 2,
        title: "Parker гелевый ручкалар жинағы",
        price: 1500,
        category: "stationery",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "Бас корпус (METU)",
        img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80",
        desc: "Конспект пен емтихан жазуға ыңғайлы металлик ручкалар."
    },
    {
        id: 3,
        title: "Discrete Mathematics & Algorithms (METU)",
        price: 3500,
        category: "books",
        condition: "Өте жақсы",
        status: "Белсенді",
        dorm: "№2 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
        desc: "Дискретті математика курсына арналған ағылшынша оқулық."
    },
    {
        id: 4,
        title: "Xiaomi Redmi Dots Беспроводные Наушники",
        price: 4800,
        category: "electronics",
        condition: "Өте жақсы",
        status: "Белсенді",
        dorm: "№1 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
        desc: "Дыбысы тамаша, заряды 2 күнге жетеді."
    }
];

function getProducts() {
    const data = localStorage.getItem('minimarket_ads');
    if (!data) {
        localStorage.setItem('minimarket_ads', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(data);
}

function saveProducts(products) {
    localStorage.setItem('minimarket_ads', JSON.stringify(products));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('minimarket_favs')) || [];
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Тема
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

    // 2. Мобильді мәзір
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }

    // 3. Басты бет
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    const sortFilter = document.getElementById('sortFilter');
    const favCountSpan = document.getElementById('favCount');

    function updateFavCounter() {
        const favs = getFavorites();
        if(favCountSpan) favCountSpan.textContent = favs.length;
    }
    updateFavCounter();

    function updateCategoryCounts() {
        const products = getProducts();
        const catAll = document.getElementById('catAllCount');
        const catBooks = document.getElementById('catBooksCount');
        const catStat = document.getElementById('catStatCount');
        const catClothes = document.getElementById('catClothesCount');
        const catElect = document.getElementById('catElectCount');
        const catDorm = document.getElementById('catDormCount');

        if(catAll) {
            catAll.textContent = `Барлық категориялар (${products.length})`;
            catBooks.textContent = `📚 Оқулықтар & Конспектілер (${products.filter(p => p.category === 'books').length})`;
            catStat.textContent = `✏️ Канцелярия & Ручкалар (${products.filter(p => p.category === 'stationery').length})`;
            catClothes.textContent = `👕 Киім & Худилер (${products.filter(p => p.category === 'clothes').length})`;
            catElect.textContent = `💻 Электроника & Гаджеттер (${products.filter(p => p.category === 'electronics').length})`;
            if(catDorm) catDorm.textContent = `🛏️ Жатақхана заттары (${products.filter(p => p.category === 'dorm').length})`;
        }
    }
    updateCategoryCounts();

    function renderGrid(items) {
        if(!productGrid) return;
        productGrid.innerHTML = '';
        if(items.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted); padding:30px;">Ештеңе табылмады 🔍</p>';
            return;
        }

        const favs = getFavorites();
        items.forEach(p => {
            const isFav = favs.includes(p.id);
            const isSold = p.status === 'Сатылды';
            const card = document.createElement('div');
            card.className = `card ${isSold ? 'sold-out' : ''}`;
            
            let statusClass = 'active';
            if(p.status === 'Броньда') statusClass = 'reserved';
            if(p.status === 'Сатылды') statusClass = 'sold';

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <span class="status-badge ${statusClass}">${p.status || 'Белсенді'}</span>
                    <img src="${p.img || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'}" class="card-img" alt="${p.title}">
                </div>
                <div class="card-body">
                    <div>
                        <div class="card-top">
                            <span class="cat-badge">${p.category} • ${p.condition || 'Өте жақсы'}</span>
                            <button class="fav-btn" data-id="${p.id}">${isFav ? '❤️' : '🤍'}</button>
                        </div>
                        <h3>${p.title}</h3>
                        <p>${p.desc.substring(0, 70)}...</p>
                    </div>
                    <div>
                        <span class="dorm-tag">📍 ${p.dorm || 'METU Кампус'}</span>
                        <div class="card-bottom">
                            <div class="price">${p.price} ₸</div>
                            <button class="btn-primary-sm view-btn" data-id="${p.id}">Толығырақ</button>
                        </div>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

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

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                const product = getProducts().find(item => item.id === id);
                openModal(product);
            });
        });
    }

    if(productGrid) {
        renderGrid(getProducts());

        function filterAndSort() {
            let filtered = getProducts();
            const query = searchInput.value.toLowerCase();
            const cat = categoryFilter.value;
            const cond = conditionFilter ? conditionFilter.value : 'all';
            const sort = sortFilter.value;

            if(query) {
                filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
            }
            if(cat !== 'all') {
                filtered = filtered.filter(p => p.category === cat);
            }
            if(cond !== 'all') {
                filtered = filtered.filter(p => p.condition === cond);
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
        if(conditionFilter) conditionFilter.addEventListener('change', filterAndSort);
        if(sortFilter) sortFilter.addEventListener('change', filterAndSort);
    }

    // Modal & Chat
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    function openModal(p) {
        if(!modal) return;
        modalBody.innerHTML = `
            <img src="${p.img}" style="width:100%; height:180px; object-fit:cover; border-radius:10px; margin-bottom:12px;">
            <h2>${p.title}</h2>
            <p style="color:var(--primary); font-size:20px; font-weight:700; margin:6px 0;">${p.price} ₸</p>
            <p><strong>Күйі:</strong> ${p.condition || 'Өте жақсы'} | <strong>Мәртебесі:</strong> ${p.status || 'Белсенді'}</p>
            <p><strong>Мекенжайы:</strong> ${p.dorm}</p>
            <p style="margin: 10px 0; color:var(--text-muted); font-size:14px;">${p.desc}</p>
            
            <hr style="margin:15px 0; border:0; border-top:1px solid var(--border);">
            <h3>💬 Онлайн Чат (Сатушымен байланысу)</h3>
            <div class="chat-container">
                <div class="chat-messages" id="chatMsgs">
                    <div class="chat-msg received">Сәлеметсіз бе! Тауар әлі сатылымда ма?</div>
                </div>
                <div class="chat-input-row">
                    <input type="text" id="chatInput" placeholder="Хабарлама жазыңыз...">
                    <button class="btn-primary-sm" id="sendMsgBtn">Жіберу</button>
                </div>
            </div>
        `;
        modal.style.display = 'flex';

        const sendMsgBtn = document.getElementById('sendMsgBtn');
        const chatInput = document.getElementById('chatInput');
        const chatMsgs = document.getElementById('chatMsgs');

        if(sendMsgBtn) {
            sendMsgBtn.addEventListener('click', () => {
                if(chatInput.value.trim()) {
                    const msgDiv = document.createElement('div');
                    msgDiv.className = 'chat-msg sent';
                    msgDiv.textContent = chatInput.value;
                    chatMsgs.appendChild(msgDiv);
                    chatInput.value = '';
                    chatMsgs.scrollTop = chatMsgs.scrollHeight;

                    setTimeout(() => {
                        const replyDiv = document.createElement('div');
                        replyDiv.className = 'chat-msg received';
                        replyDiv.textContent = 'Иә, сатылымда! Жатақханадан келіп алсаңыз болады.';
                        chatMsgs.appendChild(replyDiv);
                        chatMsgs.scrollTop = chatMsgs.scrollHeight;
                    }, 1000);
                }
            });
        }
    }

    if(closeModal) closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

    // 4. Форма
    const adForm = document.getElementById('adForm');
    if(adForm) {
        adForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const title = document.getElementById('title');
            const price = document.getElementById('price');
            const category = document.getElementById('category');
            const condition = document.getElementById('condition');
            const desc = document.getElementById('description');
            const dorm = document.getElementById('dormLocation');
            const imgUrl = document.getElementById('imgUrl');

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            if(!title.value.trim()) { document.getElementById('titleError').textContent = 'Атауын жазыңыз!'; isValid = false; }
            if(!price.value || price.value <= 0) { document.getElementById('priceError').textContent = 'Бағаны көрсетіңіз!'; isValid = false; }
            if(!category.value) { document.getElementById('categoryError').textContent = 'Категория таңдаңыз!'; isValid = false; }
            if(!desc.value.trim()) { document.getElementById('descError').textContent = 'Сипаттама жазыңыз!'; isValid = false; }

            if(isValid) {
                let defaultImg = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80";
                if(category.value === 'clothes') defaultImg = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80";
                if(category.value === 'stationery') defaultImg = "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80";

                const newAd = {
                    id: Date.now(),
                    title: title.value,
                    price: Number(price.value),
                    category: category.value,
                    condition: condition ? condition.value : 'Өте жақсы',
                    status: 'Белсенді',
                    dorm: dorm.value,
                    img: imgUrl.value.trim() || defaultImg,
                    desc: desc.value
                };

                const products = getProducts();
                products.unshift(newAd);
                saveProducts(products);

                alert('Хабарландыру сәтті қосылды!');
                window.location.href = 'profile.html';
            }
        });
    }

    // 5. Профиль, Өшіру және Мәртебені ауыстыру («Бронь», «Сатылды»)
    const myAdsGrid = document.getElementById('myAdsGrid');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const myAdsCount = document.getElementById('myAdsCount');
    const favsCountDisplay = document.getElementById('favsCountDisplay');

    function renderProfileAds() {
        if(!myAdsGrid) return;
        const products = getProducts();
        
        if(myAdsCount) myAdsCount.textContent = products.length;

        if(products.length === 0) {
            myAdsGrid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1;">Белсенді хабарландыру жоқ.</p>';
        } else {
            myAdsGrid.innerHTML = products.map(p => `
                <div class="card">
                    <div class="card-img-wrapper">
                        <img src="${p.img}" class="card-img">
                    </div>
                    <div class="card-body">
                        <h3>${p.title}</h3>
                        <p class="price">${p.price} ₸</p>
                        <p style="font-size:12px; color:var(--text-muted);">Мәртебесі: <strong>${p.status || 'Белсенді'}</strong></p>
                        <div class="action-buttons">
                            <button class="btn-status" data-id="${p.id}">🔄 Мәртебе өзгерту</button>
                            <button class="btn-delete" data-id="${p.id}">🗑️ Өшіру</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Мәртебе өзгерту логикасы
        document.querySelectorAll('.btn-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                let products = getProducts();
                const prod = products.find(p => p.id === id);
                if(prod) {
                    if(prod.status === 'Белсенді') prod.status = 'Броньда';
                    else if(prod.status === 'Броньда') prod.status = 'Сатылды';
                    else prod.status = 'Белсенді';
                    
                    saveProducts(products);
                    renderProfileAds();
                }
            });
        });

        // Өшіру
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                if(confirm('Хабарландыруды өшіргіңіз келетініне сенімдісіз бе?')) {
                    let products = getProducts();
                    products = products.filter(p => p.id !== id);
                    saveProducts(products);
                    renderProfileAds();
                }
            });
        });

        const favIds = getFavorites();
        if(favsCountDisplay) favsCountDisplay.textContent = favIds.length;
        const favProducts = products.filter(p => favIds.includes(p.id));

        if(favoritesGrid) {
            favoritesGrid.innerHTML = favProducts.length ? favProducts.map(p => `
                <div class="card">
                    <div class="card-img-wrapper">
                        <img src="${p.img}" class="card-img">
                    </div>
                    <div class="card-body">
                        <h3>${p.title}</h3>
                        <p class="price">${p.price} ₸</p>
                    </div>
                </div>
            `).join('') : '<p style="color:var(--text-muted); grid-column:1/-1;">Таңдаулылар бос.</p>';
        }
    }

    if(myAdsGrid) {
        renderProfileAds();

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
