import { Model } from 'radiks';

export default class Notification extends Model {
    static className = 'Notification';
    static schema = {
        // username : {type: String, required : true},
        text : {type: String, required : true},
        konfessionId : {type: String, required : true},
        konfessionPreview : {type: String, required : true},
        madeAt :  {type: Number, required : true},
        checked : {type: Boolean, required : true} //if user already clicked on this noti
        // lastCheck : { type: Date, required : true, decrypted : true },
    };
    static defaults = {
      checked : false
    };
}
