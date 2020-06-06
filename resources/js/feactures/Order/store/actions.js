
import { URL_BASE, SRV_QUOTE } from '@/configs/configs';
import { storageQuote } from '@class/storage-quote';

let storageInstace = new storageQuote();

const updateCartQtyItem = async  ( { commit, state }, sendData ) => {
    const itemsOld = state.cartItems;

    commit('SET_PRELOADER', true );
    commit('SET_CART_ITEMS', [] );

    let quoteId  = storageInstace.get('quote_id');
    const result = ( await window.axios.post( URL_BASE + 'put/' + SRV_QUOTE + 'quote/' + quoteId + '@item', sendData ) );
    if( result.status === 200 ) {
        commit('SET_ERROR', null );
        commit('SET_CART_ITEMS', result.data );
        commit('SET_PRELOADER', false );
    } else {
        commit('SET_CART_ITEMS', itemsOld );
        commit('SET_ERROR', error.response.data.messages );
        commit('SET_PRELOADER', false );
    }

};

const updateCartItems = ( { commit, state }, sendData ) => {
    const itemsOld = state.cartItems;

    commit('SET_PRELOADER', true );
    commit('SET_CART_ITEMS', [] );

    let quoteId = storageInstace.get('quote_id');
    window.axios.post( URL_BASE + 'post/' + SRV_QUOTE + 'quote/' + quoteId, sendData  )
        .then(( result ) => {
            commit('SET_CART_ITEMS', result.data );
            commit('SET_PRELOADER', false );
            commit('SET_ERROR', null );
            storageInstace.setId( result.data.id );

        }).catch(error => {
        storageInstace.remove();
        commit('SET_CART_ITEMS', itemsOld );
        commit('SET_ERROR', error.response.data.messages );
        commit('SET_PRELOADER', false );
    });
};

const setCartItems = async ( { commit }, obj ) => {

    let quoteId = storageInstace.get('quote_id');

    if( quoteId ) {
        commit('SET_PRELOADER', true );
        try {
            const result = await window.axios.get(URL_BASE + 'get/' + SRV_QUOTE + 'quote/' + quoteId);
            commit('SET_CART_ITEMS', result.data );
            commit('SET_PRELOADER', false );
            commit('SET_ERROR', null );
        } catch (e) {
            storageInstace.remove();
            commit('SET_ERROR', error.response.data.messages );
            commit('SET_PRELOADER', false );
        }
    }
};

export default {
    setCartItems,
    updateCartItems,
    updateCartQtyItem
};
