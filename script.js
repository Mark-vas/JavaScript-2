'use strict'
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('catalog-list', {
    props: ['goods', 'goodsshow', 'carts', 'sum'],
    template: `
    <div class="catalog" v-show="goodsshow">
        <h1>Каталог</h1>
        <div class="goods-list-1">
            <goods-item-catalog v-for="good in goods" :good="good" :goods="goods" :carts="carts" :sum="sum"></goods-item-catalog>
        </div>
        
    </div>
    `
});

Vue.component('goods-item-catalog', {
    props: ['good', 'goods', 'carts', 'sum'],
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            <button v-on:click="addtocart($event, goods, carts, sum)" :data-id="good.id_product" :sum="sum">Добавить</button>
           
        </div>
    `,
    methods: {
        addtocart(event, goods, carts, sum) {
            //Добавить элемент в корзину
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].id_product == event.target.getAttribute('data-id')) {
                    carts.unshift(goods[i])
                    //Рассчитать сумму в корзине.
                    carts.forEach(elemcart => {
                        sum[0] = sum[0] + elemcart.price;
                    })
                }
            }
        },
    }
});

Vue.component('search-list', {
    props: ['searchresults', 'searchshow', 'carts', 'sum', 'goods'],
    template: `
    <div class="search-list" v-show="searchshow">
        <h1>Результаты поиска</h1>
        <button v-on:click="searchhide">X</button>
        <goods-item-search v-for="search in searchresults" :search="search" :goods="goods" :carts="carts" :sum="sum"></goods-item-search>
    </div>
    `,
    methods: {
        searchhide() {
            this.$emit('click')
        }
    }
})

Vue.component('goods-item-search', {
    props: ['search', 'goods', 'carts', 'sum'],
    template: `
        <div class="goods-item">
            <h3>{{ search.product_name }}</h3>
            <p>{{ search.price }}</p>
            <button v-on:click="addtocart($event, goods, carts, sum)"
                :data-id="search.id_product">Добавить</button>
        </div>
    `,
    methods: {
        addtocart(event, goods, carts, sum) {
            //Добавить элемент в корзину
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].id_product == event.target.getAttribute('data-id')) {
                    carts.unshift(goods[i])
                    //Рассчитать сумму в корзине.
                    carts.forEach(elemcart => {
                        sum[0] = sum[0] + elemcart.price;
                    })
                }
            }
        },
    }
});

Vue.component('cart-list', {
    props: ['carts', 'cartshow', 'sumbasket', 'sum'],
    template: `
    <div class="cart-list" v-show="cartshow">
        <h1>Корзина</h1>
        <button v-on:click="carthide">Х</button>
        <div class="basket">
            <goods-item-cart v-for="cart in carts" :cart="cart" :carts="carts" :sum="sum"></goods-item-cart>
        </div >
        <h1 class="totalsumBasket" :sum="sum" v-show="sumbasket">Итого: {{sum[0]}}</h1>
    </div>
    `,
    methods: {
        carthide() {
            this.$emit('click')
        },
    }
})

Vue.component('goods-item-cart', {
    props: ['cart', 'carts', 'sum'],
    template: `
    <div class="goods-item">
        <h3>{{ cart.product_name }}</h3>
        <p>{{ cart.price }}</p>
        <button v-on:click="delcart($event, carts, sum)" :data-id="cart.id_product">Удалить</button>
    </div>
    `,
    methods: {
        delcart(event, carts, sum) {
            //Удаленить элемент из корзины.
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].id_product == event.target.getAttribute('data-id')) {
                    carts.splice([i], 1)
                    //Пересчитать сумму в корзине с учетом удаленных элементов
                    sum[0] = 0
                    carts.forEach(elemcart => {
                        sum[0] = sum[0] + elemcart.price;
                    })
                    break
                }
            }
        },
    }
})

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        goodsshow: true,
        carts: [],
        cartshow: false,
        sumbasket: false,
        searchresults: [],
        searchshow: false,
        valuetext: '',
        sum: [0]
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

        cartlist() {
            //Показать корзину
            this.goodsshow = false
            this.cartshow = true
            this.searchshow = false
            this.sumbasket = true
        },

        carthide() {
            //Скрыть корзину
            this.cartshow = false
            this.goodsshow = true
        },

        searchres() {
            // Поиск продукта в каталоге
            this.searchshow = true
            let value = document.querySelector('.navigation-search input').value
            const regexp = new RegExp(value, 'i');
            this.searchresults = this.goods.filter(search => {
                return regexp.test(search.product_name)
            })
        },

        searchhide() {
            //Скрыть "Результаты поиска"
            this.searchshow = false
            this.searchresults = []
        }
    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then((data) => {
                this.goods = JSON.parse(data);
            })
            .catch(error => {
                console.error(error);
            })
    },
})