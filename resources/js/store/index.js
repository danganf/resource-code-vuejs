import Vue from 'vue'
import Vuex from 'vuex'

import Category from '@feactures/Category/store';
import Product from '@feactures/Product/store';
import Order from '@feactures/Order/store';
import Customer from '@feactures/Customer/store';

Vue.use(Vuex);

const modules = { Category, Product, Order, Customer };

export default new Vuex.Store({ modules } )
