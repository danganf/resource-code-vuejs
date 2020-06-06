<template>
    <div>
        <div class="container-accordion">
            <div class="accordion">
                <div v-show="preloader" class="preloader text-center">
                    <i class="fad fa-spinner fa-pulse fa-2x"></i>
                </div>
                <div v-for="(row, n) in listMethods" :key="'payment-'+`${n}`" ref="btnAccordion" class="accordion-item" :data-key="n" aria-expanded="false">
                    <button :data-key="n" class="accordion-button" id="accordion-button-1">
                    <span :data-key="n" class="accordion-title">
                        {{row.method}}
                    </span>
                        <span :data-key="n" class="icon" aria-hidden="true"></span>
                    </button>
                    <div :data-key="n" class="accordion-content" :class="{money: row.slug === 'money'}">
                        <div class="row">
                            <div class="col-sm-15 fields">
                                <div v-if="row.slug === 'money'">
                                    <label>Você vai precisar de troco?</label>
                                    <button ref="btnChange" @click.stop.prevent="applyChange($event, false)" class="button next hvr-underline-from-center">Não</button>
                                    <button ref="btnChange" @click.stop.prevent="applyChange($event, true)" class="button next hvr-underline-from-center">Sim</button>
                                    <div v-show="isChange" style="margin-top: 10px">
                                        Digite quanto vai pagar para que o entregador leve o seu troco<br>
                                        <input ref="money" v-model.lazy="valChange" v-money="configDirectivemoney" type="text" placeholder="">
                                    </div>
                                </div>
                                <p v-else>Pague na entrega</p>
                            </div>
                        </div>
                        <div ref="erroAttr" class="form__error fade-enter-active no-show">*Campo obrigatório</div>
                    </div>
                </div>
            </div>
        </div>
        <transition-group tag="div" class="pull-right" v-if="completed">
            <button :key="'btnFinish'" class="button next hvr-underline-from-center" @click.stop.prevent="finish()">
                Prosseguir
                <i v-if="preloaderNext" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i>
                <i v-else class="fad fa-chevron-double-right"></i>
            </button>
        </transition-group>
    </div>
</template>

<style scoped>

    .session-msg{margin-top: 30px;}
    .error__form{border-color:red !important;}
    .next{padding: 0.8999em 1.6em;}

    .container-accordion {margin: 0 auto;display: flex;}
    .accordion .accordion-item {float: left;;}
    .accordion button.accordion-button {text-align: left;width: 100%;padding: 1em 0;}
    .accordion button.accordion-button .accordion-title {padding: 1em 1.5em 1em 1.8em;}
    .accordion button.accordion-button .icon {top: 2px;left: 0;}
    .accordion-item[aria-expanded='false'] button.accordion-button .icon::before {top: 9px;left: 6px;}
    .accordion-item[aria-expanded='true'] button.accordion-button .icon::before {top: 9px;left: 1px;}
    label{color: var(--font-color-7);}

    .money button:hover {opacity: 0.6;}
    .moneySelect{background-color: var(--background-color-cart-default);}

    .accordion .accordion-content div.row {
        padding: 0 0 15px 0;
        margin: 0;
    }
    .accordion .accordion-content p {
        font-size: 1.5rem;
        font-weight: normal;
        margin: 1em 0;
    }

    @media (min-width: 320px) {
        .accordion .accordion-item {width: 100%;}
        .money button{padding: 0.89em 2.100em;text-transform: uppercase;margin-right: 5px;}
        .accordion .fields input{width: 77%;}
        .accordion .accordion-content div.row {margin: -15px 0 0 0;}
    }
    @media (min-width: 375px) {
        .accordion .fields input{width: 65%;}
    }
    @media (min-width: 425px) {
        .money button{padding: 0.89em 1.100em;margin-right: 0;}
        .accordion .fields input{width: 55%;}
    }
    @media (min-width: 768px) {
        .accordion .accordion-item {
            width: 25%;
            margin-bottom: 30px;
        }
        .accordion .accordion-content div.row {margin: 0;}
        .accordion-content{background: rgb(245,245,245);}
        .accordion .fields input{width: 45%}
        .money{
            width: 300%;
            display: flex;
            margin-left: -7px;
            padding-left: 10px;
            background: linear-gradient(90deg, rgba(245,245,245,1) 55%, rgba(255,255,255,1) 100%);
        }
        .money button{padding: 0.89em 1.100em;}
    }
    @media (min-width: 1024px) {
        .accordion .fields input{width: 50%;}
    }

