import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { AuthorRepository } from './repositories/author.repository';
import { BookRepository } from './repositories/book.repository';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService, AuthorRepository, BookRepository],
})
export class BookModule {}
