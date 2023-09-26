import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  virtuals: true,
  versionKey: false,
  id: true,
})
export class User extends Document {
  @Prop()
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Exclude()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
