// CƠ SỞ DỮ LIỆU SẢN PHẨM MẪU
const products = [
    {
        id: 1,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Đỏ Thẫm TF",
        price: "699.000",
        sizes: [38, 39, 40, 41, 42, 43, 45],
        image: "2_2images.jpeg",
        desc: "Dòng sản phẩm cao cấp chính hãng Zocker Gen 2. Da upper mềm mại, ôm chân, hệ thống đinh dăm TF bám sân phân bổ khoa học giúp xoay sở tăng tốc linh hoạt tối đa."
    },
    {
        id: 2,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
    {
        id: 3,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
    {
        id: 4,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
    {
        id: 5,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Đỏ Thẫm TF",
        price: "699.000",
        sizes: [38, 39, 40, 41, 42, 43, 45],
        image: "2_2images.jpeg",
        desc: "Dòng sản phẩm cao cấp chính hãng Zocker Gen 2. Da upper mềm mại, ôm chân, hệ thống đinh dăm TF bám sân phân bổ khoa học giúp xoay sở tăng tốc linh hoạt tối đa."
    },
    {
        id: 6,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
    {
        id: 7,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
    {
        id: 8,
        name: "Giày Bóng Đá Zocker Winner Energy Gen 2 - Xanh Nhật TF",
        price: "699.000",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        image: "IMG_4113.jpeg",
        desc: "Màu sắc xanh dương nhật bản năng động cực cuốn hút. Phù hợp anh em kiểm soát bóng, bứt tốc chạy cánh thần sầu trên các mặt sân cỏ nhân tạo."
    }
];

let cart = safeGetStorage('cbl_cart');
let selectedSizeTemp = null; 
let billTimeout = null;

// QUẢN LÝ LOCALSTORAGE
function safeGetStorage(key) {
    try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : []; }
    catch (e) { return []; }
}
function safeSetStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

// HIỂN THỊ SẢN PHẨM RA GRID MÀN HÌNH CHÍNH
function renderProducts(productsList = products) {
    const container = document.getElementById('product-grid-container');
    if (!container) return;
    container.innerHTML = productsList.map(prod => `
        <div class="product-card">
            <img src="${prod.image}" alt="${prod.name}" onclick="viewDetail(${prod.id})">
            <h3 onclick="viewDetail(${prod.id})" style="cursor:pointer;">${prod.name}</h3>
            <p class="price">${prod.price}đ</p>
            <p class="info">Size: ${prod.sizes.join(', ')}</p>
            <button onclick="viewDetail(${prod.id})">Chọn Size / Mua</button>
        </div>
    `).join('');
}

// XEM CHI TIẾT SẢN PHẨM & CHỌN SIZE NÚT BẤM (Ảnh 1)
function viewDetail(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    
    selectedSizeTemp = null; 
    const modal = document.getElementById('product-detail-modal');
    const content = document.getElementById('detail-content');
    
    const allSizes = [38, 39, 40, 41, 42, 43, 44, 45];
    let sizeButtonsHTML = allSizes.map(sz => {
        const isAvailable = prod.sizes.includes(sz);
        if (isAvailable) {
            return `<button class="size-btn" onclick="selectSizeBtn(this, ${sz})">${sz}</button>`;
        } else {
            return `<button class="size-btn disabled" disabled>${sz}</button>`;
        }
    }).join('');

    content.innerHTML = `
        <img src="${prod.image}" style="width:100%; border-radius:10px; margin-bottom:15px;">
        <h2 style="font-size:16px; margin-bottom:8px; text-align: left;">${prod.name}</h2>
        <p style="color:#ff477e; font-weight:bold; font-size:20px; margin-bottom:10px; text-align: left;">${prod.price}đ</p>
        
        <div class="size-selector-container">
            <p>Chọn kích thước:</p>
            <div class="size-buttons-grid">${sizeButtonsHTML}</div>
        </div>

        <p style="color:#666; font-size:13px; line-height:1.5; margin:15px 0; white-space: pre-line; text-align: left;">${prod.desc}</p>
        <button id="add-to-cart-final-btn" class="btn-primary-pink" style="border-radius:8px;">THÊM VÀO GIỎ HÀNG</button>
    `;

    document.getElementById('add-to-cart-final-btn').onclick = function() {
        if (!selectedSizeTemp) {
            alert("Vui lòng chọn size giày trước khi thêm vào giỏ!");
            return;
        }
        addToCart(prod.name, prod.price, selectedSizeTemp, prod.image);
        closeProductDetail();
    };

    modal.style.display = 'flex';
}

function selectSizeBtn(btnElement, size) {
    const siblings = btnElement.parentElement.querySelectorAll('.size-btn');
    siblings.forEach(s => s.classList.remove('selected'));
    btnElement.classList.add('selected');
    selectedSizeTemp = size;
}

// THÊM VÀO GIỎ & HIỂN THỊ POPUP THÀNH CÔNG (Ảnh 2)
function addToCart(name, price, size, image) {
    const itemKey = `${name} - Size ${size}`;
    const existingItem = cart.find(item => item.cartId === itemKey);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ cartId: itemKey, name: name, price: price, size: size, image: image, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showSuccessModal(name, price, size, image);
}

function showSuccessModal(name, price, size, image) {
    const infoBox = document.getElementById('success-pop-info');
    infoBox.innerHTML = `
        <img src="${image}" alt="giày">
        <div class="success-info-text">
            <h4>${name}</h4>
            <p style="font-size:13px; color:#555;">Phân loại: Size ${size}</p>
            <p style="font-weight:bold; color:#ff477e; margin-top:3px;">${price}đ</p>
        </div>
    `;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalMoney = 0;
    cart.forEach(item => {
        const cleanPrice = parseInt(item.price.replace(/[.,]/g, '')) || 0;
        totalMoney += cleanPrice * item.quantity;
    });

    document.getElementById('success-cart-count').innerText = totalItems;
    document.getElementById('success-cart-total').innerText = totalMoney.toLocaleString('vi-VN') + "đ";
    
    document.getElementById('add-success-modal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('add-success-modal').style.display = 'none';
}

function goToCartFromSuccess() {
    closeSuccessModal();
    checkout(); 
}

function saveCart() { safeSetStorage('cbl_cart', cart); }
function closeProductDetail() { document.getElementById('product-detail-modal').style.display = 'none'; }

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'flex') { modal.style.display = 'none'; } 
    else { modal.style.display = 'flex'; renderCartItems(); }
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('total-price');
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center;padding:20px;color:#888;">Giỏ hàng đang trống.</p>';
        totalEl.innerText = '0đ';
        return;
    }
    let html = ''; let total = 0;
    cart.forEach((item, index) => {
        const cleanPrice = parseInt(item.price.replace(/[.,]/g, '')) || 0;
        total += (cleanPrice * item.quantity);
        html += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid #eee;">
                <div style="font-size:13px; text-align:left;">
                    <b>${item.name}</b> (Size ${item.size}) <br>
                    <span style="color:#ff477e;">${item.price}đ x ${item.quantity}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background:#ff477e;color:white;border:none;padding:3px 8px;border-radius:4px;cursor:pointer;">Xóa</button>
            </div>`;
    });
    list.innerHTML = html;
    totalEl.innerText = total.toLocaleString('vi-VN') + "đ";
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) { cart[index].quantity -= 1; } 
    else { cart.splice(index, 1); }
    saveCart(); updateCartUI(); renderCartItems();
}

// BẬT TRANG THANH TOÁN (Ảnh 3 & 4)
function checkout() {
    if (cart.length === 0) { alert("Giỏ hàng đang trống!"); return; }
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'flex';
    
    let totalMoney = 0;
    cart.forEach(item => { totalMoney += (parseInt(item.price.replace(/[.,]/g, '')) || 0) * item.quantity; });
    
    const shipBox = document.getElementById('ship-box');
    if (totalMoney >= 200000) {
        shipBox.innerHTML = `<i class="fas fa-check"></i> Đơn hàng đủ điều kiện miễn phí vận chuyển (Miễn phí Toàn Quốc)`;
        shipBox.style.background = "#d4edda"; shipBox.style.color = "#155724";
    } else {
        shipBox.innerHTML = `Phí ship đồng giá: 30.000đ`;
        shipBox.style.background = "#fff3cd"; shipBox.style.color = "#856404";
    }
}

function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

// XÁC NHẬN ĐẶT HÀNG & GỬI TELEGRAM
function confirmOrder() {
    const name = document.getElementById('cus-name').value.trim();
    const phone = document.getElementById('cus-phone').value.trim();
    const address = document.getElementById('cus-address').value.trim();
    const city = document.getElementById('cus-city').value;
    const district = document.getElementById('cus-district').value.trim();
    const ward = document.getElementById('cus-ward').value.trim();
    const note = document.getElementById('cus-note').value.trim();
    const email = document.getElementById('cus-email').value.trim();
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

    if (!name || !phone || !address || !city || !district || !ward) {
        alert("Vui lòng nhập đầy đủ họ tên, SĐT và địa chỉ giao hàng!");
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Số điện thoại không hợp lệ (Phải đủ 10 số)!");
        return;
    }

    let productDetails = cart.map(item => `+ ${item.name} (Size: ${item.size}) x${item.quantity}`).join("\n");
    
    let subTotal = 0;
    cart.forEach(item => { subTotal += (parseInt(item.price.replace(/[.,]/g, '')) || 0) * item.quantity; });
    let finalTotalText = subTotal >= 200000 ? subTotal.toLocaleString('vi-VN') + "đ (Freeship)" : (subTotal + 30000).toLocaleString('vi-VN') + "đ (+30k Ship)";

    // NỘI DUNG GỬI TELEGRAM
    const msg = `👟 ĐƠN HÀNG MỚI - CBL SOCCER 👟\n----------------------------\n📦 Sản phẩm:\n${productDetails}\n💰 Tổng cộng: ${finalTotalText}\n👤 Khách hàng: ${name}\n📞 SĐT: ${phone}\n📍 Địa chỉ: ${address}, ${ward}, ${district}, ${city}\n📧 Email: ${email || 'Không cung cấp'}\n📝 Ghi chú: ${note || 'Không có'}\n----------------------------\n🚀 Check đơn chuẩn bị hàng nhé shop!`;

    sendTelegramMessage(msg).catch(err => console.error(err));

    // IN HÓA ĐƠN
    const billDetail = document.getElementById('bill-detail');
    if (billDetail) {
        billDetail.innerHTML = `
            <p><b>Khách hàng:</b> ${name}</p>
            <p><b>SĐT:</b> ${phone}</p>
            <p><b>Địa chỉ:</b> ${address}, ${ward}, ${district}, ${city}</p>
            <p><b>Sản phẩm:</b><br>${cart.map(item => `- ${item.name} (S:${item.size}) x${item.quantity}`).join('<br>')}</p>
            <p><b>Hình thức:</b> <span style="color:#ff477e;font-weight:bold;">${paymentMethod}</span></p>
            <p style="font-size:16px;color:red;margin-top:10px;"><b>Thành tiền:</b> ${finalTotalText}</p>
        `;
    }

    document.getElementById('checkout-modal').style.display = 'none';
    const billModal = document.getElementById('bill-modal');
    if (billModal) billModal.style.display = 'flex';

    // RESET GIỎ HÀNG
    cart = []; saveCart(); updateCartUI();
    if (billTimeout) clearTimeout(billTimeout);

    billTimeout = setTimeout(() => {
        if (billModal) billModal.style.display = 'none';
        document.getElementById('cus-name').value = "";
        document.getElementById('cus-phone').value = "";
        document.getElementById('cus-address').value = "";
        document.getElementById('cus-district').value = "";
        document.getElementById('cus-ward').value = "";
        document.getElementById('cus-note').value = "";
        document.getElementById('cus-email').value = "";
    }, 8000);
}

// TÌM KIẾM SẢN PHẨM MƯỢT MÀ
function searchProduct() {
    let input = document.getElementById('product-search').value.toLowerCase().trim();
    if (input.length > 0) showSection(1);
    const filtered = products.filter(p => p.name.toLowerCase().includes(input));
    renderProducts(filtered);
}

// ĐIỀU HƯỚNG TAB 3D TRÊN PC VÀ TRƯỢT MƯỢT TRÊN MOBILE
function showSection(index) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, i) => page.classList.toggle('active', i === index));
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

async function sendTelegramMessage(message) {
    const token = "8711185097:AAGNpNiha-FaDf-mZB9HtiBON1rW0iSz_K0";
    const chatId = "7901882812";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
    });
}

window.onload = () => {
    renderProducts();
    updateCartUI();
    showSection(0);
};