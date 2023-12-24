import { BadRequestException, Injectable } from '@nestjs/common';
import { BookService } from 'src/features/book/services/book.service';
import { BorrowersService } from 'src/features/borrowers/services/borrowers.service';
import { CreateLoanDto, StatusEnum } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
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

  findAll() {
    return `This action returns all loans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
