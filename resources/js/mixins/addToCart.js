export const MixAddToCart =  {
    data(){
        return {
            mix_clickButton: false
        }
    },
    methods: {
        addToCart( prodID, qty, price, event ){

            if( typeof event !== 'undefined' ){

                if( this.mix_clickButton === false ){
                    let tmpTxt = event.target.innerHTML;
                    this.mix_clickButton = true;
                    event.target.innerHTML='<i class="fa fa-spinner fa-pulse"></i>';
                    window.eventBus.$emit('emitFastAddToCart', prodID, qty, parseFloat(price) );
                    event.target.innerHTML=tmpTxt;
                    this.mix_clickButton = false;
                }
            }

        }
    }
};
