<template>
    <div class="">

        <c-step-progress v-if="getTtItems > 0"></c-step-progress>

        <div class="page type-page status-publish hentry">
            <div class="entry-content">
                <div v-if="loading" style="display: grid;" class="preloader loading text-center"><i class="fad fa-spinner fa-pulse fa-2x"></i> Abrindo seu carrinho</div>
                <div class="woocommerce" v-else-if="getTtItems > 0">
                    <form name="checkout"  class="checkout woocommerce-checkout session-default" onsubmit="return false">

                        <div class="col-md-8 col-lg-7 session-left">

                            <div v-show="!isStep(2) || isAlive" class="woocommerce-billing-fields">                                    
                                <span v-if="!isAlive">
                                    <h3 class="personal">Dados Pessoais</h3>
                                    <span>
                                        Já é nossa cliente? Clique <a ref="menuMyAccount" id="menuMyAccount" @click="openAuth()">aqui</a> para entrar.
                                    </span>
                                </span>

                                <transition-group name="fade" v-on:after-leave="openAuth" tag="span">
                                    <div v-if="isAlive" :key="'step1'" class="auth-in">
                                        Você está logado como <strong>{{storageAuth.get('name')}}</strong>
                                        <small>({{storageAuth.get('login')}})</small>.
                                        <span class="btn btn-danger btn-sign-out btn-sm pull-right" @click.stop.prevent="logOut()"><i class="fad fa-sign-out"></i> Trocar</span>                                        
                                    </div>
                                </transition-group>

                                <ul class="sub-menu" ref="subMenuAuth" id="subMenuAuth">
                                    <li class="menu-item">
                                        <c-my-account :key="'auth-checkout'" :place="'checkout'" :isDesktop="true"></c-my-account>
                                    </li>
                                </ul>
                                <c-customer-create v-show="!isAlive" @emit-customer-data="getEmitCustomerData" :is-emit="true"></c-customer-create>
                            </div>
                            <div v-if="!isAlive && isStep(2)" class="auth-in">
                                Dados do cliente:
                                <span class="pull-right cursor-pointer" @click.stop.prevent="resetStep(1);"><i class="fad fa-pen"></i></span>
                                <br>
                                <div class="badge badge-secondary">
                                    {{customer.getAttrToLine()}}
                                </div>
                            </div>

                            <transition-group name="fade-block" tag="div" class="col-1">
                                <div :key="'step2'" v-show="isStep(2)" class="">
                                    <span v-show="!isStep(3)">
                                        <h3 v-if="isStep(2)" class="method-delivery">Local da entrega</h3>
                                        <c-delivery-methods @emit-delivery-method="getEmitDeliveryMethod"></c-delivery-methods>
                                    </span>
                                    <div class="auth-in" v-if="isStep(3)">
                                        A entrega será feita em:
                                        <span class="pull-right cursor-pointer" @click.stop.prevent="resetStep(2)"><i class="fad fa-pen"></i></span>
                                        <br>
                                        <span class="badge badge-secondary">
                                            {{modelDeliveryMethod.get('name')}} - {{modelDeliveryMethod.getAttrToLine()}}
                                        </span>    
                                    </div>
                                </div>
                            </transition-group>

                            <transition-group name="fade-block" tag="div" class="col-1">
                                <span :key="'step3'">
                                    <div v-show="isStep(3) && !finale" class="payment-session">
                                        <h3 class="method-delivery">Forma de pagamento</h3>
                                        <c-payment-methods @emit-payment-method="getEmitPaymentMethod"></c-payment-methods>
                                    </div>
                                    <div v-if="finale">
                                        <div class="auth-in">
                                            Forma de pagamento selecionada:
                                            <span class="pull-right cursor-pointer" @click.stop.prevent="finale=false"><i class="fad fa-pen"></i></span>
                                            <br>
                                            <span class="badge badge-secondary">
                                            {{modelPaymentMethod.getAttrToLine()}}
                                            </span>
                                        </div>
                                    </div>                                            
                                </span>             
                            </transition-group>

                        </div>

                        <div class="col-md-4 col-lg-5 order-session">
                            <e-you-order :finale="finale" :change="valChange" :items="getItems" :preloader="preloader" :sub-total="getSubTotal"></e-you-order>
                        </div>

                    </form>
                </div>
                <div v-else class="auth-in">
                    Carrinho vazio!
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .badge{font-size: 1.0em;white-space: unset;text-align: left;padding: 6px;margin-top: 5px;}
    .badge-secondary {background-color: #8f92a3;}
    .badge span{bottom: 0;}
    .loading i{margin-bottom: 10px;}
    h3.personal, h3.method-delivery{margin-bottom: 0.800em !important;}
    a{color:#337ab7;cursor:pointer;}
    span.description{font-style: italic;}    
    .auth-in{background-color: var(--font-color-2);padding: 25px 25px 15px 25px;border-radius: 20px;margin-bottom: 30px;line-height: 15px;}
    .auth-in .btn{background: var(--background-color-cart-default);border-color:white;}

    /* MENU AUTH */
    ul.sub-menu {float: left;position: absolute;top: inherit;z-index: 99999;display: none;left: auto;border-radius: 6px;box-shadow: 0 0 6px 0 rgba(1, 1, 1, 0.3);width: 300px;padding: 10px 0;background-color: #fff;list-style: none;border-top: 5px solid var(--background-color-cart-default);margin: 0;}

    @media (min-width: 320px) {
        .session-left{display: inline;margin-bottom: 10%;}
        .payment-session{padding: 10px;}
        .order-session{padding: 0 10px 0 10px;}
        h3{font-size: 1.518em;}
        .btn-sign-out{margin: 15px -10px 0 0;}
    }
    @media (min-width: 375px) {
        ul.sub-menu{margin-left: 1.5em;}
        .btn-sign-out{margin: -18px -10px 0 0;}
    }
    @media (min-width: 425px) {
        ul.sub-menu{margin-left: 2.5em;}
    }
    @media (min-width: 768px) {
        ul.sub-menu{margin-left: 3.3em;}
        .btn-sign-out{margin: -11px 0;}
    }
    @media (min-width: 1024px) {
        ul.sub-menu{margin-left: 4.4em;}
    }
    /* MENU AUTH */

</style>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';
    import CStepProgress from  '@components/step-progress';
    import CCustomerCreate from  '@feactures/Customer/create';
    import CDeliveryMethods from '@components/delivery-methods';
    import CPaymentMethods from '@components/payment-methods';
    import CMyAccount from '@components/dropdown-myaccount';
    import EYouOrder from './extends/you-order';
    import {storageAuth} from '@class/storage-auth';    

    export default {
        props: {

        },

        components: { CStepProgress, CCustomerCreate, CMyAccount, EYouOrder, CDeliveryMethods, CPaymentMethods },

        data(){
            return {
                customer: null,
                storageAuth: null,
                modelDeliveryMethod: null,
                modelPaymentMethod: null,
                finale: false,
                loading: true,                
                steps: [
                    { label: 'Identificação'     , 'status': false },
                    { label: 'Tipo da Venda'     , 'status': false },
                    { label: 'Forma de Pagamento', 'status': false },
                 ],
            }
        },    

        methods:{
            ...mapActions( 'Order', [ 'setCartItems' ] ),
            logOut(){
                window.eventBus.$emit('emit-log-out');
                this.setStep(3, false);
                this.setStep(2, false);
            },
            openAuth(){
                let element = this.$refs.subMenuAuth;
                if (element.className.indexOf('menu__auth__active') === -1) {
                    element.classList.add("menu__auth__active");
                    element.getElementsByTagName('input')[0].focus();
                } else {
                    element.classList.remove("menu__auth__active");
                }
            },
            resetStep( step ){
                switch( step ){
                    case 1: 
                        this.setStep(2, false);
                    case 2: {
                        this.setStep(3, false);
                        this.finale=false
                        break;
                    }
                }
            },
            setStep( step, status ){
                this.steps[ --step ].status = status;
            },
            isStep( step ){
                return this.steps[ --step ].status;
            },
            getEmitDeliveryMethod(obj){
                // EMITIDO POR resources/js/components/delivery-methods.vue
                this.modelDeliveryMethod = obj;
                this.setStep(3, true);
            },
            getEmitPaymentMethod(obj){
                // EMITIDO POR resources/js/components/payment-methods.vue
                this.modelPaymentMethod = obj;
                this.finale = true;
            },
            getEmitCustomerData(obj){
                //EMITIDO POR resources/js/feactures/Customer/create.vue
                this.customer = obj;
                this.setStep(2, true);
            }
        },

        updated(){

        },

        watch:{
            isAlive( val ){
                if( val === true ){
                    this.storageAuth = new storageAuth();
                    this.$refs.subMenuAuth.classList.remove("menu__auth__active");
                    this.setStep(2, val);
                } else {
                    this.storageAuth = null;
                }
            }
        },

        computed:{
            ...mapState( 'Order'  , [ 'preloader', 'msgsError' ] ),
            ...mapGetters( 'Order', [ 'getTtItems', 'getItems', 'getSubTotal' ] ),
            ...mapGetters( 'Customer', [ 'isAlive' ] ),
            valChange(){
                return this.modelPaymentMethod === null ? 0 : this.modelPaymentMethod.get('change')
            }
        },

        mounted(){
            this.setCartItems().then(()=>{                
                this.setStep(1, true);
                if( this.isAlive === true ){
                    this.storageAuth = new storageAuth();
                }
                this.loading = false;
            });        
        }
    }
</script>
