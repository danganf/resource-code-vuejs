<template>
    <div>
        <div style="width: 100%;display: block;">
            <h3 id="order_review_heading">Seu pedido</h3>
            <div id="order_review" class="woocommerce-checkout-review-order">
                <table class="shop_table woocommerce-checkout-review-order-table">
                    <thead>
                    <tr>
                        <th class="product-name">Produto</th>
                        <th class="product-total">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, idx) in items" :key="'prod-sku-'+`${item.product_sku}`" class="cart_item">
                        <td>
                            <strong class="product-quantity">&times; {{item.qty}}</strong> {{item.product_name}}
                        </td>
                        <td class="product-total">
                            <span class="woocommerce-Price-amount amount">{{item.final_price | formatMoney}}</span>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr class="cart-subtotal">
                        <th colspan="2">
                            <div class="pull-left">Subtotal</div>
                            <div class="pull-right amount">{{subTotal | formatMoney}}</div>
                        </th>
                    </tr>
                    <tr class="order-total">
                        <th colspan="2">
                            <div class="pull-left">Total</div>
                            <div class="pull-right amount">{{subTotal | formatMoney}}</div>
                        </th>
                    </tr>
                    </tfoot>
                </table>
                <div v-show="preloader" class="preloader text-center">
                    <i class="fad fa-spinner fa-pulse fa-2x"></i>
                </div>
                <div id="payment" class="woocommerce-checkout-payment">
                    <transition-group tag="div" name="fade-block" class="form-row place-order">
                        <span v-if="finale" :key="'create-order'">    
                            <p v-if="change" class="form-row pulse3s" style="text-align: center">
                                Pegue com o entregador<br><strong>{{ ( parseFloat( change - subTotal ) ) | formatMoney}}</strong> de troco.
                            </p>                    
                            <button class="button hvr-underline-from-center" style="text-align: center;">Fazer pedido</button>
                        </span>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            items:{
                type: Array,
                require: true
            },
            subTotal:{
                type: Number,
                required: true
            },
            change:{
                type: Number,
                default: 0,
            },
            preloader:{
                type: Boolean,
                required: true
            },
            finale: {
                type: Boolean,
                default: false
            },
            
        }
    }
</script>

<style scoped>
    .cart-subtotal .amount{font-size: 1.2em;font-weight: normal;}
    .order-total .amount{font-size: 1.4em;font-weight: normal;}
    #payment .place-order{padding: 0 0 1.387em 0 !important;}

    .woocommerce-checkout-review-order-table td, .woocommerce-checkout-review-order-table th{
        color: var(--font-color-7);
    }
</style>
