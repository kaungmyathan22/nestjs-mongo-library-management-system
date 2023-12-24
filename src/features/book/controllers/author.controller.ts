import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import { CreateAuthorDTO } from '../dto/author/create-author.dto';
import { UpdateAuthorDTO } from '../dto/author/update-author.dto';
import { AuthorService } from '../services/author.service';

@Controller('api/v1/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Post()
  createAuthor(@Body() createAuthorDTO: CreateAuthorDTO) {
    return this.authorService.createAuthor(createAuthorDTO);
  }

  @Get()
  getAuthors(@Query() queryParams) {
    return this.authorService.getAllAuthors(queryParams);
  }

  @Get(':id')
  getAuthorById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() payload: UpdateAuthorDTO,
  ) {
    return this.authorService.updateAuthor(id, payload);
  }

  @Get(':id/books')
  getBooksOfAuthor(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Query() queryParams,
  ) {
    return this.authorService.getBooksOfAuthor(id, queryParams);
  }
}
