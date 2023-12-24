import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { PaginatedParamsDto } from 'src/common/dto/paginated-query.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { AuthorRepository } from '../repositories/author.repository';
import { BookRepository } from '../repositories/book.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly configService: ConfigService,
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async create(payload: CreateBookDto) {
    try {
      const author = await this.authorRepository.findOne(
        new mongoose.Types.ObjectId(payload.authorId),
        'Author with given id not found.',
      );
      return await this.bookRepository.create({
        ...payload,
        author: author._id,
      } as any);
    } catch (error) {
      if (
        error.code ===
        +this.configService.get(EnvironmentConstants.DUPLICATE_ERROR_KEY)
      ) {
        throw new ConflictException(
          `Book with name(${payload.name}) already exists.`,
        );
      }
      throw error;
    }
  }

  findAll(queryParams: PaginatedParamsDto) {
    let filter = {};
    if (queryParams.query) {
      filter = {
        $or: [
          { name: { $regex: queryParams.query, $options: 'i' } },
          { description: { $regex: queryParams.query, $options: 'i' } },
        ],
      };
    }
    return this.bookRepository.findAllWithPaginated(queryParams, filter);
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne(
      {
        _id: id,
      },
      'Book with given id not found.',
    );
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const product = await this.findOne(id);
    return this.bookRepository.findOneAndUpdate(
      { id: product.id },
      { ...updateBookDto },
    );
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    await this.bookRepository.remove({ _id: book._id });
    return { success: true };
  }
}
