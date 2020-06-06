require('@/bootstrap');
require('@/util/basesImports');

import CProductSession from '@feactures/Product/session-home';
import store from '@/store';

import { MixAddToCart } from '@/mixins/addToCart';

Vue.mixin(MixAddToCart);

// Instância do Vue JS, e seletor
new Vue({
    el: '#app',
    store,
    components: { CProductSession },
    data:{

    }
});
