
const SET_PRELOADER = ( state, value ) => {
    state.preloader = value;
};

const SET_PRELOADER_AUTH = ( state, value ) => {
    state.preloaderAuth = value;
};

const SET_CUSTOMER_DATA = ( state, value ) => {
    state.customerData = value;
};

export default {
    SET_PRELOADER,
    SET_PRELOADER_AUTH,
    SET_CUSTOMER_DATA,
    SET_ERROR: ( state, msg ) => {
        state.msgError = msg;
    },
};
