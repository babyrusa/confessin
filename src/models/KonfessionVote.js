import { Model } from 'radiks';

export default class KonfessionVote extends Model {
    static className = 'KonfessionVote';
    static schema = {
        konfessionId : { type: String, decrypted : true },
        number : { type: Number, decrypted : true }, // 1 or -1
    };
    static defaults = {
    };
}
