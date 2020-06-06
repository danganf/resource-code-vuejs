
import {VMoney} from 'v-money';

export const MixMoney =  {

    directives: {money: VMoney},

    filters: {
        formatMoney( value, currency, precision ){

            currency  = typeof currency === 'undefined'  ? 'R$' : currency;
            precision = typeof precision === 'undefined' ? 2    : precision;

            let amount = parseFloat( value ).toFixed( precision )
                .replace('.',',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

            return `${currency} ${amount}`;
        }
    },
    data(){
        return {
            configDirectivemoney: {decimal: ',', thousands: '.', prefix: 'R$ ', suffix: '', precision: 2},
        }
    }
};
