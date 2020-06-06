<template>
    <div class="center">
        <div>
            <h2>Bem vindo de volta!</h2>
            <form  class="login" onsubmit="return false">
                <p class="before-login-text">Preencha os dados abaixo para criar uma nova senha</p>
                <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                    <label for="login">
                        Seu login
                        <span class="form__error" v-if='!$v.login.required'>Obrigatório</span>
                        <span class="form__error" v-if='!$v.login.email'>Inválido</span>
                    </label>
                    <input type="text" ref="inputLogin" class="woocommerce-Input woocommerce-Input--text input-text" name="login" id="login"
                           @click.enter="submit()" @blur='mix_inputCheckIsValid($v.login, $event)'
                           v-model.trim='$v.login.$model'/>
                </p>
                <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                    <label for="password">Sua nova senha <span class="required">*</span></label>
                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="password"
                           @click.enter="submit()" @blur='mix_inputCheckIsValid($v.password, $event)'
                           v-model.trim='$v.password.$model' name="password" id="password" />
                </p>
                <p class="woocommerce-FormRow woocommerce-FormRow--wide form-row form-row-wide">
                    <label for="password_repeat">Repita a senha <span class="required">*</span></label>
                    <input class="woocommerce-Input woocommerce-Input--text input-text" type="password"
                           @click.enter="submit()" @blur='mix_inputCheckIsValid($v.password_repeat, $event)'
                           v-model.trim='$v.password_repeat.$model' name="password_repeat" id="password_repeat" />
                </p>
                <transition-group name="fade" tag="p" style="margin: 0">
                    <div v-if="msgError" :key="'error-forgot'" class="session-msg session-error"><strong>Ops!</strong> {{msgError}}</div>
                </transition-group>
                <p class="form-row" v-if="!isAlive" >
                    <button ref="login" class="woocommerce-Button button hvr-underline-from-center" name="login" value="Login" @click.stop.prevent="submit()">
                        <i v-if="preloader" class="fad fa-spinner fa-pulse fa-1x preloader-auth"></i> Nova senha
                    </button>
                </p>
                <p v-else class="form-row alert alert-info text-center">
                    Favor modificar sua senha clicando <a href="/customer/account/edit">aqui</a>.
                </p>
            </form>
        </div>
    </div>
</template>

<script>

    import { mapState, mapGetters } from 'vuex';
    import { validationMixin } from 'vuelidate';
    import { validForgotPass, inputCheckIsValid } from "@/mixins/validate";
    import { URL_BASE, SRV_MAIN } from '@/configs/configs';

    export default {
        props:{
            token:{
                type: String,
                required: true
            }
        },

        mixins: [ validationMixin, validForgotPass, inputCheckIsValid ],

        data(){
            return{
                login: null,
                password: null,
                password_repeat: null,
                msgError: null,
                msgSuccess: null
            }
        },

        watch:{
            msgSuccess(val){
                this.$snotify.success( val, 'Parabéns!' );
            }
        },

        methods: {
            async submit() {

                if( !this.preloader ) {
                    this.$v.$touch();
                    if ( this.$v.$invalid ) {
                        this.msgError = 'Campos obrigatorios em branco';
                        return;
                    }

                    if( !this.isAlive ){
                        this.$store.state.preloader = true;
                        this.msgError = null;
                        this.msgSuccess = null;
                        try{
                            const result = (await window.axios.post( URL_BASE + 'put/' + SRV_MAIN + 'customer@forgot-password',
                                { token: this.token, login: this.login, password: this.password, password_repeat: this.password_repeat }
                            ) );
                            if( result.status === 200 ) {
                                this.$store.state.preloader  = false;
                                this.msgSuccess = result.data.messages;
                                this.login = null;
                                this.password = null;
                                this.password_repeat = null;
                            }
                        } catch(error){
                            this.msgError = error.response.data.messages;
                            this.$store.state.preloader = false;
                        }
                    } else {
                        this.msgError = 'Você já esta logado';
                    }

                }
            }
        },

        mounted(){
            this.$refs.inputLogin.focus();
            if( this.isAlive ){
                this.msgError = 'Você já esta logado';
            }
        },

        computed: {
            ...mapState( 'Customer', [ 'preloader' ] ),
            ...mapGetters( 'Customer', [ 'isAlive' ] ),
        }
    }
</script>

<style scoped>
    .center {margin: auto;}
    .session-msg{margin-bottom: 15px;}
    @media (min-width: 320px) {
        .center {width: 95%;}
        h2{font-size: 1.6em;}
        .button{width: 100%;}
    }
    @media (min-width: 375px) {
        .center {width: 90%;}
        h2{font-size: 1.8em;}
    }
    @media (min-width: 425px) {
        .center {width: 85%;}
        h2{font-size: 2.0em;}
    }
    @media (min-width: 768px) {
        .center {width: 50%;}
    }
    @media (min-width: 1024px) {
        .button{width: auto;float: right; }
    }
</style>
