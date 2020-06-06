<template>
    <div class="session-default center" :class="{ 'no-label' : isEmit }">
        <h2 v-if="!isEmit">Seja um saladero</h2>
        <form  class="login" v-on:submit.stop.prevent="submit()">
            <p v-if="!isEmit" class="before-login-text">Você está prestes a se tornar parte da família.</p>
            <p v-if="!isEmit" class="before-login-text">Preencha os campos abaixo, clique no botão 'registrar' e escolha o saudável.</p>
            <div>
                <div class="form-group format">
                    <label for="name">Seu nome
                        <span class="form__error" v-if='!$v.customer.name.required'>Obrigatório</span>
                    </label><br />
                    <span class="wpcf7-form-control-wrap subject">
                      <input type="text" placeholder="Nome completo" ref="customerName"
                             v-model.trim='$v.customer.name.$model'
                             @keyup.enter="submit()"
                             @blur='mix_inputCheckIsValid($v.customer.name, $event)'
                             name="name" id="name" class="input-text" />
                    </span>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6 format">
                        <label for="email">E-mail <small>(usado como login)</small>
                            <span class="form__error" v-if='!$v.customer.login.required'>Obrigatório</span>
                            <span class="form__error" v-if='!$v.customer.login.email'>Inválido</span>
                        </label><br/>
                        <span class="wpcf7-form-control-wrap first-name">
                            <input type="text" name="email" id="email"
                                   v-model.trim='$v.customer.login.$model'
                                   @blur='mix_inputCheckIsValid($v.customer.login, $event)'
                                   @keyup.enter="submit()"
                                   class="input-text" placeholder="fulano@gmail.com" />
                         </span>
                    </div>
                    <div class="col-sm-6 format">
                        <label for="document">CPF <small>(Para emissão de NF-e)</small>
                            <span class="form__error" v-if=' customer.document && $v.customer.document.$invalid'>Inválido</span>
                        </label><br />
                        <span class="wpcf7-form-control-wrap last-name">
                            <input type="text" name="document" id="document" class="input-text" placeholder="999.999.999-99"
                                   @keyup.enter="submit()"
                                   v-model.trim='customer.document' v-mask="'###.###.###-##'"/>
                         </span>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6 format">
                        <label for="cellphone">Celular <small v-if="!isEmit">(Só os números)</small>
                            <span class="form__error" v-if='!$v.customer.cellphone.required'>Obrigatório</span>
                            <span class="form__error" v-if='customer.cellphone && !$v.customer.cellphone.isCelPhone'>Inválido</span>
                        </label><br/>
                        <span class="wpcf7-form-control-wrap first-name">
                            <input type="text" name="cellphone" id="cellphone" class="input-text" placeholder="(21) 99999-9999"
                                   v-model.trim='$v.customer.cellphone.$model'
                                   v-mask="'(##) #####-####'"
                                   @keyup.enter="submit()"
                                   @blur='mix_inputCheckIsValid($v.customer.cellphone, $event)'/>
                         </span>
                    </div>
                    <div class="col-sm-6 format">
                        <label for="phone">Fixo <small v-if="!isEmit">Somente os números</small>
                            <span class="form__error" v-if='customer.phone && !$v.customer.phone.isCelPhone'>Inválido</span>
                        </label><br />
                        <span class="wpcf7-form-control-wrap last-name">
                            <input type="text" name="phone" id="phone" class="input-text" placeholder="(21) 9999-9999"
                                   @keyup.enter="submit()"
                                   v-model.trim='$v.customer.phone.$model' v-mask="'(##) ####-####'"/>
                         </span>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6 format">
                        <label for="password">Senha <small v-if="!isEmit">Letras + números</small>
                            <span class="form__error" v-if='!$v.customer.password.required'>Obrigatório</span>
                        </label><br/>
                        <span class="wpcf7-form-control-wrap first-name">
                            <input type="password" name="password" id="password" class="input-text"
                                   v-model.trim='$v.customer.password.$model'
                                   @keyup.enter="submit()"
                                   :placeholder="isEmit ? '' : 'Letras + números'"
                                   @blur='mix_inputCheckIsValid($v.customer.password, $event)'/>
                         </span>
                    </div>
                    <div class="col-sm-6 format">
                        <label for="password_repeat">Repita a senha <small v-if="!isEmit">Letras + números</small>
                            <span class="form__error" v-if='!$v.customer.password_repeat.required'>Obrigatório</span>
                            <span class="form__error" v-if='customer.password_repeat && !$v.customer.password_repeat.sameAsPassword'>Senhas diferentes</span>
                        </label><br />
                        <span class="wpcf7-form-control-wrap last-name">
                            <input type="password" name="password_repeat" id="password_repeat" class="input-text"
                                   v-model.trim='$v.customer.password_repeat.$model'
                                   @keyup.enter="submit()"
                                   :placeholder="isEmit ? '' : 'Letras + números'"
                                   @blur='mix_inputCheckIsValid($v.customer.password_repeat, $event)'/>
                         </span>
                    </div>
                </div>
                <div class="form-group row clearfix">
                    <div class="col-sm-8 format">
                        <transition name="fade">
                            <div v-if="msgError" class="session-msg session-error"><strong>Ops!</strong> {{msgError}}</div>
                        </transition>
                    </div>
                    <div class="col-sm-4 format">
                        <button v-if="!isEmit" class="button hvr-underline-from-center" :disabled="disabled">
                            <i v-if="preloader" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i>
                            Registrar    
                        </button>
                        <button v-else class="button next hvr-underline-from-center" style="padding: 0.8999em 1.6em;">
                            Prosseguir
                            <i class="fad fa-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>


