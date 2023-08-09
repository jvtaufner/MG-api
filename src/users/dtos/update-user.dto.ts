import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(8, 16)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
