import { Model } from 'radiks';

export default class Comment extends Model {
    static className = 'Comment';
    static schema = {
        username : {type: String, required : true},
        konfessionId : { type: String, required : true, decrypted : true },
        text : { type: String, required : true, decrypted : true },
    };
    static defaults = {
    };
}
