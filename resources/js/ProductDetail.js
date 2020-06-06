require('@/bootstrap');
require('@/util/basesImports');

import SocialSharing from 'vue-social-sharing';

import CProductDetail from '@feactures/Product/detail';
import CBreadcrumb from '@components/Breadcrumb';
import store from '@/store';
import { MixAddToCart } from '@/mixins/addToCart';

Vue.use(SocialSharing);

Vue.mixin(MixAddToCart);

// Instância do Vue JS, e seletor
new Vue({
    el: '#app',
    store,
    components: { CProductDetail, CBreadcrumb },
    data:{

    }
});
