require('@/bootstrap');
require('@/util/basesImports');

import CCustomerCreate from '@feactures/Customer/create';
import store from '@/store';
import { MixAddToCart } from '@/mixins/addToCart';

Vue.mixin(MixAddToCart);

// Instância do Vue JS, e seletor
new Vue({
    el: '#app',
    store,
    components: { CCustomerCreate },
    data:{

    }
});
