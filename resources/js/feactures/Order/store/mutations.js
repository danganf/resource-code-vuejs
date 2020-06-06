
const SET_PRELOADER = ( state, value ) => {
    state.preloader = value;
};

const SET_CART_ITEMS = ( state, obj ) => {
    state.cartItems = obj;
};

export default {
    SET_CART_ITEMS,
    SET_PRELOADER,
    SET_ERROR: ( state, msg ) => {
        state.msgsError = msg;
    },
};
