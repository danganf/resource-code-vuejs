<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" itemscope="itemscope" itemtype="http://schema.org/WebPage">
    @include('includes.header')
    <body class="{!! $classBody !!}">
        <div id="app" class="hfeed site">

            <header id="masthead" class="site-header header-v1"  style="background-image: none; ">
                <div class="col-full">
                    <c-header></c-header>
                    <div class="pizzaro-secondary-navigation">
                        <nav class="secondary-navigation" aria-label="Secondary Navigation">
                            <c-menu load-carousel="true"></c-menu>
                        </nav>
                    </div>
                </div>
            </header>
            <div id="content" class="site-content" tabindex="-1">
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
