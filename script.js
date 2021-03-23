'use strict'

class GoodsItem {
    constructor(title, price, img = 'images/cross-svgrepo-com.svg', currency = '$') {
        this.title = title;
        this.price = price;
        this.img = img;
        this.currency = currency;
    }
    render() {
        return `<div class="goods-item"><img src=${this.img}><h3>${this.title}</h3><p>${this.price} ${this.currency}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: 'images/white-t-shirt-svgrepo-com.svg' },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img, good.currency);
            listHTML += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHTML;
    }
    sumBasket() {
        let sum = 0;
        this.goods.forEach(xxx => {
            const sumItem = new GoodsItem(xxx.title, xxx.price, xxx.img, xxx.currency);
            sum = sum + xxx.price;
        })
        document.querySelector('.goods-list').insertAdjacentHTML("afterend", `<p class = 'sumBasket'> Итого: ${sum} $</p>`)
    }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumBasket();