import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginatedParamsDto } from 'src/common/dto/paginated-query.dto';
import { BookService } from 'src/features/book/services/book.service';
import { BorrowersService } from 'src/features/borrowers/services/borrowers.service';
import { CreateLoanDto, StatusEnum } from '../dto/create-loan.dto';
import { BookLoanRepository } from '../repository/loan.repository';

@Injectable()
export class LoansService {
  constructor(
    private readonly bookLoanRepository: BookLoanRepository,
    private readonly bookService: BookService,
    private readonly borrowerService: BorrowersService,
  ) {}

  async createLoan({ borrowerId, bookId }: CreateLoanDto) {
    const [borrower, book] = await Promise.all([
      this.borrowerService.findOne(borrowerId),
      this.bookService.findOne(bookId),
    ]);
    if (book.stockCount < 1) {
      throw new BadRequestException('Book out of stock.');
    }
    const result = await this.bookLoanRepository.create({
      borrower: borrower._id,
      book: book._id,
      status: StatusEnum.LENT,
      loanDate: new Date(),
    } as any);
    await this.bookService.lentBook(bookId);
    return result;
  }

  findAll(queryParams: PaginatedParamsDto) {
    return this.bookLoanRepository.findAllWithPaginated(queryParams);
  }

  findOne(id: string) {
    return this.bookLoanRepository.findOne({ _id: id });
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }

  async returnBook(id: string) {
    const loans = await this.findOne(id);
    await Promise.all([
      this.bookLoanRepository.findOneAndUpdate(
        { _id: id },
        { status: StatusEnum.RETURNED },
      ),
      this.bookService.returnBook(loans.book),
    ]);
    return {
      message: 'Successfully returned book',
    };
  }
}
