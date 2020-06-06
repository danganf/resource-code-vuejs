
const SET_PRELOADER = ( state, value ) => {
    state.preloader = value;
};

const SET_LIST_HOME = ( state, obj ) => {
    state.list_home = obj;
};

const SET_PRODUCT = ( state, obj ) => {
    state.product = obj;
};

export default {
    SET_LIST_HOME,
    SET_PRODUCT,
    SET_PRELOADER,
    SET_ERROR: ( state, msg ) => {
        state.msgsError = msg;
    },
};
