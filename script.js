'use strict'
const fetch = (url, callback) => {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(product_name, id_product = 'Отсутвсует', price = 'По запросу', img = 'images/cross-svgrepo-com.svg', currency = '$') {
        this.product_name = product_name;
        this.id_product = id_product;
        this.price = price;
        this.img = img;
        this.currency = currency;
    }

    render() {
        return `<div class="goods-item"><img src=${this.img}><h3>${this.product_name}</h3><p>Код товара: ${this.id_product}<p>Цена: ${this.price} ${this.currency}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        fetch(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
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

    sumBasket() {
        let sum = 0;
        this.goods.forEach(xxx => {
            const sumItem = new GoodsItem(xxx.product_name, xxx.id_product, xxx.price, xxx.img, xxx.currency);
            sum = sum + xxx.price;
        })
        document.querySelector('.goods-list').insertAdjacentHTML("afterend", `<p class = 'sumBasket'> Итого: ${sum} $</p>`)
    }
}

const list = new GoodsList();
document.querySelector('button').addEventListener('click', function () {
    list.fetchGoods(() => {
        list.render();
        if (document.querySelector('.sumBasket')) {

        }
        else {
            list.sumBasket()
        }
    })
})
