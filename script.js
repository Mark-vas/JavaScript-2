'use strict'
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        GoodsShow: true,
        carts: [],
        CartShow: false,
        searchresults: [],
        SearchShow: false,
        valueText: ''
    },
    methods: {
        makeGETRequest(url) {
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
        },

        addToCart(event) {
            //Добавить элемент в корзину
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id_product == event.target.getAttribute('data-id')) {
                    this.carts.unshift(this.goods[i])
                }
            }
        },

        cartList() {
            //Показать корзину
            this.GoodsShow = false
            this.CartShow = true
        },

        cartHide() {
            //Скрыть корзину
            this.CartShow = false
            this.GoodsShow = true
        },

        delItem() {
            //Удаленить элемент из корзины
        },

        searchRes() {
            this.SearchShow = true
            let value = document.querySelector('.navigation-search input').value
            const regexp = new RegExp(value, 'i');
            this.searchresults = this.goods.filter(search => {
                return regexp.test(search.product_name)
            })
        },
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then((data) => {
                this.goods = JSON.parse(data);
                this.carts = JSON.parse(data)
            })
            .catch(error => {
                console.error(error);
            })
    }
})
