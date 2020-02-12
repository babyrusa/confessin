import { Model } from "radiks";

export default class Konfession extends Model {
  static className = "Konfession";
  static schema = {
    username: { type: String, required: true },
    anonymousIdentity: { type: String, required: true, decrypted: true },
    index: { type: Number, required: true, decrypted: true },
    text: { type: String, required: true, decrypted: true },
    latitude: { type: Number, decrypted: true },
    longitude: { type: Number, decrypted: true }
  };
  static defaults = {};
}
