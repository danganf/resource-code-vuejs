const mix = require('laravel-mix');

mix.js('resources/js/Home.js'                         , 'public/js');
mix.js('resources/js/ProductDetail.js'                , 'public/js');
mix.js('resources/js/CustomerAccountResetPass.js'     , 'public/js/');
mix.js('resources/js/CustomerAccountCreate.js'        , 'public/js/');
mix.js('resources/js/feactures/Order/apps/Checkout.js', 'public/js/Checkout.js');
/*mix.js('resources/js/CustomerAccountResetPass.js', 'public/js/customer/account-reset-pass/').extract(['vue']);*/

mix.sass('resources/sass/app.scss', 'public/css').version();

mix.styles( 'resources/css/colors/saladero.css', 'public/css/colors/saladero.css');
mix.styles( 'resources/css/font-main.css', 'public/css/font-main.css');
mix.styles( 'resources/css/style-main.css', 'public/css/style-main.css');
mix.styles( 'resources/css/main.css', 'public/css/main.css');
mix.styles( 'resources/css/hover-min.css', 'public/css/hover-min.css');

mix.minify('public/css/colors/saladero.css').version();
mix.minify('public/css/font-main.css').version();
mix.minify('public/css/style-main.css').version();
mix.minify('public/css/main.css').version();
//mix.minify('public/js/Home.js').version();
//mix.minify('public/js/ProductDetail.js').version();
//mix.minify('public/js/CustomerAccountResetPass.js').version();
