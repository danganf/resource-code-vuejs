<template>
    <div>
        <form class="cart" @click.prevent.stop enctype='multipart/form-data'>

            <div class="product_meta" v-if="typeof additionals !== 'undefined' && additionals.length > 0">
                <div class="yith_wapo_groups_container">
                    <div v-if="qty_free > 0" class="opt-free">
                        *Opções grátis: <strong class="pulse3s">{{qty_free_use}} / {{qty_free_calc}}</strong>
                    </div>
                    <h2 class="group-name">Adicionais</h2>
                    <div class="yith_wapo_groups_container_wrap">
                        <div class="ywapo_group_container" v-for="(opt, idx) in additionals">
                            <h3>
                                <!--<img :src="opt.image" alt="" class="pull-left img-additional img-responsive">-->
                                <span>
                                    {{opt.name_front}}
                                    <span v-if="opt.free > 0">*</span>
                                </span>
                                <div class="addit_price badge badge-md badge-danger">+{{opt.final_price | formatMoney}}</div>
                                <!--<div class="addit_price badge badge-md badge-info" v-if="opt.free > 0">*</div>-->
                            </h3>
                            <c-button-min-max
                                    :key="componentKey"
                                    :use_template="'additional'"
                                    @emit-click-btn-normal="emitClickBtnNormal"
                                    @emit-click-btn-free="emitClickBtnFree"
                                    :idx="idx" :stock="opt.stock" :free="opt.free"></c-button-min-max>
                        </div>
                    </div>

                </div>

            </div>
            <div class="session-button">
                <div class="qty-btn">
                    <label>Quantidade:</label>
                    <div class="quantity">
                        <div class="session">
                            <div class="min"><button class="button-qty min" @click="qtyMinus()"><i class="fad fa-minus"></i></button></div>
                            <div class="val-qty" v-model="qty">{{qty}}</div>
                            <div class="max"><button class="button-qty max" @click="qtyMax()"><i class="fad fa-plus"></i></button></div>
                        </div>
                    </div>
                </div>
                <div class="qty-btn" style="padding-left: 40px;padding-right: 20px;">
                    <label>Total:</label>
                    <div class="woocommerce-variation-price">
                        <span class="price">
                            <span class="woocommerce-Price-amount amount">
                                <span class="woocommerce-Price-currencySymbol">R$</span>
                                {{finalPrice | formatMoney('')}}
                            </span>
                        </span>
                    </div>
                </div>
                <button type="submit" v-if="qtyAddtionals > 0" @click.stop.prevent="addToCartAdditional()" class="single_add_to_cart_button button alt">Adicionar</button>
                <button type="submit" v-else @click.stop.prevent="addToCart( id, qty, price, $event );qty=1" class="single_add_to_cart_button button alt">Adicionar</button>
            </div>
        </form>
    </div>
</template>

