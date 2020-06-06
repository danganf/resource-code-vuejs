
import {  STORAGE_CUSTOMER_AUTH } from "@/configs/configs";
import { storageContract } from "@class/contract/storage";

const __attrs = { header: null, token: null, name: null, login: null, id: null };

export class storageAuth extends storageContract {

    constructor(){
        super( STORAGE_CUSTOMER_AUTH, __attrs, null, 1 );
    }

    setAuth( resultAxiosAuth ) {
        this.set('header', resultAxiosAuth.header_is_alive);
        this.set('token' , resultAxiosAuth.token );
        this.set('name' , resultAxiosAuth.name );
        this.set('login' , resultAxiosAuth.login );
        this.set('id' , resultAxiosAuth.uid );
    };

    isAlive(){
        return this.get('token') === null ? false : true;
    }

}
