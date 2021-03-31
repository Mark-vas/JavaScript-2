'use strict'
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                }
                else {
                    reject('Error')
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.timeoyt = 15000;
        xhr.ontimeout = () => {
            console.log('Превышено время ожидания')
        }
        xhr.send();
    })
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name, id_product = 'Отсутствует', price = 'По запросу', img = 'images/cross-svgrepo-com.svg') {
        this.product_name = product_name;
        this.id_product = id_product;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item"><img src=${this.img}><h3>${this.product_name}</h3><p>Код товара: ${this.id_product}<p>${this.price}</p><button data-id=${this.id_product}>Добавить в корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then((data) => {
                this.goods = JSON.parse(data);
                list.render();
            })
            .then(() => {
                const buttonscart = document.querySelectorAll('.goods-item button')
                buttonscart.forEach((btnscart) => {
                    btnscart.addEventListener('click', function clickButton(event) {
                        event.target.innerHTML = 'Добавлено';
                        let idProduct = event.target.parentElement
                        cartList.addItems(idProduct)
                    })
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.id_product, good.price, good.img, good.currency);
            listHTML += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHTML;
    }
}

class CartItem {
    constructor() {
        this.items = [];
    }

    addItems(idProduct) {
        document.querySelector('.cart-list').insertAdjacentHTML('afterbegin', `<div class = 'cart-item'>${idProduct.innerHTML}</div>`);
        document.querySelector('.cart-item button').innerHTML = 'Удалить';
    }

    sumBasket() {
        let sum = 0;
        let cart_elem = document.querySelectorAll('.cart-item')
        console.log(cart_elem)
        cart_elem.forEach(elem => {
            sum = sum + Number(elem.children[3].innerHTML);
        })
        document.querySelector('.cart-list').insertAdjacentHTML("afterend", `<p class = 'sumBasket'> Итого: ${sum}</p>`)
    }
}

const list = new GoodsList();
list.fetchGoods()

const cartList = new CartItem();
document.querySelector('.cart-button').addEventListener('click', () => {
    document.querySelector('.goods-list').style.display = 'none';
    document.querySelector('.cart-list').style.display = 'flex';
    if (document.querySelector('.sumBasket')) {

    }
    else {
        cartList.sumBasket()
    }
})


