import { Model } from 'radiks';

export default class Konfession extends Model {
    static className = 'Konfession';
    static schema = {
        username : { type: String },
        index: { type: Number, decrypted: true }, 
        text : { type: String, decrypted: true },
        topic : { type: Array, decrypted: true }
    };
    static defaults = {
    };
}
