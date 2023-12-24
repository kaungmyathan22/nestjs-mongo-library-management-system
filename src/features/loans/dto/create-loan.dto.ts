import { IsEnum, IsISO8601, IsMongoId } from 'class-validator';

export enum StatusEnum {
  RETURNED = 'RETURNED',
  LENT = 'LENT',
}

export class CreateLoanDto {
  @IsMongoId()
  borrowerId: string;
  @IsMongoId()
  bookId: string;
  @IsEnum(StatusEnum, { message: 'Invalid status' })
  status: StatusEnum;
  @IsISO8601({ strict: true }, { message: 'Invalid ISO 8601 date format' })
  startDate: Date;
}
