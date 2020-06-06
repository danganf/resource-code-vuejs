
import { modelContract } from "@/util/modelContract";

const attrs = {
    slug: null,
    name: null,
    attr: null,
};

export class deliveryMethodModel extends modelContract{

    constructor(data) {
        super( attrs, data);
        this.set('attr', []);
    }

    resetAttr( vaDefault ){
        super.resetAttr(vaDefault);
        this.set('attr', []);
    }

    getAttrToLine(){
        let text = '';
        try {
            Array.from(this.get('attr')).forEach(el => {
                text += el.label + ': ' + el.value + ' ';
            });
        } catch (e) {

        }

        return text.trim();
    }



}
