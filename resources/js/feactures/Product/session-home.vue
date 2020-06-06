<template>
    <div class="striped">
        <div class="stretch-full-width" v-for="( list, idx ) in list_home">
            <div class="container">
                <div class="section-products">
                    <h2 class="section-title">
                        {{list.name}}
                        <div class="pager-slider">
                            <i :class="`swiper-recomenda-prev-${idx+1}`" class="fal fa-chevron-circle-left cursor-pointer"></i>
                            <i :class="`swiper-recomenda-next-${idx+1}`" class="fal fa-chevron-circle-right cursor-pointer"></i>
                        </div>
                    </h2>
                    <div :class="`session-home-${idx+1}`" class="columns-4 carrousel-container" style="padding-bottom: 40px;">
                        <div v-show="preloader" class="preloader">
                            <i class="fad fa-spinner fa-pulse fa-2x"></i>
                        </div>
                        <ul class="products carousel swiper-wrapper">
                            <li class="product swiper-slide" v-for="product in list.products">
                                <c-product-card :product="product" :url_detail="url_product_detail"></c-product-card>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';

    import CProductCard from '@components/product-card';

    import Swiper from 'swiper';

    export default {

        props: {
            url_product_detail:{
                type: String,
                required: true
            }
        },

        components: { CProductCard },

        data: () => {
            return {

            }
        },

        mounted(){
            this.setListHome();
        },

        updated(){
            this.initSwiper();
        },

        methods: {
            ...mapActions( 'Product', [ 'setListHome' ] ),
            initSwiper () {
                let x = 0;
                for (x=1; x<=this.ttProductHome; x++) {
                    new Swiper('.session-home-'+x, {
                        spaceBetween: 0,
                        speed: 500,
                        slidesPerView: 7,
                        slidesPerColumn: 1,
                        watchSlidesVisibility: false,
                        autoplay: false,
                        loop: false,
                        // Responsive breakpoints
                        breakpoints: {
                            320: {slidesPerView: 1},
                            425: {slidesPerView: 2},
                            768: {slidesPerView: 3},
                            991: {slidesPerView: 4},
                            1199: {slidesPerView: 4},
                            1499: {slidesPerView: 4}
                        },
                        navigation: {
                            nextEl: '.swiper-recomenda-next-'+x,
                            prevEl: '.swiper-recomenda-prev-'+x,
                        },
                        paginationClickable: false,
                    });
                }
            }
        },

        computed: {
            ...mapState( 'Product', [ 'list_home', 'preloader' ] ),
            ...mapGetters( 'Product', [ 'ttProductHome' ] ),
        }
    };
</script>

<style scoped>
    .pager-slider{float: right;}
    .pager-slider i{margin-left: 10px;font-size: 3.1rem;color: var(--color-default);}
    .pager-slider i:hover{color: var(--background-color-cart-default);}
    /*.preloader{text-align: center;color: #EF6836;float: left;font-size: 0.4em;margin-top: 0;display: contents;}*/
    .preloader{color: #EF6833;font-size: 1.0em;margin-top: 0;position: unset;text-align: center;z-index: 99999;}
    i.preloader{

    }
    .carrousel-container {margin-left: auto;margin-right: auto;position: relative;list-style: none;padding: 0;overflow: hidden;}

    div.striped > div:nth-child(even){background-color: #f5f5f5;margin-top: -85px;}
    div.striped > div:nth-child(even) .section-products{margin-top: 50px;}

    .section-products .columns-4 ul.products > li{padding-bottom: 65px !important;}

    @media (max-width: 320px) {
        .pager-slider{display: none;}
    }
</style>