<script>

    import { mapActions } from 'vuex';
    import { validationMixin } from 'vuelidate';
    import { inputCheckIsValid } from "@/mixins/validate";
    import { mixMsgAwait, MixMsgNotify } from "@/mixins/helpers";
    import { mask } from 'vue-the-mask';
    import { URL_BASE, SRV_MAIN  } from '@/configs/configs';

    import {CustomerModel} from './models/customer';

    export default {

        props:{
            isEmit: {
                type: Boolean,
                default: false,
                //validator: t => ['create', 'checkout'].includes(t)
            }
        },

        directives: {mask},

        mixins: [
            validationMixin,
            CustomerModel.validate(),
            inputCheckIsValid,
            mixMsgAwait,
            MixMsgNotify
        ],

        data(){
            return {
                customer: new CustomerModel,
                preloader: false,
                msgError: null,
                disabled: true,
            }
        },

        computed:{

        },

        methods:{
            ...mapActions( 'Customer', [ 'authCustomer' ] ),
            async submit(){
                if( !this.preloader ) {
                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        this.mix_setMsgAwait( 'Verifique os campos obrigatórios' );
                        return;
                    }

                    this.preloader  = true;
                    this.msgError   = null;
                    try{

                            if( this.isEmit ) {
                                // LISTENER resources/js/feactures/Order/checkout.vue
                                this.$emit('emit-customer-data', this.customer);  
                                this.preloader = false;                          
                            } else {
                                const result = (await window.axios.post( URL_BASE + 'post/' + SRV_MAIN + 'customer', this.customer.toObjData() ) );
                                if( result.status === 200 ) {
                                    this.authCustomer( { login: this.customer.login, password:  this.customer.password } );
                                    window.eventBus.$emit('emit-auth-pulse');
                                    this.mix_msgNotify( result.data.messages );
                                    this.preloader = false;
                                    this.customer.resetAttr();
                                }
                            }                                    

                    } catch(error){
                        this.preloader = false;
                        this.msgError  = error.response.data.messages;
                    }
                }
            }
        },

        updated() {
            this.$v.$touch();
            this.disabled = this.$v.$invalid;
        },

        mounted() {
          this.$refs.customerName.focus();
          /*this.customer.setdata({
                name: "Daniel Azevedo Guimarães",
                login: "daniel.guimaraes@intercase.com.br",
                cellphone: "21981692318",
                phone: "2124098764",
                password: "qawsedrf",
                password_repeat: "qawsedrf",
            });*/

        }
    }
</script>

<style scoped>
    .center {margin: auto;}
    .center.no-label{width:100%;padding-top: 0;}
    .format{margin: 20px 0 0 0;}
    .format > div{padding-left: 0;}
    .form-group{margin-bottom:0;}
    input{width: 100%;}
    button i.fa-spinner{position: absolute;top: 20px;}
    @media (min-width: 320px) {
        .center {width: 95%;}
        h2{font-size: 1.5em;}
        .button{width: 100%;}
        button i.fa-spinner{left: 28%;}
        form label{width: 96%;}
        .form__error{color:red;}
        .before-login-text{margin: 10px 0;}
        .session-msg{margin-top: 4px;}
    }
    @media (min-width: 375px) {
        .center {width: 90%;}
        h2{font-size: 1.6em;}
        button i.fa-spinner{left: 30%;}
    }
    @media (min-width: 425px) {
        h2{font-size: 2.0em;}
        button i.fa-spinner{left: 32%;}
    }
    @media (min-width: 768px) {
        .before-login-text{margin: 0;}
        .center {width: 100%;padding-top: 2%;}
        .button{width: auto;float: right; }
        form label{width: 98%;}
        .form__error{float: right;font-size: 0.70em;}
        button i.fa-spinner{left: 23%;}
    }
    @media (min-width: 1024px) {
        .center {width: 80%;}
    }



</style>
