<template>
    <div class="content-account" onSubmit="return false">
        <span v-show="!forgot">
            <form :name="isDesktop ? 'form-desktop' : 'form-mobile'">
                <span v-show="!isAlive">
                    <div class="is-desktop header" style="display: block">
                        <strong class="access">ACESSAR</strong>
                        <a class="new" @click="actionForgot()">Esqueci a senha</a>
                    </div>
                    <p class="form-row form-first form-row-wide">
                        <label class="is-desktop">E-mail</label>
                        <span class="form__error" v-if='!$v.login.required'>Obrigatório</span>
                        <span class="form__error" v-if='!$v.login.email'>Inválido</span>
                        <input type="text" class="input-text" placeholder="E-mail"
                               @keyup.enter="submitAuth()"
                               @blur='mix_inputCheckIsValid($v.login, $event)'
                               v-model.trim='$v.login.$model' name="login-auth" value="" />
                    </p>
                    <p class="form-row form-row-wide">
                        <label class="is-desktop">Senha</label>
                        <span class="form__error" v-if='!$v.password.required'>Obrigatório</span>
                        <input type="password" class="input-text" placeholder="Senha"
                               @keyup.enter="submitAuth()"
                               @blur='mix_inputCheckIsValid($v.password, $event)'
                               v-model.trim='$v.password.$model' name="pass" value="" />
                    </p>
                    <transition-group name="fade" tag="p" style="margin: 0">
                        <div v-if="msgError" :key="'error-login'" class="session-msg session-error"><strong>Ops!</strong> {{msgError}}</div>
                        <div v-if="error" :key="'error-invalid'" class="session-msg session-error"><strong>Ops!</strong> {{error}}</div>
                    </transition-group>
                    <p class="form-row form-row-wide" style="margin-bottom: 0;text-align: center">
                        <button class="btn btn-block login button hvr-underline-from-center" @click.prevent.stop="submitAuth()" name="login" value="Login">
                            <i v-if="preloaderAuth" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i>
                            <i v-else class="fad fa-sign-in"></i>
                            Acessar
                        </button>
                        <a v-if="place !== 'checkout'" :href="this.routeCostumerCreate" class="lost-password">Crie uma conta</a>
                        <span v-if="place !== 'checkout'" class="is-mobile">
                            | <a @click="actionForgot()" class="lost-password">Esqueci a senha</a>
                        </span>
                    </p>
                </span>
                <transition-group name="fade-block" tag="div">
                    <span v-show="isAlive" class="my-account" :key="'inAlive'">
                        <div class="header" style="display: block">
                            <span v-if="!isDesktop">Olá, <strong>{{customerName}}</strong></span>
                            <span v-else>Menu</span>
                            <a class="new" @click="logoff();password = null;">Sair</a>
                        </div>
                    </span>
                </transition-group>
            </form>
        </span>

        <transition-group name="fade-block" tag="div">
            <div v-if="forgot" :key="'forgot'">
                <form name="form-forgot">
                    <div class="header forgot">
                        <strong @click="actionForgot()">ESQUECEU A SENHA?</strong>
                        <a class="back" @click="actionForgot()"><i class="fad fa-chevron-double-left"></i> Voltar</a>
                    </div>
                    <p class="form-row form-first form-row-wide forgot warning-text" style="text-align: center">
                        Você receberá um link para criar uma nova senha por e-mail.
                    </p>
                    <p class="form-row form-first form-row-wide">
                        <label class="is-desktop" for="forgotemail">
                            Digite seu E-mail
                            <span class="form__error" v-if='!$v.login.required'>Obrigatório</span>
                            <span class="form__error" v-if='!$v.login.email'>Inválido</span>
                        </label>
                        <input type="text" class="input-text" v-model.trim='$v.login.$model'
                               @keyup.enter="sendEmail()"
                               @blur='mix_inputCheckIsValid($v.login, $event)'
                               placeholder="E-mail" name="forgotemail" id="forgotemail" value="" />
                    </p>
                    <transition-group name="fade" tag="p" style="margin: 0">
                        <div v-if="error" :key="'error-forgot'" class="session-msg session-error"><strong>Ops!</strong> {{error}}</div>
                        <div v-if="msgSuccess" :key="'success-forgot'" class="session-msg session-info"><strong>Feito!</strong> {{msgSuccess}}</div>
                    </transition-group>
                    <p class="form-row form-row-wide" style="margin-bottom: 0;text-align: center">
                        <button class="btn btn-block button login send hvr-underline-from-center"
                                @click.stop.prevent="sendEmail()"
                                name="btn-forgot-sen" value="Login">
                            <i v-if="preloader" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i>
                            <i class="fad fa-share"></i>
                            <span v-if="!isResend">Enviar</span>
                            <span v-else>Reenviar</span>
                        </button>
                    </p>
                </form>
            </div>
        </transition-group>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';
    import { validationMixin } from 'vuelidate';
    import { validAuth, inputCheckIsValid } from "@/mixins/validate";
    import { URL_BASE, SRV_MAIN } from '@/configs/configs';
    import { mixMsgAwait } from '@/mixins/helpers';

    export default{
        props:{
            isDesktop: {
                type: Boolean,
                default: false,
                required: false,
            },
            place:{
                type: String,
                default: 'main'
            }
        },

        mixins: [ validationMixin, validAuth, inputCheckIsValid, mixMsgAwait ],

        data(){
            return{
                routeCostumerCreate: process.env.MIX_ROUTE_CUSTOMER_CREATE,
                forgot: false,
                login: null,
                password: null,
                error: null,
                msgSuccess: null,
                preloader: false,
                isResend: false,
            }
        },

        updated(){

        },

        methods:{
            ...mapActions( 'Customer', [ 'authCustomer', 'verifyIsAlive', 'logoff' ] ),
            actionForgot(){
                this.password = null;
                this.forgot   = !this.forgot;
            },
            submitAuth(){

                if( !this.preloaderAuth ) {
                    this.$v.$touch();
                    if ( this.$v.$invalid ) {
                        this.mix_setMsgAwait( 'Preencha antes os dados acesso. ', 3000, 'error');
                        return;
                    }
                    this.authCustomer( { login: this.login, password: this.password } );
                }
            },
            async sendEmail(){
                if( !this.preloader ) {
                    this.$v.login.$touch();
                    if ( this.$v.login.$invalid ) {
                        this.mix_setMsgAwait( 'Preencha antes o e-mail.', 3000, 'error');
                        return;
                    }

                    const urlResend = !this.isResend ? '' : '@resend';
                    this.preloader  = true;
                    try {
                        const result = await window.axios.post(
                                            URL_BASE + 'post/' + SRV_MAIN + 'customer@forgot-password' + urlResend,
                                            {login: this.login} );
                        if( result.status === 200 ) {
                            this.preloader  = false;
                            this.isResend   = true;
                            this.error      = null;
                            this.login      = null;
                            this.msgSuccess = result.data.messages;
                        }
                    } catch(error){
                        this.error      = error.response.data.messages;
                        this.msgSuccess = null;
                        this.preloader  = false;
                    }
                }
            }
        },

        watch:{
            isAlive(newVal){
                if( this.isDesktop ) {
                    this.$emit('emit-customer-is-alive', this.customerName);
                    if( !newVal){
                        this.login    = null;
                        this.password = null;
                    }
                }
            }
        },

        mounted(){
            if( this.isDesktop ) {
                this.verifyIsAlive();
            }

            this.login =  'daniel@intercase.com.br';
            this.password = 'bella123';
        },

        computed: {
            ...mapState( 'Customer', [ 'preloaderAuth', 'msgError', 'customerData' ] ),
            ...mapGetters( 'Customer', [ 'isAlive', 'customerName' ] ),
        },

        created(){

            /*  EMITIDO POR
                resources/js/feactures/Customer/create.vue
                resources/js/feactures/Order/checkout.vue
             */
            window.eventBus.$on( 'emit-log-out', () => {this.logoff()} );
        }

    }
