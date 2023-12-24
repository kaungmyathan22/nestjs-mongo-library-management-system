import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BookLoanDocument = HydratedDocument<BookLoan>;

export const LOAN_STATUS_ENUM = ['LENT', 'RETURNED'];

@Schema({
  virtuals: true,
  versionKey: false,
  id: true,
})
export class BookLoan extends Document {
  @Prop({ type: Types.ObjectId, ref: 'borrowers' })
  borrower: string;
  @Prop({ type: Types.ObjectId, ref: 'books' })
  book: string;
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
