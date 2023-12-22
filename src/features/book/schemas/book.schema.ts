import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Author } from './author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  virtuals: true,
  versionKey: false,
  id: true,
})
export class Book extends Document {
  @Prop()
  name: string;
  @Prop({ type: Number, required: true })
  stockCount: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: Types.ObjectId, ref: 'authors' })
  author: Author;
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, opt) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
