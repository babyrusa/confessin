import { Model } from 'radiks';

export default class KonfessionComment extends Model {
    static className = 'KonfessionComment';
    static schema = {
        konfessionId : { type: String, decrypted : true },
        text : { type: String, decrypted : true },
    };
    static defaults = {
    };
}
