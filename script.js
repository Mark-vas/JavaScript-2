'use strict'

const goods = [
    { title: 'Shirt', price: 150, img: 'images/white-t-shirt-svgrepo-com.svg' },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = function (title, price, img = 'images/cross-svgrepo-com.svg', currency = '$') {
    return `<div class="goods-item"><img src=${img}><h3>${title}</h3><p>${price} ${currency}</p></div>`;
};

const renderGoodsList = function (list) {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img, item.currency));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);