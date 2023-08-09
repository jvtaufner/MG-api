import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.UsersService.create(dto);
  }

  @Get()
  findAll(
    @Query()
    query?: {
      skip?: number;
      take?: number;
      email?: string;
      name?: string;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
  ) {
    return this.UsersService.findAll(query);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.UsersService.findOne({ where: { id: userId } });
  }

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() dto: UpdateUserDto) {
    return this.UsersService.update({
      where: { id: userId },
      data: dto,
    });
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.UsersService.delete({ where: { id: userId } });
  }
}
