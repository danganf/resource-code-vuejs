
import { URL_BASE, SRV_MAIN } from '@/configs/configs';

/*const setList = async ( { commit }, obj ) => {
    commit('SET_PRELOADER', true );
    const result = ( await window.axios.get('/api/get/site/category') );
    if( result.status === 200 ) {
        commit('SET_LIST', result.data );
        commit('SET_PRELOADER', false );
    }
};*/

const setList = ( { commit }, obj ) => {
    commit('SET_PRELOADER', true );
    window.axios.get( URL_BASE + 'get/' + SRV_MAIN + 'category')
        .then(( result ) => {
            commit('SET_LIST', result.data );
            commit('SET_PRELOADER', false );
            commit('SET_ERROR', null );
        }).catch(error => {
            commit('SET_ERROR', error.response.data.messages );
            commit('SET_PRELOADER', false );
        });
};

export default {
    setList
};
