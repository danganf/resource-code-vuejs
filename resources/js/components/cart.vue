<template>
    <div class="header-info-wrapper">
        <div class="top-cart">
            <ul class="site-header-cart-v2 menu" v-on:click.stop.prevent="open">
                <li class="cart-content ">
                    <a title="View your shopping cart">
                        <i class="po po-scooter"></i>
                        <span>Abrir carrinho</span>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <a href="#" title="View your shopping cart">
                                <span class="count">{{getTtItems}} itens</span>
                                <span class="amount">{{getSubTotal | formatMoney}}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="top-cart-mobile">
            <ul class="site-header-cart-v2 menu" v-on:click.stop.prevent="open">
                <li class="cart-content">
                    <a>
                        <i class="fad fa-shopping-cart"></i>
                        <span>
                            {{getTtItems}} itens
                            <hr>
                            <span class="total">{{getSubTotal | formatMoney}}</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <nav class='nav-wrapper'>
            <div v-show="preloader" class="preloader">
                <i class="fad fa-spinner fa-pulse fa-2x"></i>
            </div>
            <div class="my-cart-header">
                <div><span>Meu carrinho</span></div>
                <i title="Fechar" v-on:click.stop.prevent="open" class="fad fa-times"></i>
            </div>
            <ul class='nav scrollbar-overflow' style="min-height: 500px">
                <li v-for="(product, idx) in getItems">
                    <c-product-card
                            :item="product"
                    ></c-product-card>
                </li>
            </ul>
            <div class="subtotal">
                <div class="value">
                    subtotal:&nbsp;<span class="amount">{{getSubTotal | formatMoney}}</span>
                </div>
                <button :disabled="getTtItems === 0" @click="initCheckout()" class="btn btn-success btn-lg btn-block btn-rounded">Finalizar</button>
            </div>
        </nav>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';
    import { MixArray } from '@/mixins/array';
    import CProductCard from '@components/product-mini-card';

    export default {
        props: {},

        components: { CProductCard },

        mixins: [ MixArray ],

        data: () => {
            return {
                cartOpen: false,
                tt: 0,
                componentKey: 0,
                quote: {
                    items:[]
                }
            }
        },

        methods:{
            ...mapActions( 'Order', [ 'setCartItems', 'updateCartItems', 'updateCartQtyItem' ] ),
            open(){
                this.cartOpen = !this.cartOpen;
                document.body.classList.toggle("nav-visible");
            },
            addItem( prodID, qty, price ){

                let flag = true;
                if( this.quote.items.length > 0 ) {
                    let idx = this.mixarr_findIdxByKey(this.quote.items, 'product_id', prodID);
                    if( idx >= 0 ){
                        this.quote.items[ idx ].qty += qty;
                        flag = false;
                    }
                }

                if( flag ) {
                    this.quote.items.push( { product_id: parseInt(prodID), qty: parseInt(qty), price: parseFloat( price ) } );
                }

            },
            initCheckout(){
                window.location.href = '/checkout';
            }
        },

        created(){

            //EMITIDO POR resources/js/components/button-min-max.vue
            window.eventBus.$on( 'emit-minicart-qty-item', (prodID, qty) => {
                this.updateCartQtyItem( { product_id: prodID, qty: qty } );
            } );

            //EMITIDO POR resources/js/mixins/addToCart.js
            window.eventBus.$on( 'emitFastAddToCart', (prodID, qty, price) => {
                this.addItem(prodID, qty, price);
                if( this.cartOpen === false ) {
                    this.open();
                }
                this.updateCartItems( this.quote );

            } );

        },

        updated(){

        },

        watch: {
            preloader(newValue, oldValue) {
                if( newValue === false ) {
                    this.quote.items = [];
                    this.getItems.map((item) => {
                        this.addItem(item.product_id, item.qty, item.final_price);
                    });
                }
            }
        },

        computed:{
            ...mapState( 'Order'  , [ 'preloader', 'msgsError' ] ),
            ...mapGetters( 'Order', [ 'getItems', 'getTtItems', 'getSubTotal' ] ),
        },

        mounted(){
            this.setCartItems();
        }
    };
</script>

