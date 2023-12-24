import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Author } from 'src/features/book/schemas/author.schema';
import { Borrower } from 'src/features/borrowers/schemas/borrower.schema';

export type BookLoanDocument = HydratedDocument<BookLoan>;

const LOAN_STATUS_ENUM = ['LENT', 'RETURNED'];

@Schema({
  virtuals: true,
  versionKey: false,
  id: true,
})
export class BookLoan extends Document {
  @Prop({ type: Types.ObjectId, ref: 'borrowers' })
  borrower: Borrower;
  @Prop({ type: Types.ObjectId, ref: 'authors' })
  author: Author;
  @Prop({ required: true, type: Date })
  loanDate: Date;
  @Prop({ required: true, enum: LOAN_STATUS_ENUM, type: String })
  status: string;
}

export const BookLoanSchema = SchemaFactory.createForClass(BookLoan);
BookLoanSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, opt) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});