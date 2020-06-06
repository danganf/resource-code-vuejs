require('@/bootstrap');
require('@/util/basesImports');

import store from '@/store';
import CCheckout from '@/feactures/Order/checkout';
import CBreadcrumb from '@components/Breadcrumb';

// Instância do Vue JS, e seletor
new Vue({
    el: '#app',
    store,
    components: { CCheckout, CBreadcrumb },
    data:{

    },
    mounted(){

    }
});
