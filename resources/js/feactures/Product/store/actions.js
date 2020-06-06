
import { URL_BASE, SRV_MAIN } from '../../../configs/configs';

const setListHome = async ( { commit }, obj ) => {
    commit('SET_PRELOADER', true );
    const result = ( await window.axios.get( URL_BASE + 'get/' + SRV_MAIN + 'product/featured') );
    if( result.status === 200 ) {
        commit('SET_LIST_HOME', result.data );
        commit('SET_PRELOADER', false );
    }
};

const setProduct = ( { commit }, sku ) => {
    commit('SET_PRELOADER', true );
    if ( typeof sku !== 'undefined' ){
        window.axios.get( URL_BASE + 'get/' + SRV_MAIN + 'product/'+sku)
            .then(( result ) => {
                commit('SET_PRODUCT', result.data );
                commit('SET_PRELOADER', false );
                commit('SET_ERROR', null );
            }).catch(error => {
            commit('SET_ERROR', error.response.data.messages );
            commit('SET_PRELOADER', false );
        });

        /*const result = ( await axios.get('/api/get/product/'+sku) );
        if( result.status === 200 ) {
            commit('SET_PRODUCT', result.data );
            commit('SET_PRELOADER', false );
            commit('SET_ERROR', null );
        } else {
            commit('SET_ERROR', error.response.data.messages );
            commit('SET_PRELOADER', false );
        }*/

    } else {
        commit('SET_ERROR', 'Infelizmente ocorreu algo inesperado' );
        commit('SET_PRELOADER', false );
    }
};

export default {
    setListHome,
    setProduct
};
