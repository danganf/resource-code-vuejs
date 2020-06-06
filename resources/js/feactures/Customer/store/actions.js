
import { storageQuote } from '@class/storage-quote';
import { storageAuth } from '@class/storage-auth';

let storageAuthInstance  = new storageAuth();
let storageQuoteInstance = new storageQuote();

const authCustomer = ( { commit }, dataSend ) => {
    if( !storageAuthInstance.isAlive() ){
        commit('SET_PRELOADER_AUTH', true );

        window.axios.defaults.headers.common[ process.env.MIX_HEADER_CUSTOMER_AUTH_LOGIN ] = dataSend.login;
        window.axios.defaults.headers.common[ process.env.MIX_HEADER_CUSTOMER_AUTH_PASS ]  = dataSend.password;

        window.axios.get( process.env.MIX_URL_API_CUSTOMER_AUTH )
            .then(( result ) => {
                storageAuthInstance.setAuth( result.data );
                storageQuoteInstance.setCustomerId( result.data.uid );
                commit('SET_CUSTOMER_DATA', result.data );
                commit('SET_PRELOADER_AUTH', false );
                commit('SET_ERROR', null );
            }).catch(error => {
            commit('SET_ERROR', error.response.data.messages );
            commit('SET_PRELOADER_AUTH', false );
        });
    }
};

const verifyIsAlive = ( { commit } ) => {
    if( storageAuthInstance.isAlive() ){
        window.axios.defaults.headers.common[ storageAuthInstance.get('header') ] = storageAuthInstance.get('token');
        window.axios.get( process.env.MIX_URL_API_CUSTOMER_IS_ALIVE )
            .then(( result ) => {
                commit('SET_CUSTOMER_DATA', result.data);
            }).catch(error => {
                storageAuthInstance.remove();
                storageQuoteInstance.setCustomerId(null);
            });
    }
};

const logoff = ( { commit } ) => {
    if( storageAuthInstance.isAlive() ){
        window.axios.get( process.env.MIX_URL_API_CUSTOMER_LOGOFF )
            .then(( result ) => {
                commit('SET_CUSTOMER_DATA', []);
                storageAuthInstance.remove();
                storageQuoteInstance.setCustomerId(null);
            }).catch(error => {

        });
    }
};

export default {
    authCustomer,
    verifyIsAlive,
    logoff
};