<style scoped>
    .preloader{position: absolute;left: 44%;top: 20%;}
    .nav-wrapper {
        background-color: white;
        box-shadow: -2px 0 5px 0 rgba(140,140,140,.31);
        height: 100%;
        padding-top: 80px;
        -webkit-perspective: 1000px;
        perspective: 1000px;
        position: fixed;
        right: 0;
        top: 0;
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        -webkit-transition: visibility 0.6s, -webkit-transform 0.6s;
        transition: transform 0.6s, visibility 0.6s, -webkit-transform 0.6s;
        visibility: hidden;
        width: 25vw;
        z-index: 99999;
    }

    .nav-visible .nav-wrapper {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        visibility: visible;
    }

    .nav {
        position: relative;
        -webkit-transform: rotateY(90deg);
        transform: rotateY(90deg);
        -webkit-transform-origin: left center;
        transform-origin: left center;
        -webkit-transition: -webkit-transform 0.6s;
        transition: transform 0.6s, -webkit-transform 0.6s;
        margin: 0 0 0 15px !important;
        overflow: auto;
        max-height: 83vh;
    }

    .scrollbar-overflow::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
    }

    .scrollbar-overflow::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
    }

    .scrollbar-overflow::-webkit-scrollbar-thumb {
        background-color: var(--font-color-4);
    }

    .top-cart-mobile{display: none;}

    @media (max-width: 1920px) {
        .nav-wrapper{width: 22vw;}
        .nav{max-height: 83vh;}
    }
    @media (max-width: 1440px) {
        .nav-wrapper{width: 26vw;}
        .nav{max-height: 73vh;}
    }
    @media (max-width: 1366px) {
        .nav-wrapper{width: 25vw;}
    }
    @media (max-width: 1024px) {
        .nav-wrapper{width: 27vw;}
    }
    @media (max-width: 768px) {
        .nav-wrapper{width: 35vw;}
    }
    @media (max-width: 425px) {
        .nav-wrapper{width: 80vw;}
        .top-cart{display: none;}
        .top-cart-mobile{display: block;}
        hr{margin: 0.5em 0 0.5em !important;}
        .top-cart-mobile{cursor:pointer;}
        .top-cart-mobile ul li a{
            padding: 0.45em 0.9em;
            width: 125px;
            margin-left: 51px !important;
            margin-top: -26px;
            position: absolute;
            font-size: 1.250em !important;
        }
        .top-cart-mobile ul li a i{margin-right: 6px;}
        .top-cart-mobile ul li a span{font-size: 12px !important;padding-left: 0 !important;}
    }
    @media (max-width: 375px) {
        .top-cart-mobile ul li a{padding: 0.56em 0.9em !important;width: 133px;}
        .nav-wrapper{width: 85vw;}
    }
    @media (max-width: 320px) {
        .top-cart-mobile ul li a{width: 108px;margin-top: -20px;margin-left: 81px !important;}
        .top-cart-mobile ul li a span.total, hr{display: none;}
        .nav-wrapper{width: 90vw;}
    }

    .nav-visible .nav {
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
    .nav li{
        border-bottom: 1px solid var(--font-color-default);
        margin-top: 15px;
        padding-bottom: 13px;
    }
    .nav li:first-child{margin-top: 0;}
    .nav li:last-child{border: none;}

    .nav-marker {
        background-color: currentColor;
        height: 2.8rem;
        position: absolute;
        right: 0;
        top: 80px;
        width: 3px;
    }
    .nav-marker:before {
        border: 5px solid transparent;
        border-right-color: inherit;
        content: "";
        height: 0;
        position: absolute;
        right: 3px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 0;
    }
    .my-cart-header {
        font-weight: 700;
        color: var(--background-color-default);
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 9999;
        position: fixed;
        top: 0;
        flex-direction: row;
        justify-content: left;
        padding-left: 15px;
        font-size: 2.5rem;
    }
    .my-cart-header i{
        margin-right: 10px;
        color: var(--background-color-default);
        cursor:pointer;
        position: absolute;
        right: 5px;
        font-size: 3.5rem;
    }

    .subtotal{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 21px;
        background: #F5F5F5;
        height: auto;
        /*box-shadow: rgba(140, 140, 140, 0.31) -2px 0 5px 0;*/
    }
    .subtotal > .value{margin-bottom: 15px;font-weight: 500;}
    .subtotal > .value > .amount{font-weight: 700;font-size: 2.6rem;}
    .btn-success{background: var(--background-color-cart-default)}

</style>
