import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { PaginatedParamsDto } from 'src/common/dto/paginated-query.dto';
import { CreateAuthorDTO } from '../dto/author/create-author.dto';
import { AuthorRepository } from '../repositories/author.repository';
import { AuthorDocument } from '../schemas/author.schema';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly configService: ConfigService,
  ) {}
  async createAuthor(payload: CreateAuthorDTO) {
    try {
      return await this.authorRepository.create({
        name: payload.name,
        birthDay: payload.birthDay,
      } as unknown as AuthorDocument);
    } catch (error) {
      if (
        error.code ===
        +this.configService.get(EnvironmentConstants.DUPLICATE_ERROR_KEY)
      ) {
        throw new ConflictException(
          `Author with name(${payload.name}) already exists.`,
        );
      }
      throw error;
    }
  }
  async getAllAuthors(queryParams: PaginatedParamsDto) {
    const authors = await this.authorRepository.findAllWithPaginated(
      queryParams,
    );
    return authors;
  }
}
