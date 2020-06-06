const getTtItems = ( state ) => {
    return typeof state.cartItems.items === 'undefined' ? 0 : state.cartItems.items.reduce(function(a, b) {
        return a + parseInt( b.qty );
    }, 0);
};

const getItems = ( state ) => {
    return typeof state.cartItems.items === 'undefined' ? [] : state.cartItems.items;
};

const getSubTotal = ( state ) => {
    return parseFloat( typeof state.cartItems.sub_total === 'undefined' ? 0 : state.cartItems.sub_total );
};

export default {
    getItems,
    getSubTotal,
    getTtItems
};
