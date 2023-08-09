import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../db';
import { CreateUserDto } from './dtos';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    let user: User;

    try {
      user = await this.prisma.user.create({
        data: dto,
      });
    } catch (err) {
      throw new ForbiddenException('Email já existe');
    }

    return user;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    email?: string;
    name?: string;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, email, name, orderBy } = params;

    const where: Prisma.UserWhereInput = {
      email,
      name,
    };

    if (email === '') {
      delete where.email;
    }

    if (name === '') {
      delete where.name;
    }

    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(params: { where?: Prisma.UserWhereInput }): Promise<User> {
    const { where } = params;

    const user: User = await this.prisma.user.findFirst({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;

    return this.prisma.user.update({ where, data });
  }

  async delete(params: { where?: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;

    return this.prisma.user.delete({ where });
  }
}
