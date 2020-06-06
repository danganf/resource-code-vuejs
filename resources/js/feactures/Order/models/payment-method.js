
import { modelContract } from "@/util/modelContract";
import { formatMoney } from '@/util/helpers';

const attrs = {
    slug: null,
    name: null,
    change: 0,
};

export class paymentMethodModel extends modelContract{

    constructor(data) {
        super( attrs, data);
        this.set('change', 0);
    }

    resetAttr( vaDefault ){
        super.resetAttr(vaDefault);
        this.set('change', 0);
    }

    getAttrToLine(){
        let text = '';

        try{
            text = this.get('name') + ' - ';
            if( this.get('slug') === 'money' ){                
                if( this.get('change') > 0 ){
                    text += 'Troco para ' + formatMoney( this.get('change') )
                } else {
                    text += 'não precisará de troco';
                }
            } else {
                text += 'pague na entrega'; 
            }

        } catch(e){}
        

        return text.trim() + '.';
    }

    

}