<script>

    import CButtonMinMax from '@components/button-min-max';

    export default {
        props:[ 'id', 'price', 'qty_free', 'additionals' ],

        components: { CButtonMinMax },

        data: () => {
            return {
                qty: 1,
                change: false,
                final_price: 0,
                qty_free_use: 0,
                qty_free_calc: 0,
                componentKey: 0,
                alert: {
                    position: 'rightBottom',
                    timeout: 2000,
                }
            }
        },

        methods:{
            qtyMax(){
                this.qty++;
                this.change = true;
                this.forceReset();
            },
            qtyMinus(){
                if( this.qty > 1 ){
                    this.qty -= 1;
                    this.change = true;
                    this.forceReset();
                }
            },
            updtValue(){

                if( typeof this.price !== 'undefined' ) {
                    this.final_price = parseFloat(
                        parseFloat( ( this.price * this.qty ) + parseFloat(this.finalPriceAddtionals) ).toFixed(2)
                    );
                    this.qty_free_calc = parseInt(this.qty_free) * this.qty;
                }
            },
            addToCartAdditional(){
                this.$snotify.warning( 'Adicionado com sucesso', 'SIMULANDO!',  {timeout: this.alert.timeout } );
            },
            emitClickBtnFree( qty, idx ){
                let qtyPay = this.additionals[ idx ].qty - this.additionals[ idx ].qty_free_use;
                let tmpQty = this.qty_free_use + qty;

                /*if( qty < 0 && this.qty_free_use === this.qty_free_calc ){
                    this.qty_free_use += qty;
                    return null;
                }*/

                if (qtyPay <= 0 && tmpQty <= this.qty_free_calc) {
                    this.qty_free_use += qty;
                    this.__updateQtyAdditional(qty, idx, true);
                } else {
                    this.emitClickBtnNormal(qty, idx);
                }

            },
            emitClickBtnNormal( qty, idx ){
                this.__updateQtyAdditional( qty, idx );
            },
            __resetAdditionals(){
                this.additionals.map(function (val, index) {
                    val.qty          = 0;
                    val.qty_free_use = 0;
                });
            },
            __updateQtyAdditional( qty, idx, setFreeUse ){
                this.additionals[idx].qty += qty;
                if( setFreeUse === true ){
                    this.additionals[idx].qty_free_use += qty;
                }
            },
            forceReset() {
                if( this.qtyAddtionals > 0 || this.qty_free_use > 0 ) {
                    this.__resetAdditionals();
                    this.qty_free_use = 0;
                    this.componentKey += 1;
                    this.$snotify.warning( 'Os items adicionais foram resetados', 'Atenção!', {timeout: this.alert.timeout, position: this.alert.position} );
                }
            }
        },

        updated(){
            this.updtValue();
        },

        mounted(){
            this.updtValue();
        },

        watch: {
            //ZERANDO QTY
            additionals: function (val) {
                this.__resetAdditionals();
            }
        },

        computed:{
            finalPrice(){
                this.updtValue();
                return this.final_price;
            },
            qtyAddtionals(){
                return typeof this.additionals === 'undefined' ? 0 : this.additionals.reduce(function(a, b) {
                    return a + parseInt( b.qty );
                }, 0);
            },
            finalPriceAddtionals(){
                let result = 0;
                if( typeof this.additionals !== 'undefined' && this.additionals.length > 0 ) {
                    result = parseFloat(this.additionals.reduce(function (a, b) {
                        return a + (b.final_price * ( b.qty - b.qty_free_use ) );
                    }, 0)).toFixed(2);
                }
                return result;
            }
        }
    }
</script>

<style scoped>
    .img-additional{float: left;margin-right: 10px;max-width: 100px;max-height: 100px;}
    .opt-free{padding: 0 21px 19px 0;text-align: right;margin-top: -42px;}
    .opt-free strong{font-size: 1.3em;}

    .quantity{width: 100px;height: 36px;float: right;margin-top: -5px;}
    .quantity > .session{width: 100%;height: 100%;display: grid;grid-template-rows: 100%;grid-template-columns: 33.3% 33.3% 33.3%;}
    .quantity > .session > .min{grid-row: 1 / auto;}
    .quantity > .session > .max{grid-row: 1 / auto;}
    .quantity > .session > .val-qty{grid-row: 1 / auto;line-height: 33px;font-weight: 600;text-align: center;font-size: 2.4rem;}

    .button-qty{background: none;width: 100%;height: 100%;font-size: 16px;font-weight: bolder;text-align: center;padding: 5%;border-width: 0;border-radius: 2px;}

    .quantity > .session > .min button.min{background: var(--font-color-4);}
    .quantity > .session > .max button.max{background: var(--background-color-cart-default);}

    form.cart .button{margin-top: 1.8em !important;}

    .ywapo_group_container h3{color: #71706c !important;}

    h3 p.addit_price{font-size: 0.9em !important;font-weight: 600;}

    .yith_wapo_groups_container_wrap{margin-bottom: 0 !important;}
    .ywapo_group_container{margin-bottom: 18px;}
    .ywapo_group_container:last-child{margin-bottom: 10px;}
    .session-button{background: var(--font-color-2);padding: 10px 5px 14px 10px;border-top: 2px solid var(--font-color-6);}

</style>
