// Função para carregar o carrinho do localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = cart.length;

    // Calcular total
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartTotal) {
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    return cart;
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
    const cart = loadCart();
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart(cart);
    loadCart();  // Atualiza a contagem no carrinho
}

// Evento para adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.getAttribute('data-name');
        const price = parseFloat(event.target.getAttribute('data-price'));
        
        addToCart(name, price);
    });
});

// Função para renderizar o carrinho na página do carrinho
function renderCart() {
    const cart = loadCart();
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    cartContainer.innerHTML = '';  // Limpar carrinho atual
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="imagens/${item.name}.jpg" class="img-cart">
            <p class="textoItens">${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-item" data-name="${item.name}">X</button>
        `;
        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de remoção de item do carrinho
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            removeFromCart(name);
        });
    });
}

// Função para remover item do carrinho
function removeFromCart(name) {
    let cart = loadCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    renderCart();  // Atualiza a lista do carrinho na página
}

// Carregar o carrinho ao iniciar a página
loadCart();

// Renderizar o carrinho na página do carrinho
if (document.getElementById('cart-items')) {
    renderCart();
}

// Função para colocar a data minima
const inputDate = document.getElementById("data");
function date() { 
    const currentDate = new Date;
    const yearDate = currentDate.getFullYear();
    const monthDate = currentDate.getMonth()+1;
    const dayDate = currentDate.getDate();
    const minDate = `${yearDate}-${monthDate}-${dayDate}`;
    inputDate.min = minDate;
}

date()

function validDate (date) {
    if(date.value != "") {
            inputDate.style.border = 'none';
            inputDate.disabled = false;
            return true
        } else {
            inputDate.style.border = 'solid red';
            return false
        }
}


const inputTime = document.getElementById('hora')
function validTime(time) {
    const hour = time.value.slice(0,2);
    const texto = document.getElementById("textoHora");
    const date =  new Date;
    const day = date.getDate();
    if(hour != "") {
        if (inputTime)
            if (hour >= 19) {
                inputTime.style.border = 'solid red';
                texto.innerHTML = "<p>Desculpe, fechamos às 19:00, compre amanhã a partir das 8:00</p>";
                return false
            } else if (hour < 8) {
                inputTime.style.border = 'solid red';
                texto.innerHTML = "<p>Desculpe, abrimos somente as 8:00</p>";
                return false
            } else if (hour <= date.getHours() && inputDate.value.slice(8) == day) {
                if (time.value.slice(3) <= date.getMinutes) {
                    inputTime.style.border = 'solid red';
                    texto.innerHTML = "<p>Esse horário ja passou</p>";
                    return false
                }
            }

        inputTime.style.border = 'none';
        inputTime.disabled = false;
        return true
    } else {
        inputTime.style.border = 'solid red';
        return false
    }
}

// Verifica se tem algo no carrinho 
function validCart() {
    const texto = document.getElementById("textoHora");
    if (localStorage.getItem('cart') != null) {
        return true
    } else {
        texto.innerHTML = "<p>Não há itens no carrinho</p>"
        return false
    }
}


function checkout() {
    if (validDate(inputDate) && validTime(inputTime) && validCart()){
        window.location = "FinalizarCompra.html";
        localStorage.removeItem('cart')
   } else {
        validDate(inputDate);
        validTime(inputTime)
   }
}

