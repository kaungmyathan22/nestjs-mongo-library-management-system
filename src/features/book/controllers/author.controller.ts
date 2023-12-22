import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAuthorDTO } from '../dto/author/create-author.dto';
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
}
