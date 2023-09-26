import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}
  async create({ password, email }: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUserDocument = new this.UserModel({
        email,
        password: hashedPassword,
      });
      await createdUserDocument.save();
      return createdUserDocument;
    } catch (error) {
      if (
        error.code ===
        +this.configService.get(EnvironmentConstants.DUPLICATE_ERROR_KEY)
      ) {
        throw new ConflictException(
          `User with email(${email}) already exists.`,
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.UserModel.find();
  }

  async findOneOrFail(id: string) {
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with given id ${id} not found.`);
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.UserModel.findById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
      },
    );
    return updatedUser;
  }

  async remove(id: string) {
    await Promise.all([
      await this.findOneOrFail(id),
      await this.UserModel.deleteOne({ _id: id }),
    ]);
    return { success: true };
  }
}
