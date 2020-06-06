export const MixArray =  {
    methods: {
        mixarr_findIdxByKey( array, key, search ){
            return array.findIndex( ( value ) => {
                return value[key] === search;
            });
        }
    }
};
