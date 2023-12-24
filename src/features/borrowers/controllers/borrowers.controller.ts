import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBorrowerDto } from '../dto/create-borrower.dto';
import { UpdateBorrowerDto } from '../dto/update-borrower.dto';
import { BorrowersService } from '../services/borrowers.service';

@Controller('borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get()
  findAll() {
    return this.borrowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return this.borrowersService.update(+id, updateBorrowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowersService.remove(+id);
  }
}