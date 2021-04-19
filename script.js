'use strict'
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('catalog-list', {
    props: ['goods', 'goodsshow'],
    template: `
    <div class="catalog" v-show="goodsshow">
        <h1>Каталог</h1>
        <div class="goods-list-1">
            <goods-item-catalog v-for="good in goods" :good="good" v-on:click="addtocart($event)"></goods-item-catalog>
        </div>
    </div>
    `,
    methods: {
        addtocart(event) {
            this.$emit('click', event)
        }
    }
});

Vue.component('goods-item-catalog', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            <button v-on:click="addtocart($event)" :data-id="good.id_product">Добавить</button>
           
        </div>
    `,
    methods: {
        addtocart(event) {
            this.$emit('click', event)
        }
    }
});

Vue.component('search-list', {
    props: ['searchresults', 'searchshow'],
    template: `
    <div class="search-list" v-show="searchshow">
        <h1>Результаты поиска</h1>
        <button v-on:click="$emit('searchclose')">X</button>
        <div class="search-list-res">
            <goods-item-search v-for="search in searchresults"          :search="search" v-on:click="addtocart($event)"></goods-item-search>
        </div>
    </div>
    `,
    methods: {
        addtocart(event) {
            this.$emit('click', event)
        }
    }
})

Vue.component('goods-item-search', {
    props: ['search'],
    template: `
        <div class="goods-item">
            <h3>{{ search.product_name }}</h3>
            <p>{{ search.price }}</p>
            <button v-on:click="addtocart($event)"
                :data-id="search.id_product">Добавить</button>
        </div>
    `,
    methods: {
        addtocart(event) {
            this.$emit('click', event)
        }
    }
});

Vue.component('cart-list', {
    props: ['carts', 'cartshow', 'sumbasket', 'total'],
    template: `
    <div class="cart-list" v-show="cartshow">
        <h1>Корзина</h1>
        <button v-on:click="$emit('cartclose')">Х</button>
        <div class="basket">
            <goods-item-cart v-for="cart in carts" v-on:click="delcart($event)" :cart="cart"></goods-item-cart>
        </div >
        <h1 class="totalsumBasket" v-show="sumbasket">Итого: {{total}}</h1>
    </div>
    `,
    methods: {
        delcart(event) {
            this.$emit('click', event)
        }
    }
})

Vue.component('goods-item-cart', {
    props: ['cart'],
    template: `
    <div class="goods-item">
        <h3>{{ cart.product_name }}</h3>
        <p>{{ cart.price }}</p>
        <button v-on:click="delcart($event)" :data-id="cart.id_product">Удалить</button>
    </div>
    `,
    methods: {
        delcart(event) {
            this.$emit('click', event)
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
        sum: 0
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
            let value = document.querySelector('.navigation-search input').value
            if (value == '') {

            }
            else {
                this.searchshow = true
                const regexp = new RegExp(value, 'i');
                this.searchresults = this.goods.filter(search => {
                    return regexp.test(search.product_name)
                })
            }
        },

        searchhide() {
            //Скрыть "Результаты поиска"
            this.searchshow = false
            this.searchresults = []
        },

        addtocart(event) {
            //Добавить элемент в корзину
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id_product == event.target.getAttribute('data-id')) {
                    this.carts.unshift(this.goods[i])
                }
            }
        },
        delcart(event) {
            for (let i = 0; i < this.carts.length; i++) {
                if (this.carts[i].id_product == event.target.getAttribute('data-id')) {
                    this.carts.splice([i], 1)
                    break
                }
            }
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

    computed: {
        //Рассчитать сумму в корзине.
        total: function () {
            this.sum = 0
            this.carts.forEach(element => {
                this.sum = this.sum + element.price
            });
            return this.sum
        }
    }
})