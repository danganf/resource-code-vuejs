
import {  STORAGE_NAME_QUOTE } from "@/configs/configs";
import { storageContract } from "@class/contract/storage";

const __attrs = { quote_id: '', customer_id: '' };

export class storageQuote extends storageContract {

    constructor(){
        super( STORAGE_NAME_QUOTE, __attrs );
    }

    setId( val ){
        return super.set( 'quote_id', val);
    }

    setCustomerId( val ){
        return super.set( 'customer_id', val);
    }

}
