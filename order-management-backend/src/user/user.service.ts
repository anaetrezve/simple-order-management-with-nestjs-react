import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { hashPassword, User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users || [];
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hash = await hashPassword(createUserInput.password);
    try {
      return await this.userModel.create({
        ...createUserInput,
        password: hash,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id });

    return user;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { _id, ...updatedData } = updateUserInput;
    if (updatedData?.password) {
      const pass = await hashPassword(updatedData.password);
      updatedData.password = pass;
    }

    const user = await this.userModel.findOneAndUpdate(
      { _id },
      { $set: updatedData },
      { new: true },
    );

    return user;
  }

  async remove(_id: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete(
      { _id },
      { new: true },
    );
    return deletedUser;
  }
}
