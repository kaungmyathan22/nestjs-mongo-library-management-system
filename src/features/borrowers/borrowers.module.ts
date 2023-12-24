import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowersController } from './controllers/borrowers.controller';
import { Borrower, BorrowerSchema } from './schemas/borrower.schema';
import { BorrowersService } from './services/borrowers.service';
import { BorrowerRepository } from './repositories/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Borrower.name,
        schema: BorrowerSchema,
      },
    ]),
  ],
  controllers: [BorrowersController],
  providers: [BorrowersService, BorrowerRepository],
})
export class BorrowersModule {}
