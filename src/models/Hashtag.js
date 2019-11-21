import { Model } from 'radiks';

export default class Hashtag extends Model {
    static className = 'Hashtag';
    static schema = {
        konfessionId : { type: String, required : true, decrypted : true },
        text : { type: String, required : true, decrypted : true },
    };
    static defaults = {
    };
}
