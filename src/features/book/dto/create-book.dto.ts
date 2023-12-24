import { IsMongoId, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsMongoId()
  authorId: string;
  @IsNumber()
  @Min(1)
  stockCount: number;
}
