import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { HashService } from 'src/auth/hash.service';
import { InjectModel } from '@nestjs/mongoose';
import passport from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
  ) {}
  async findOneByUsername(email: string) {
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const isUserRegistered = await this.findOneByUsername(createUser.email);
    if (isUserRegistered) {
      const error = {
        code: 404,
        message: 'User already exists',
      };

      return error;
    }
    const hash = await this.hashService.hashPassword(createUser.password);
    createUser.password = hash;
    const created = await createUser.save();
    const user = {
      created,
    };
    return user;
  }

  async findOnebyId(id: string) {
    const user = this.userModel.findOne({ id }).select('_id, email').exec();
    return user;
  }

  findAll() {
    const users = this.userModel.find().select('_id, email').exec();
    return users;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
