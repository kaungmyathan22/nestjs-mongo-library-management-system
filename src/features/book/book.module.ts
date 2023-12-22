import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { AuthorRepository } from './repositories/author.repository';
import { Author, AuthorSchema } from './schemas/author.schema';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
  ],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService, AuthorRepository],
})
export class BookModule {}