</script>

<style scoped>
    div.header{border-bottom:1px solid var(--font-color-6);padding-bottom: 8px;margin-bottom: 15px;}
    button.login{background: var(--background-color-default);width: inherit;text-transform: uppercase;}
    a.new, .forgot a{float: right;padding: 0 !important;width: auto !important;font-size: 1em !important;font-weight: 600 !important;}
    a.new{color: var(--color-default) !important;}
    a.new:hover, a.lost-password:hover, a.back:hover{background: none !important;text-decoration: underline;}
    .content-account {padding: 16px 25px 1px 25px;}

    .handheld-navigation ul li a i {margin-right: 3px !important;}

    @media (min-width: 320px) {
        .is-desktop{display: none;}
        .is-mobile{display: inline;}
        .form-first{margin-top: 10px;}
        .input-text{border-radius: 10px;padding: 0.473em 0.5em;}
        a.lost-password{width: auto !important;padding: 12px 0 12px 0 !important;}
        button.login{font-size: 0.9em;margin-top: 0;}
        form[name="form-mobile"] .forgot{color:var(--font-color-6) !important;}
        p.warning-text{font-size: 0.9em;}
        button.send{margin-bottom: 15px;}
        a.back{color: var(--color-default) !important;}
        form[name="form-mobile"] strong.access{color:var(--font-color-6);}
        .preloader-auth{margin-right: 3px;}
        .my-account{
            color:var(--font-color-6) !important;
        }
    }
    @media (min-width: 768px) {
        .is-desktop{display: inline;}
        .is-mobile{display: none;}
        .input-text{border-radius: 50px;padding: 0.473em 1.2em;}
        button.login{font-size: 1.1em;margin-top: 10px;}
        .forgot{color:var(--font-color-7) !important;}
        a.lost-password{width: inherit !important;text-align: center;padding: 13px 0 0 0 !important}
        p.warning-text{font-size: 1em;}
        button.send{margin-bottom: 0;}
        strong.access{color:var(--font-color-7);}
        .my-account{
            color:var(--font-color-7) !important;
        }
    }
</style>
