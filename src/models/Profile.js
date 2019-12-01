import { Model } from 'radiks';

export default class Profile extends Model {
    static className = 'Profile';
    static schema = {
        commentedPosts : {type: array, required : true}, //id of confessions from others user comment on
    };
    static defaults = {
    };
}
