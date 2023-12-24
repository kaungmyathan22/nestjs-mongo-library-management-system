import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { LoansService } from '../services/loans.service';

@Controller('api/v1/book-loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  createLoan(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.loansService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string) {
    return this.loansService.returnBook(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
