import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Prisma.UsersCreateInput {
  id?: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 15)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role) // Update the decorator to match the type in Prisma.UsersCreateInput
  role: Role;

  @Type(() => Date)
  created_at?: string | Date;

  @Type(() => Date)
  updated_at?: string | Date;

  threads?: Prisma.ThreadsCreateNestedManyWithoutUserInput;

  comments?: Prisma.CommentsCreateNestedManyWithoutUserInput;

  admin?: Prisma.AdminsCreateNestedOneWithoutUserInput;
}
