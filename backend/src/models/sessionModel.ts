import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./userModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
