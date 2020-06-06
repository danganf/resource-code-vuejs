require('@/bootstrap');
require('@/util/basesImports');

import CForgotPass from '@feactures/Customer/forgot-password';
import CBreadcrumb from '@components/Breadcrumb';
import store from '@/store';
import { MixAddToCart } from '@/mixins/addToCart';

Vue.mixin(MixAddToCart);

// Instância do Vue JS, e seletor
new Vue({
    el: '#app',
    store,
    components: { CForgotPass, CBreadcrumb },
    data:{

    }
});
