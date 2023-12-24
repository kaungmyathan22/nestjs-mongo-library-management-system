import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from '../book/book.module';
import { BorrowersModule } from '../borrowers/borrowers.module';
import { LoansController } from './controllers/loans.controller';
import { BookLoanRepository } from './repository/loan.repository';
import { BookLoan, BookLoanSchema } from './schemas/loan.schema';
import { LoansService } from './services/loans.service';

@Module({
  imports: [
    BorrowersModule,
    BookModule,
    MongooseModule.forFeature([
      {
        name: BookLoan.name,
        schema: BookLoanSchema,
      },
    ]),
  ],
  controllers: [LoansController],
  providers: [LoansService, BookLoanRepository],
})
export class LoansModule {}
