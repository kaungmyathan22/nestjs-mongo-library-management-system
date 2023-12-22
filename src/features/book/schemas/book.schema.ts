import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  virtuals: true,
  versionKey: false,
  id: true,
})
export class Book extends Document {
  @Prop()
  name: string;
  @Prop()
  stockCount: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
