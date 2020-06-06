<template>
    <div class="cart-product">
        <div class="row no-p-m">
            <div class="col-md-3 col-lg-3 col-xl-3 no-p-m">
                <img :src="item.product_image" class="img-responsive img-thumb" alt="">
            </div>
            <div class="col-md-9 col-lg-9 col-xl-9" style="line-height: 20px;">
                <div class="title">{{item.product_name}}</div>
                <div class="price" :price="item.final_price">{{item.final_price | formatMoney}}</div>
                <c-button-min-max
                        :id="item.product_id"
                        :start_qty="item.qty"
                        :emit_name_default="'emit-minicart-qty-item'"
                ></c-button-min-max>
            </div>
        </div>
    </div>
</template>

<script>

    import CButtonMinMax from '@components/button-min-max';

    export default {
        props: [ 'item' ],

        components: { CButtonMinMax },

        data: () => {
            return {
                qty: 0,
                price: 0,
                componentKey: 0,
            }
        },

        updated:{

        },

        mounted(){
            this.qty   = parseInt(this.item.qty);
            this.price = this.item.final_price;
        }

    };
</script>

<style scoped>

    .title{color: #2d2b2d;font-size: 1.4rem;font-weight: 500;}
    .price{color: #2d2b2d;font-size: 1.6rem;font-weight: 600;}

    .img-thumb{
        padding: .25rem;
        background-color: #fff;
        border: 1px solid #b3b3b3;
        border-radius: .25rem;
        max-width: 100%;
    }

</style>
