<template>
    <div>
        <div v-if="use_template === 'additional'" class="ywapo_input_container">
            <div class="quantity">
                <div class="session" v-if="stock > 0">
                    <div class="min"><button class="button-qty min" @click.stop.prevent="qtyMinus()"><i class="fad fa-chevron-double-left"></i></button></div>
                    <div class="val-qty" v-model="qty">{{qty}}</div>
                    <div class="max"><button class="button-qty max" @click.stop.prevent="qtyMax()"><i class="fad fa-chevron-double-right"></i></button></div>
                </div>
                <div v-else class="no-stock">
                    Indisponível
                </div>
            </div>
        </div>
        <div v-else-if="use_template === 'default'" class="add-to-cart">
            <div class="session">
                <div class="minus"><button class="button-add-cart minus" @click.stop.prevent="qtyMinus()">-</button></div>
                <div class="qty" :qty="qty">{{qty}}</div>
                <div class="max"><button class="button-add-cart max" @click.stop.prevent="qtyMax()">+</button></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            use_template:{
                type: String,
                default: 'default', /* enum: additional|default */
            },
            emit_name_default:{
                type: String,
                default: 'emit-action-default',
            },
            id:{//use template minicart
                type: Number|String,
            },
            start_qty:{//use template minicart
                type: Number|String,
                default: 0
            },
            idx:{
                type: Number,
                default: 0
            },
            free:{
                type: Number,
                default: 0
            },
            stock:{
                type: Number,
                default: 0
            },
            change:{
                type: Boolean,
                default: false
            }
        },

        data: () => {
            return {
                qty: 0,
                emit_value: 1,
                click: false
            }
        },

        methods:{
            qtyMax(){
                this.click = true;
                this.qty++;
                this.emit_value = 1;
            },
            qtyMinus(){
                this.click = false;
                if( this.qty > 0 ) {
                    this.click = true;
                    this.qty--;
                    this.emit_value = -1;
                }

            },
            emitValue(){

                if( this.use_template === 'additional' ){
                    let actionName = 'emit-click-btn-normal';
                    if( this.free > 0 ) {
                        actionName = 'emit-click-btn-free';
                    }
                    this.$emit( actionName, this.emit_value, this.idx );
                } else {
                    if( typeof window.eventBus === 'undefined' ) {
                        this.$emit( this.emit_name_default, parseInt( this.id ), this.qty );
                    } else {
                        window.eventBus.$emit(this.emit_name_default, parseInt(this.id), this.qty);
                    }
                }

            }
        },

        mounted(){
            if( this.use_template === 'default' ) {
                this.qty = parseInt( this.start_qty );
            }
        },

        watch: {
            start_qty: function ( newVal, oldVal ) {
                //window.console.log( newVal + ' > ' + oldVal );
            }
        },

        updated() {
            if( this.click === true ) {
                this.emitValue();
            }
        }
    }
</script>

<style scoped>
    .ywapo_input_container .quantity{width: 100px;height: 36px;float: right;margin-top: -5px;}
    .ywapo_input_container .quantity > .session{width: 100%;height: 100%;display: grid;grid-template-rows: 100%;grid-template-columns: 33.3% 29.5% 33.3%;}
    .ywapo_input_container .quantity > .session > .min{grid-row: 1 / auto;}
    .ywapo_input_container .quantity > .session > .max{grid-row: 1 / auto;}
    .ywapo_input_container .quantity > .session > .val-qty{grid-row: 1 / auto;line-height: 33px;font-weight: 600;text-align: center;font-size: 2.4rem;}

    .button-qty{background: none;width: 100%;height: 100%;font-size: 16px;font-weight: bolder;text-align: center;padding: 5%;border-width: 0;border-radius: 2px;}

    .ywapo_input_container .quantity > .session button{font-size: 1.6em;display: grid;}
    .ywapo_input_container .quantity > .session > .min button.min{color: var(--font-color-4);background: none;}
    .ywapo_input_container .quantity > .session > .max button.max{color: var(--font-color-4);background: none;}

    .ywapo_input_container .quantity > .session > .min button.min:hover{color: var(--background-color-default);}
    .ywapo_input_container .quantity > .session > .max button.max:hover{color: var(--background-color-default);}

    .no-stock{color:var(--background-color-default);}

    .add-to-cart{
        width: 100px;
        height: 36px;
        float: right;
        margin-top: -15px;
    }

    .add-to-cart > .session{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 33.3% 33.3% 33.3%;
    }
    .add-to-cart > .session > .minus{grid-row: 1 / auto;}
    .add-to-cart > .session > .max{grid-row: 1 / auto;}
    .add-to-cart > .session > .qty{
        grid-row: 1 / auto;
        line-height: 33px;
        font-weight: 600;
        text-align: center;
    }

    .add-to-cart .button-add-cart{
        background: var(--background-color-default);
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: bolder;
        text-align: center;
        padding: 5%;
        border-width: 0;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        border-radius: 2px;
    }
    .add-to-cart button.minus{background: var(--font-color-4);}
    .add-to-cart button.max{background: var(--background-color-cart-default);}
</style>
