<template>
    <div>
        <a class="skip-link screen-reader-text" href="#site-navigation">Skip to navigation</a>
        <a class="skip-link screen-reader-text" href="#content">Skip to content</a>
        <div class="header-wrap">
            <div class="site-branding">
                <a href="/" class="custom-logo-link" rel="home">
                    <img src="/img/logo-white-2.png" alt="">
                </a>
            </div>
            <nav id="site-navigation" class="main-navigation"  aria-label="Primary Navigation">
                <button class="menu-toggle" aria-controls="site-navigation" aria-expanded="false">
                    <span class="menu-icon"><i class="po po-menu-icon"></i></span>
                    <span class="screen-reader-text">Menu</span>
                </button>
                <div class="primary-navigation">
                    <ul v-if="place === 'main'" id="menu-main-menu" class="menu nav-menu" aria-expanded="false">
                        <li class="no-mobile menu-item"><a href="#">Pedido online</a></li>
                        <li class="menu-item"><a href="#">Onde entregamos <i class="fa fa-map-marker"></i></a></li>
                        <li class="menu-item has-children">
                            <a v-if="!customerName" href="#">Minha conta <i class="fa fa-user"></i></a>
                            <a v-else href="#">
                                <span :class="{ pulse3s: pulse }">Olá, {{customerName}}</span>
                                <i class="fas fa-chevron-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li class="menu-item">
                                    <c-my-account @emit-customer-is-alive="isAlive" :key="'account-desktop'" :isDesktop="true"></c-my-account>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul v-else-if="place === 'checkout'" id="menu-home-3-and-4-main-menu" class="menu nav-menu" aria-expanded="false">
                        <li class="yamm-fw menu-item"><a href="/">Inicio</a></li>
                        <li class="menu-item"><a href="#">Suporte</a></li>
                        <li class="menu-item">
                            <a href="#">
                                <div class="header-phone-numbers">
                                    <span class="intro-text">Nosso Telefone</span>
                                    <span class="phone-number">54 548 779 654</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="handheld-navigation">
                    <span class="phm-close"></span>
                    <ul class="menu" v-if="place === 'main'">
                        <li class="menu-item "><a href="#"><i class="fad fa-shopping-cart"></i> Pedido online</a></li>
                        <li class="menu-item "><a href="#"><i class="fa fa-map-marker"></i> Onde estamos</a></li>
                        <li class="menu-item "><a href="#"><i class="fa fa-map-marker"></i> Fale conosco</a></li>
                        <li class="menu-item" v-if="!this.auth">
                            <a id="menuMyAccount"><i class="fa fa-user"></i> Minha conta</a>
                            <ul class="sub-menu" id="subMenuAuth">
                                <li class="menu-item">
                                    <c-my-account :key="'account-mobile'" :isDesktop="false"></c-my-account>
                                </li>
                            </ul>
                        </li>
                        <li class="menu-item" v-else>
                            <a>
                                Olá, <strong>{{customerName}}</strong>
                                <span class="pull-right" @click="logOut()"><i class="fad fa-sign-out"></i>Sair</span>
                            </a>
                        </li>
                    </ul>
                    <ul v-else-if="place === 'checkout'" class="menu">
                        <li class="menu-item "><a href="#"><i class="fas fa-home"></i> Inicio</a></li>
                        <li class="menu-item "><a href="#"><i class="fas fa-user-headset"></i> Suporte</a></li>
                        <li class="menu-item ">
                            <div class="header-phone-numbers">
                                <span class="intro-text">Nosso Telefone</span>
                                <span class="phone-number">54 548 779 654</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- #site-navigation -->
            <c-top-cart v-if="place === 'main'"></c-top-cart>
        </div>
    </div>
</template>

<script>
    import CTopCart from '@components/cart';
    import CMyAccount from '@components/dropdown-myaccount';

    export default{
        props:{
            place:{
                type: String,
                default: 'main'
            }
        },

        components:{ CTopCart, CMyAccount },

        data(){
            return{
                customerName: null,
                pulse: false,
                auth: false,
            }
        },

        methods: {
            isAlive( name ){
                this.customerName = name;
                this.auth         = name ? true : false;
            },
            logOut(){
                window.eventBus.$emit('emit-log-out');
            }
        },

        created(){

            //EMITIDO POR resources/js/feactures/Customer/create.vue
            window.eventBus.$on( 'emit-auth-pulse', () => {
                this.pulse = true;
            } );
        },

        mounted(){
            if( !this.auth ) {
                if( document.getElementById("menuMyAccount") ) {
                    document.getElementById("menuMyAccount").addEventListener("click", function () {
                        let element = document.getElementById("subMenuAuth");
                        if (element.className.indexOf('menu__auth__active') === -1) {
                            element.classList.add("menu__auth__active");
                            element.getElementsByTagName('input')[0].focus();
                        } else {
                            element.classList.remove("menu__auth__active");
                        }
                    }, false);
                }
            }
        }

    }
</script>

<style scoped>

    .handheld-navigation .phm-close{
        text-align: right;
        width: 100%;
        font-size: 1.8em;
        height: 50px;
    }
    .handheld-navigation .phm-close:before{padding-top: 0.357em !important;}
    .handheld-navigation{background-color: #f07142;}
    .handheld-navigation .sub-menu{
        display: none;
        animation: shake 0.2s;animation-iteration-count: 3;
    }
    .handheld-navigation ul.menu li.menu-item{
        /*transform: rotateY(80deg);
        transform-origin: right center;
        transition: transform 0.5s;*/
        transform: rotateY(80deg);
        transform-origin: left center;
        transition: transform 1s;
        padding: 0 0 0 35%;
        text-transform: uppercase;
    }
    nav.toggled .handheld-navigation ul.menu li.menu-item{
        /*transform: rotateY(0deg);
        transition-delay: 50ms;*/
        transform: rotateY(0deg);
        padding: 0;
        -webkit-transition-delay: 50ms;-o-transition-delay: 50ms;transition-delay: 50ms;
    }
    .sub-menu{border-top: 5px solid var(--background-color-cart-default);}
    .sub-menu li{width: inherit;}

    .handheld-navigation .phm-close {
        background-color: #8AA654;
    }

    @media (min-width: 320px) {
        .sub-menu {position: absolute;left: auto;right: 0;width: 290px;}
        .layout-min div.site-branding{margin-top: -27px;}
        .layout-min button.menu-toggle{right: 0;}
        .layout-min .header-phone-numbers {text-align: left;padding: 0.2em 0 1.387em 1.357em;display: inline-block;}
    }
    @media (min-width: 768px) {
        .layout-min .header-phone-numbers{display: grid;padding: 0;}
        .layout-min div.col-full{height: 75px;}
        .site-header {padding: 5px 0 5px 0;}
        .layout-min .primary-navigation ul.menu > li > a {padding: 1.0em 0 1.618em 0.5em;}
        .layout-min div.site-branding{margin-top: 0;}
        .layout-min .site-branding {width: 100% !important; }
    }
    @media (min-width: 1440px) {
        .layout-min .primary-navigation{top: 4%;}
    }
</style>