</style>

<script>

    import { URL_BASE, SRV_MAIN } from '@/configs/configs';
    import {paymentMethodModel} from '@/feactures/Order/models/payment-method';
    import { MixMsgNotify } from '@/mixins/helpers';
    import { MixMoney } from '@/mixins/money';
    import { mapGetters } from 'vuex';

    export default {
        props:{

        },

        data(){
            return{
                preloader: false,
                preloaderNext: false,
                error: null,
                completed: false,
                listMethods: [],
                isChange: false,
                valChange: 0.0,
                modelPayment: new paymentMethodModel(),
            }
        },

        mixins: [ MixMsgNotify, MixMoney ],

        methods: {
            startAccordion() {
                if (typeof this.$refs.btnAccordion !== 'undefined') {
                    this.$refs.btnAccordion.forEach(item => item.addEventListener('click', (el) => {
                        const scope = el.target;
                        let key = scope.getAttribute('data-key');
                        if( typeof this.$refs.btnAccordion[key] !== 'undefined'){
                            const itemToggle = this.$refs.btnAccordion[key].getAttribute('aria-expanded');

                            if( typeof this.$refs.attrAll !== 'undefined' ) {
                                Array.from(this.$refs.attrAll).forEach(el => el.value = '');
                            }

                            for (let i = 0; i < this.$refs.btnAccordion.length; i++) {
                                this.$refs.btnAccordion[i].setAttribute('aria-expanded', 'false');
                            }

                            if (itemToggle === 'false') {
                                this.selectPayment(key);
                                this.$refs.btnAccordion[key].setAttribute('aria-expanded', 'true');
                            } else {
                                this.selectPayment();
                            }
                        }
                    }));
                }
            },
            selectPayment( idx ){
                this.modelPayment.resetAttr();
                this.completed = false;
                this.isChange  = false;
                Array.from(this.$refs.btnChange).forEach( el => el.classList.remove('moneySelect') );
                this.valChange = 0;
                if( typeof idx !== 'undefined' ) {
                    const slug = this.listMethods[idx].slug;
                    this.modelPayment.set('slug', slug);
                    this.modelPayment.set('name', this.listMethods[idx].method);
                    this.completed = true;
                    if( slug === 'money' ){
                        this.completed = false;
                    }
                }
            },
            async getMethods() {

                this.preloader = true;
                this.error = null;
                try {
                    const result     = await window.axios.get(URL_BASE + 'get/' + SRV_MAIN + 'payment-methods/');
                    this.listMethods = result.data;
                    this.preloader   = false;
                } catch (error) {
                    this.error     = error.response.data.messages;
                    this.preloader = false;
                }
            },
            applyChange( $e, action ){
                this.isChange  = action;
                this.completed = true;
                Array.from(this.$refs.btnChange).forEach( el => el.classList.remove('moneySelect') );
                $e.target.classList.add('moneySelect');
            },

            finish(){
                if( this.completed ){

                    if( this.isChange ){

                        if( this.modelPayment.get('change') === 0 ) {
                            this.mix_msgNotify('Digite antes o valor a ser pago.', 'error');
                            return;
                        }
                        else if( this.modelPayment.get('change') <= this.getSubTotal ) {
                            this.mix_msgNotify('O valor digitado é menor ou igual que o da venda', 'error');
                            return;
                        }
                    }

                    this.$emit('emit-payment-method', this.modelPayment);
                }
            }
        },

        updated(){

        },

        computed:{
            ...mapGetters( 'Order', [ 'getSubTotal' ] ),
        },

        watch: {
            valChange(val){
                try {
                    this.modelPayment.set('change', parseFloat(val.trim().replace('.', '').replace(',', '.').replace(this.configDirectivemoney.prefix, '')));
                } catch (e) {
                    this.modelPayment.set('change', 0);
                }
            }
        },

        mounted() {
            this.getMethods().then( () => {
                this.startAccordion();
            } );
        }
    }
</script>
