const isAlive = ( state ) => {
    return ( Object.keys( state.customerData ).length === 0 ? false : true);
};

export default {
    isAlive,
    customerName: ( state ) => {
        return ( Object.keys( state.customerData ).length === 0 ? null : state.customerData.name );
    }
};
