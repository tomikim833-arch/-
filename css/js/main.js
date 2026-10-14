// METU MiniMarket тауарлар каталогы
const defaultProducts = [
    {
        id: 1,
        title: "Apple MacBook Air M1 (8GB / 256GB SSD)",
        price: 280000,
        category: "electronics",
        condition: "Өте жақсы",
        status: "Белсенді",
        dorm: "Бас корпус (METU)",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
        desc: "Бағдарламалау мен сабақтарға арналған өте жылдам ноутбук. Батареясы күні бойы ұстайды, қорабы мен зарядтағышы бар.",
        createdAt: Date.now()
    },
    {
        id: 2,
        title: "METU Классикалық Оверсайз Худи (L)",
        price: 7500,
        category: "clothes",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "№1 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
        desc: "Құрамы: 80% мақта, 20% полиэстер. Жылы, денеге жайлы, METU логотипі сапалы басылған.",
        createdAt: Date.now() - 100000
    },
    {
        id: 3,
        title: "METU Университеттік Толстовка (Свитшот)",
        price: 6500,
        category: "clothes",
        condition: "Өте жақсы",
        status: "Белсенді",
        dorm: "№2 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
        desc: "Құрамы: 70% мақта, 30% полиэстер. Күз бен көктем мезгіліне арналған жұмсақ толстовка.",
        createdAt: Date.now() - 200000
    },
    {
        id: 4,
        title: "METU Брендті Қысқы Шапка (Beanie)",
        price: 2500,
        category: "clothes",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "Бас корпус (METU)",
        img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80",
        desc: "Құрамы: 100% акрил (жылы әрі тістемейді). Суық күндерге арналған тоқылған шапка.",
        createdAt: Date.now() - 300000
    },
    {
        id: 5,
        title: "METU Жазғы Кепка (Baseball Cap)",
        price: 2000,
        category: "clothes",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "№1 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
        desc: "Құрамы: 100% мақта (cotton). Күннен қорғайтын сапалы баспалы кепка, арты реттеледі.",
        createdAt: Date.now() - 400000
    },
    {
        id: 6,
        title: "Parker гелевый ручкалар жинағы",
        price: 1500,
        category: "stationery",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "Бас корпус (METU)",
        img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80",
        desc: "Конспект пен емтихан жазуға өте ыңғайлы премиум металлик ручкалар.",
        createdAt: Date.now() - 500000
    },
    {
        id: 7,
        title: "Discrete Mathematics & Algorithms (Оқулық)",
        price: 3500,
        category: "books",
        condition: "Өте жақсы",
        status: "Белсенді",
        dorm: "№2 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
        desc: "Дискретті математика курсына арналған ағылшын тіліндегі түпнұсқа оқулық.",
        createdAt: Date.now() - 600000
    },
    {
        id: 8,
        title: "Xiaomi Redmi Dots Беспроводные Наушники",
        price: 4800,
        category: "electronics",
        condition: "Өте жақсы",
        status: "Броньда",
        dorm: "№1 Жатақхана (METU)",
        img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
        desc: "Акустикасы тамаша, заряды 2 күнге жетеді. Қорабы мен чегы бар.",
        createdAt: Date.now() - 700000
    },
    {
        id: 9,
        title: "Ноутбукке арналған ыңғайлы рюкзак",
        price: 7000,
        category: "dorm",
        condition: "Жаңа",
        status: "Белсенді",
        dorm: "Бас корпус (METU)",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        desc: "Су өткізбейтін материалдан жасалған, 15.6 дюймдік ноутбукке арналған бөлімі бар.",
        createdAt: Date.now() - 800000
    }
];

