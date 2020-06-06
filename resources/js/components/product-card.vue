<template>
    <div class="product-outer" @click.stop.prevent="redirect(product.url)">
        <div class="product-inner">
            <div class="product-image-wrapper">
                <span class="badge badge-danger price-tag pull-right">{{product.price | formatMoney}}</span>
                <a href="#" class="woocommerce-LoopProduct-link">
                    <img :src="product.image" class="img-responsive" alt="">
                </a>
            </div>
            <div class="product-content-wrapper">
                <a :href=product.url class="woocommerce-LoopProduct-link">
                    <h3>{{product.name}}</h3>
                </a>
                <div v-if="false" itemprop="description">
                    <p style="max-height: none;">{{product.short_description}}</p>
                </div>
                <div class="hover-area">
                    <a rel="nofollow" v-if="product.is_additional == 0" @click.stop.prevent="addToCart( product.id, 1, product.price, $event )"
                       class="button hvr-underline-from-center">
                        Adicionar
                    </a>
                    <a rel="nofollow" v-else @click.stop.prevent="redirect(product.url)"
                       class="button hvr-underline-from-center">
                        Abrir
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        //props: [ 'product', 'url_product_detail' ],
        props: {
            product:{
                type: Object,
                required: true
            },
            url_detail:{
                type: String,
                required: true
            }
        },

        data: () => {
            return {

            }
        },

        methods:{
            redirect(url){
                window.location.href = url;
            }
        },

        mounted(){
            this.product.url = this.url_detail.replace('_SKU_', this.product.sku );
        }

    };
</script>

<style scoped>
    img:nth-child(even){border: 3px solid white;}
    .woocommerce-LoopProduct-link h3{overflow: initial !important;font-size: 2rem !important;}
    .img-responsive{max-height: 200px;}
</style>
