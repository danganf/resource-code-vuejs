<template>

    <div class="product">
        <div v-show="preloader" class="preloader">
            <i class="fad fa-spinner fa-pulse fa-2x"></i>
        </div>
        <div class="single-product-wrapper">

            <div class="product-images-wrapper">
                <div class="images">
                    <a itemprop="image" class="woocommerce-main-image zoom" title="">
                        <img :src="image" class="img-thumb img-responsive" alt=""/>
                    </a>
                </div>
            </div>

            <div class="summary entry-summary">
                <h1 itemprop="name" class="product_title entry-title">{{product.name_front}}</h1>
                <div itemprop="description">
                    <p v-if="product.short_description">{{product.short_description}}</p>
                </div>
                <c-options :price="price" :id="product.id" :qty_free="product.qty_free" :additionals="product.additionals"></c-options>
                <div class="social-sharing">
                    <small>Compartilhar:</small>
                    <social-sharing url="www.saladero.com.br"
                                    :title="`${product.name_front} - ${product.short_description}`"
                                    :media="image"
                                    :description="`${product.name_front} - ${product.short_description}`"
                                    :quote="product.name_front"
                                    hashtags="saladeroOficial"
                                    inline-template>
                        <div style="display: contents">
                            <network network="facebook">
                                <span class="btn btn-info btn-sm" title="no Facebook"><i class="fa fa-facebook"></i></span>
                            </network>
                            <network network="whatsapp">
                                <span class="btn btn-info btn-sm" title="no WhatsApp"><i class="fa fa-1x fa-whatsapp"></i></span>
                            </network>
                        </div>
                    </social-sharing>
                </div>
            </div>

        </div>

        <div class="woocommerce-tabs wc-tabs-wrapper" :class="{additional: is_additional}">
            <ul class="nav nav-tabs pizzaro-nav-tabs tabs wc-tabs" >
                <li class="nav-item description_tab active">
                    <a class="active" data-toggle="tab">Informações adicionais</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane panel active entry-content wc-tab" id="tab-description">
                    <div class="tab-description">
                        <p v-if="product.description" class="text-center">{{product.description}}</p>
                        <p v-if="false"><strong>Ingredientes:</strong> Dr. Praeger&#8217;s Black Bean Burger, Focaccia bun, Balsamic Vinaigrette, Pesto, Tomato, Swiss Cheese</p>
                        <p><strong>SKU:</strong> {{product.sku}}</p>
                        <div v-if="typeof product.categories !== 'undefined' && product.categories.length > 0" class="line">
                            <strong>CATEGORIAS:</strong>
                            <ul class="list">
                                <li v-for="cate in product.categories"><a href="#">{{cate}}</a></li>
                            </ul>
                        </div>
                        <div v-if="typeof product.tags !== 'undefined' && product.tags.length > 0" class="line">
                            <strong>TAGS:</strong>
                            <ul class="list">
                                <li v-for="tag in product.tags"><a href="#">{{tag}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import COptions from './extends/detail-options';

    export default {
        props: {
            sku: {
                type: String,
                required: true,
            }
        },

        components:{ COptions },

        data: () => {
            return {
                price: 0,
                image: null,
                is_additional: false
            }
        },

        methods:{
            ...mapActions( 'Product', [ 'setProduct' ] ),
            updtValue(){
                if( typeof this.product.price !== 'undefined' ) {
                    this.price         = parseFloat(this.product.price.final).toFixed(2);
                    this.image         = this.product.image[0];
                    this.is_additional = this.product.additionals.length < 4 ? false : true;
                }
            }
        },

        updated(){
            this.updtValue();
            if( this.msgsError !== null ){
                this.$snotify.error( this.msgsError, 'ATENÇÃO!',{timeout: 5000} );
            }
        },

        mounted(){
            this.setProduct( this.sku );
        },

        computed: {
            ...mapState( 'Product', [ 'product', 'preloader', 'msgsError' ] ),
        }

    }
</script>

<style scoped>
    .list{list-style: none;padding: 0;display: inline-flex;margin: 0 0 0 10px;}
    .list li{margin: 0 1rem 0 0;border-right: 1px solid var(--font-color-4);padding: 0 1rem 0 0;}
    .list li:last-child{border-right: none;}
    .list li a{color: inherit;}
    .list li a:hover{color: #337ab7;}
    .line{margin: 0 0 1em;}
    .preloader{position: absolute;top: 20%;left: 50%;}
    .social-sharing{float: right;margin-top: -35px;font-style: italic;}
    .woocommerce-tabs #tab-description {text-align: left;}
    .single-product.style-1 div.product div[itemprop=description]{margin-bottom: 0 !important;}
</style>