function getProducts() {
    const data = localStorage.getItem('minimarket_ads_v3');
    if (!data) {
        localStorage.setItem('minimarket_ads_v3', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(data);
}

function saveProducts(products) {
    localStorage.setItem('minimarket_ads_v3', JSON.stringify(products));
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('minimarket_favs')) || [];
}

// Toast Notification
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
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

    // 3. Басты бет карточкаларын шығару
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
        const catClothes = document.getElementById('catClothesCount');
        const catBooks = document.getElementById('catBooksCount');
        const catStat = document.getElementById('catStatCount');
        const catElect = document.getElementById('catElectCount');
        const catDorm = document.getElementById('catDormCount');

        if(catAll) {
            catAll.textContent = `Барлық категориялар (${products.length})`;
            if(catClothes) catClothes.textContent = `👕 Киімдер & Худилер (${products.filter(p => p.category === 'clothes').length})`;
            if(catBooks) catBooks.textContent = `📚 Оқулықтар & Конспектілер (${products.filter(p => p.category === 'books').length})`;
            if(catStat) catStat.textContent = `✏️ Канцелярия (${products.filter(p => p.category === 'stationery').length})`;
            if(catElect) catElect.textContent = `💻 Электроника (${products.filter(p => p.category === 'electronics').length})`;
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
                            <div class="price">${p.price.toLocaleString()} ₸</div>
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
                    showToast('Таңдаулылардан өшірілді');
                } else {
                    favs.push(id);
                    showToast('❤️ Таңдаулыларға қосылды!');
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
            const query = searchInput ? searchInput.value.toLowerCase() : '';
            const cat = categoryFilter ? categoryFilter.value : 'all';
            const cond = conditionFilter ? conditionFilter.value : 'all';
            const sort = sortFilter ? sortFilter.value : 'default';

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
            } else if(sort === 'newest') {
                filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            }
            renderGrid(filtered);
        }

        if(searchInput) searchInput.addEventListener('input', filterAndSort);
        if(categoryFilter) categoryFilter.addEventListener('change', filterAndSort);
        if(conditionFilter) conditionFilter.addEventListener('change', filterAndSort);
        if(sortFilter) sortFilter.addEventListener('change', filterAndSort);
    }

    // Modal & WhatsApp
    const modal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    function openModal(p) {
        if(!modal) return;
        const waText = encodeURIComponent(`Сәлеметсіз бе! MiniMarket арқылы «${p.title}» (${p.price.toLocaleString()} ₸) тауарын көрген едім. Әлі сатылымда ма?`);
        modalBody.innerHTML = `
            <img src="${p.img}" style="width:100%; height:180px; object-fit:cover; border-radius:10px; margin-bottom:12px;">
            <h2>${p.title}</h2>
            <p style="color:var(--primary); font-size:20px; font-weight:700; margin:6px 0;">${p.price.toLocaleString()} ₸</p>
            <p><strong>Күйі:</strong> ${p.condition || 'Өте жақсы'} | <strong>Мәртебесі:</strong> ${p.status || 'Белсенді'}</p>
            <p><strong>Мекенжайы:</strong> ${p.dorm}</p>
            <p style="margin: 10px 0; color:var(--text-muted); font-size:14px;">${p.desc}</p>
            
            <a href="https://wa.me/77071234567?text=${waText}" target="_blank" class="whatsapp-btn">💬 WhatsApp арқылы жазу</a>

            <hr style="margin:15px 0; border:0; border-top:1px solid var(--border);">
            <h3>💬 Чат терезесі</h3>
            <div class="chat-container">
                <div class="chat-messages" id="chatMsgs">
                    <div class="chat-msg received">Сәлеметсіз бе! Тауар сатылымда ма?</div>
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
                        replyDiv.textContent = 'Иә, сатылымда! Жатақхана маңынан келіп алсаңыз болады.';
                        chatMsgs.appendChild(replyDiv);
                        chatMsgs.scrollTop = chatMsgs.scrollHeight;
                    }, 1000);
                }
            });
        }
    }

    if(closeModal) closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

    // 4. Форма & FileReader
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
            const imageFile = document.getElementById('imageFile');

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            if(!title.value.trim()) { document.getElementById('titleError').textContent = 'Атауын жазыңыз!'; isValid = false; }
            if(!price.value || price.value <= 0) { document.getElementById('priceError').textContent = 'Бағаны көрсетіңіз!'; isValid = false; }
            if(!category.value) { document.getElementById('categoryError').textContent = 'Категория таңдаңыз!'; isValid = false; }
            if(!desc.value.trim()) { document.getElementById('descError').textContent = 'Сипаттама жазыңыз!'; isValid = false; }

            if(isValid) {
                let defaultImg = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80";
                if(category.value === 'clothes') defaultImg = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80";
                if(category.value === 'stationery') defaultImg = "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80";

                const processAd = (imgResult) => {
                    const newAd = {
                        id: Date.now(),
                        title: title.value,
                        price: Number(price.value),
                        category: category.value,
                        condition: condition ? condition.value : 'Өте жақсы',
                        status: 'Белсенді',
                        dorm: dorm.value,
                        img: imgResult || defaultImg,
                        desc: desc.value,
                        createdAt: Date.now()
                    };

                    const products = getProducts();
                    products.unshift(newAd);
                    saveProducts(products);

                    showToast('🚀 Хабарландыру жарияланды!');
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1000);
                };

                if(imageFile && imageFile.files && imageFile.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(uploadEvent) {
                        processAd(uploadEvent.target.result);
                    };
                    reader.readAsDataURL(imageFile.files[0]);
                } else {
                    processAd(defaultImg);
                }
            }
        });
    }

    // 5. Профиль
    const myAdsGrid = document.getElementById('myAdsGrid');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const myAdsCount = document.getElementById('myAdsCount');
    const totalEarned = document.getElementById('totalEarned');
    const favsCountDisplay = document.getElementById('favsCountDisplay');

    function renderProfileAds() {
        if(!myAdsGrid) return;
        const products = getProducts();
        
        if(myAdsCount) myAdsCount.textContent = products.length;

        const earnedSum = products
            .filter(p => p.status === 'Сатылды')
            .reduce((sum, p) => sum + p.price, 0);
        if(totalEarned) totalEarned.textContent = `${earnedSum.toLocaleString()} ₸`;

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
                        <p class="price">${p.price.toLocaleString()} ₸</p>
                        <p style="font-size:12px; color:var(--text-muted);">Мәртебесі: <strong>${p.status || 'Белсенді'}</strong></p>
                        <div class="action-buttons">
                            <button class="btn-status" data-id="${p.id}">🔄 Мәртебе</button>
                            <button class="btn-delete" data-id="${p.id}">🗑️ Өшіру</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

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
                    showToast(`Мәртебе өзгерді: ${prod.status}`);
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                if(confirm('Өшіргіңіз келетініне сенімдісіз бе?')) {
                    let products = getProducts();
                    products = products.filter(p => p.id !== id);
                    saveProducts(products);
                    renderProfileAds();
                    showToast('Өшірілді');
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
                        <p class="price">${p.price.toLocaleString()} ₸</p>
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
