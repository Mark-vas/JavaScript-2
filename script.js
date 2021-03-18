'use strict'
document.querySelector('button').style.border = '20px double green'

const goods = [
    { title: 'Shirt', price: 150, currency: "руб." },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

/*const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);

const div = document.getElementsByClassName('goods-item')

const h3 = document.querySelectorAll('h3')
for (let i = 0; i <= h3.length; i++) {
    h3[i].style.color = 'red'
    h3[i].style.fontSize = '25px'
}*/

/*const renderGoodsItem = function (title, price) {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};*/

const renderGoodsItem = function (title, price, currency = '$') {
    return `<div class="goods-item"><h3>${title}</h3><p>${price} ${currency}</p></div>`;
};

const renderGoodsList = function (list) {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.currency));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);

const div = document.querySelectorAll('.goods-item')
for (let i = 0; i < div.length; i++) {
    div[i].style.width = '100px'
    div[i].style.backgroundColor = 'lightgreen'
}

const h3 = document.querySelectorAll('h3')
for (let i = 0; i < h3.length; i++) {
    h3[i].style.color = 'red'
    h3[i].style.fontSize = '25px'
}