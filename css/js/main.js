const initialProducts = [
    { id: 1, title: "C++ бағдарламалау оқулығы", price: 3000, category: "books", desc: "Тамаша жағдайда" },
    { id: 2, title: "Наушник Xiaomi", price: 4500, category: "electronics", desc: "Жаңа, қорабымен" },
    { id: 3, title: "Студенттік худи M-размер", price: 5000, category: "clothes", desc: "Киілмеген" }
];

function getProducts() {
    const data = localStorage.getItem('products');
    if (!data) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        return initialProducts;
    }
    return JSON.parse(data);
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function renderProducts(items) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        if (items.length === 0) {
            productGrid.innerHTML = '<p>Ештеңе табылмады.</p>';
            return;
        }
        items.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div>
                    <span class="cat-badge">${p.category}</span>
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                </div>
                <div class="price">${p.price} ₸</div>
            `;
            productGrid.appendChild(card);
        });
    }

    if (productGrid) {
        let products = getProducts();
        renderProducts(products);

        function filterData() {
            const query = searchInput.value.toLowerCase();
            const cat = categoryFilter.value;

            const filtered = products.filter(p => {
                const matchesSearch = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
                const matchesCat = (cat === 'all') || (p.category === cat);
                return matchesSearch && matchesCat;
            });
            renderProducts(filtered);
        }

        searchInput.addEventListener('input', filterData);
        categoryFilter.addEventListener('change', filterData);
    }

    const adForm = document.getElementById('adForm');
    if (adForm) {
        adForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const title = document.getElementById('title');
            const price = document.getElementById('price');
            const category = document.getElementById('category');

            document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');

            if (!title.value.trim()) {
                document.getElementById('titleError').textContent = 'Тауар атауын енгізіңіз!';
                isValid = false;
            }
            if (!price.value || price.value <= 0) {
                document.getElementById('priceError').textContent = 'Дұрыс баға көрсетіңіз!';
                isValid = false;
            }
            if (!category.value) {
                document.getElementById('categoryError').textContent = 'Категорияны таңдаңыз!';
                isValid = false;
            }

            if (isValid) {
                const newProduct = {
                    id: Date.now(),
                    title: title.value,
                    price: Number(price.value),
                    category: category.value,
                    desc: document.getElementById('description').value || 'Сипаттамасыз'
                };

                const currentProducts = getProducts();
                currentProducts.unshift(newProduct);
                localStorage.setItem('products', JSON.stringify(currentProducts));

                alert('Хабарландыру сәтті қосылды!');
                window.location.href = 'index.html';
            }
        });
    }

    const myProducts = document.getElementById('myProducts');
    if (myProducts) {
        const products = getProducts();
        myProducts.innerHTML = '';
        products.slice(0, 2).forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.title}</h3>
                <div class="price">${p.price} ₸</div>
            `;
            myProducts.appendChild(card);
        });
    }
});
