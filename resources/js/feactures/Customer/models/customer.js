import { email, minLength, sameAs, required } from "vuelidate/lib/validators";
import { isCelPhone, isCpf } from "@/util/validates";
import { modelContract } from "@/util/modelContract";

const attrs = {
    name: {required, minLength: minLength(4)},
    login: {required, email, minLength: minLength(4)},
    document: { isCpf },
    cellphone: {required, isCelPhone},
    phone: {isCelPhone},
    password: {required, minLength: minLength(4)},
    password_repeat: {required, minLength: minLength(4), sameAsPassword: sameAs('password')},
};

export class CustomerModel extends modelContract{

    constructor(data) {
        super( attrs, data);
    }

    static validate(){
        return { validations: {customer: attrs } }
    }

    getAttrToLine(){
        let text = '';

        try{
            text  = this.get('name') + ', ';
            text += this.get('login') + ', ';
            text += this.get('cellphone');

        } catch(e){}
        

        return text.trim() + '...';
    }

}