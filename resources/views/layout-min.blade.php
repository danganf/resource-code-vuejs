<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" itemscope="itemscope" itemtype="http://schema.org/WebPage">
    @include('includes.header')
    <style>
        .header-v3 .primary-navigation > .menu > li + li::before{background-color: var(--font-color-2);}
        @media (min-width: 320px) {
            .layout-min div.col-full{height: 40px;}
            .layout-min .pizzaro-breadcrumb{margin-bottom: 2em;}
            .layout-min .woocommerce-breadcrumb{margin-top: 12% !important;padding-bottom: 1em;}
            .site {overflow-x: initial !important; }
        }
        @media (min-width: 375px) {
            .layout-min .woocommerce-breadcrumb{margin-top: 11% !important;}
        }
        @media (min-width: 425px) {
            .layout-min .woocommerce-breadcrumb{margin-top: 10% !important;}
        }
        @media (min-width: 768px) {
            .layout-min div.col-full{height: 75px;}
            .site-header {padding: 5px 0 5px 0;}
            .layout-min .woocommerce-breadcrumb{margin-top: 5% !important;}
        }
        @media (min-width: 1024px) {
            .layout-min .woocommerce-breadcrumb{margin-top: 4% !important;}
        }
        @media (min-width: 1440px) {
            .layout-min .woocommerce-breadcrumb{margin-top: 3% !important;}
        }
    </style>
    <body class="{!! $classBody !!}">

        <div id="app" class="hfeed site">
            <header id="masthead" class="site-header layout-min header-v3 "  style="background-image: none; ">
                <div class="col-full">
                    <c-header place="checkout"></c-header>
                </div>
            </header>
            <div id="content" class="layout-min site-content" tabindex="-1">
                <div class="col-full">
                    @yield('content')
                </div>
            </div>
        </div>

        @include('includes.dependency-js')
        <script type="text/javascript" src="{{asset('js/jquery.min.js')}}"></script>
        <script type="text/javascript" src="{{asset('js/scripts.js')}}"></script>

    </body>
</html>
