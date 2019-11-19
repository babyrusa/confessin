import { Model } from 'radiks';

export default class Reaction extends Model {
    static className = 'Reaction';
    static schema = {
        username : {type: String, required : true},
        konfessionId : { type: String, required : true, decrypted : true },
        type : { type: String, required : true, decrypted : true }, //type : Virtue, Sin, Deadly Sin
    };
    static defaults = {
    };
}
