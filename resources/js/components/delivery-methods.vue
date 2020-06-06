<template>
    <div class="container-accordion">
        <div class="accordion">
            <div v-show="preloader" class="preloader text-center">
                <i class="fad fa-spinner fa-pulse fa-2x"></i>
            </div>
            <div v-for="(row, n) in deliveryMethods" ref="btnAccordion" class="accordion-item" :data-name="row.name" :data-key="n"
                 aria-expanded="false">
                <button :data-key="n" class="accordion-button">
                    <span :data-key="n" class="accordion-title">
                        {{row.name}}
                    </span>
                    <span :data-key="n" class="icon" aria-hidden="true"></span>
                </button>
                <div :data-key="n" class="accordion-content">
                    <div v-if="typeof row.attributes !== 'undefined' && row.attributes.length > 0" class="row">
                        <div v-for="(attr, i) in row.attributes" class="col-sm-4 fields">
                            <input type="text" :data-required="attr.required" data-label="Bloco"
                                   maxlength="30"
                                   :placeholder="`${attr.label}` + (attr.required ? '*' : '')"
                                   ref="attrAll"
                                   :data-idx="i"
                                   :data-idx-prev="n"
                                   :data-label="attr.label"
                                   v-on:keyup="keyInputAttr"
                                   :class="'attr_'+`${n}`">
                        </div>
                    </div>
                    <div ref="erroAttr" class="form__error fade-enter-active no-show">*Campo obrigatório</div>
                </div>
            </div>

            <div class="form-group row clearfix">
                <div class="col-sm-8 format">
                    <transition name="fade">
                        <div v-if="error" class="session-msg session-error"><strong>Ops!</strong> {{error}}</div>
                    </transition>
                </div>
                <div v-if="deliveryMethods" class="col-sm-4 format">
                    <button class="button next hvr-underline-from-center" @click.stop.prevent="confirmStep2()">
                        Prosseguir
                        <i v-if="preloaderNext" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i>
                        <i v-else class="fad fa-chevron-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { URL_BASE, SRV_MAIN } from '@/configs/configs';
    import {deliveryMethodModel} from '@/feactures/Order/models/delivery-method';
    import { mixMsgAwait } from '@/mixins/helpers';

    export default {
        props:{

        },

        data(){
            return{
                preloader: false,
                preloaderNext: false,
                error: null,
                deliveryMethods: [],
                idx: null,
                modelDelivery: new deliveryMethodModel(),
            }
        },

        mixins: [ mixMsgAwait ],

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
                                this.selectDelivery(key);
                                this.$refs.btnAccordion[key].setAttribute('aria-expanded', 'true');
                            } else {
                                this.selectDelivery();
                            }
                        }
                    }));
                }
            },
            keyInputAttr: function(event) {

                const el       = event.target;
                const value    = el.value.trim();
                const required = el.getAttribute('data-required');
                const label    = el.getAttribute('data-label');
                const idx      = el.getAttribute('data-idx');
                const idxPrev  = el.getAttribute('data-idx-prev');

                if( required === 'true' && value === '' ){
                    el.classList.add('error__form');
                    this.$refs.erroAttr[idxPrev].classList.remove('no-show');
                    return;
                }

                const currentAttr = { label, value };

                this.$refs.erroAttr[idxPrev].classList.add('no-show');
                el.classList.remove('error__form');

                let attrs = this.modelDelivery.get('attr');
                if( attrs ){
                    attrs[idx] = currentAttr;
                } else {
                    attrs.push( currentAttr );
                }
                this.modelDelivery.set('attr', attrs );

            },
            selectDelivery( idx ){

                this.error = null;
                this.modelDelivery.resetAttr();
                if( typeof idx !== 'undefined' ) {
                    this.idx = parseInt(idx);
                    this.modelDelivery.set('slug', this.deliveryMethods[idx].slug );
                    this.modelDelivery.set('name', this.deliveryMethods[idx].name );
                    Array.from(this.$refs.attrAll).forEach(el => el.value = '');
                } else {
                    this.idx = null;
                }
            },
            async getMethods() {

                this.preloader = true;
                this.error = null;
                try {
                    const result         = await window.axios.get(URL_BASE + 'get/' + SRV_MAIN + 'delivery-methods/');
                    this.deliveryMethods = result.data;
                    this.preloader       = false;
                } catch (error) {
                    this.error     = error.response.data.messages;
                    this.preloader = false;
                }
            },
            confirmStep2(){
                if( !this.preloaderNext ) {
                    this.preloaderNext = true;
                    let flag  = false;
                    let error = 'Existem campos obrigátorios';
                    if( this.idx === null ){
                        error = 'Selecione antes um local de entrega';
                    } else if( this.idx != null && typeof this.$refs.attrAll === 'undefined' ){
                        flag = true;
                    } else {
                        let ttRequired    = 0;
                        let ttRequiredVal = 0;
                        Array.from(document.getElementsByClassName("attr_"+this.idx)).forEach( el => {
                            const required = el.getAttribute('data-required');
                            if( required === 'true' ) ttRequired++;
                            if( required === 'true' && el.value.trim() ) ttRequiredVal++;
                        });
                        if( ttRequired === ttRequiredVal ){
                            flag = true;
                        }
                    }

                    if( true ){
                        this.$emit('emit-delivery-method', this.modelDelivery);
                    } else {
                        this.mix_setMsgAwait( error, 2000, 'error');
                    }
                    this.preloaderNext = false;
                }
            }
        },

        updated(){

        },

        mounted() {
            this.getMethods().then( () => {
                this.startAccordion();
            } );
        }
    }
</script>

<style scoped>

    .session-msg{margin-top: 30px;}

    .error__form{border-color:red !important;}

    button.next{
        float: right;
        margin-top: 2em;
        padding: 0.6999em 1.6em;
    }
    @media (min-width: 320px) {

    }
    @media (min-width: 375px) {

    }
    @media (min-width: 425px) {

    }
    @media (min-width: 768px) {

    }
    @media (min-width: 1024px) {

    }
</style>
