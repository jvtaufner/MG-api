import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { CreateUserDto } from './dtos';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
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
