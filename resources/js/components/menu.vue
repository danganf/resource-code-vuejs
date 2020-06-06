<template>
    <div>
        <div v-show="preloader" class="preloader">
            <i class="fad fa-spinner fa-pulse fa-2x"></i>
        </div>

        <div class="menu-top-carrousel carrousel-container">
            <ul class="menu swiper-wrapper" style="display: flex;clear: both;">
                <li v-for="row in list" class="menu-item swiper-slide"><a :href="`/${row.code}`"><i class="po po-salads" :class="row.icon"></i>{{row.name}}</a></li>
            </ul>
        </div>

        <div class="pull-left swipe-nav swipe-nav-prev">
            <i class="fad fa-chevron-left fa-2x swiper-recomenda-prev cursor-pointer"></i>
        </div>

        <div class="pull-right swipe-nav swipe-nav-next">
            <i class="fad fa-chevron-right fa-2x swiper-recomenda-next cursor-pointer"></i>
        </div>

    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';

    import Swiper from 'swiper';
    import 'swiper/css/swiper.css';

    export default {

        props: ['load-carousel'],

        data: () => {
            return {

            }
        },

        mounted(){
            this.setList();
        },

        updated(){
            this.initSwiper();
            if( this.msgsError !== null ){
                this.$snotify.error( this.msgsError, 'ATENÇÃO!',{timeout: 5000} );
            }
        },

        methods: {
            ...mapActions( 'Category', [ 'setList' ] ),
            initSwiper () {
                const tt = this.list.length;
                if( tt > 0 ){

                    new Swiper('.menu-top-carrousel', {
                        spaceBetween: 0,
                        speed: 500,
                        slidesPerView: tt-2,
                        slidesPerColumn: 1,
                        watchSlidesVisibility: false,
                        autoplay: false,
                        loop: false,/*(window.screen.width <= 768 ? true : false)*/
                        breakpoints: {
                        320 : {slidesPerView: 2},
                        375 : {slidesPerView: 2},
                        425 : {slidesPerView: 3},
                        768 : {slidesPerView: tt-4},
                        991 : {slidesPerView: tt-3},
                        1199: {slidesPerView: tt-2},
                        1499: {slidesPerView: tt-2}
                        },
                        navigation: {
                            nextEl: '.swipe-nav-next',
                            prevEl: '.swipe-nav-prev',
                        },
                        paginationClickable: true,
                    });
                }
            }
        },

        computed: {
            ...mapState( 'Category', [ 'list', 'preloader', 'msgsError' ] ),
            /*...mapGetters( 'Category', [ 'leanList' ] ),*/
        }
    };
</script>

<style scoped>
    .swipe-nav i{color: #FFF;opacity: 0.4;}
    .swipe-nav i:hover{opacity: 0.8;}
    .preloader{text-align: center;color: var(--font-color-3);position: absolute;width: 60%;margin-top: 28px;}
    i.preloader{}
    .carrousel-container {width: auto;overflow: hidden;}
    .swiper-slide {width: auto !important;}

    @media (min-width: 320px) {
        .swipe-nav{display: none;}
    }
    @media (min-width: 425px) {

    }
    @media (min-width: 768px) {
        .swipe-nav{display: block;}
        .swipe-nav-prev{margin-top: -47px;margin-left: -24px;}
        .swipe-nav-next{margin-top: -47px;margin-right: -23px;}
    }
    @media (min-width: 992px) {
        .swipe-nav-prev, .swipe-nav-next{
            margin-top: -53px;margin-left: -30px;
        }
    }
    @media (min-width: 1024px) {

    }
    @media (min-width: 1366px) {
        .swipe-nav-prev{margin-top: -70px;margin-left: -35px;}
        .swipe-nav-next{margin-top: -70px;margin-right: -35px;}
    }
    @media (min-width: 1440px) {

    }
    @media (min-width: 1920px) {

    }
</style>
