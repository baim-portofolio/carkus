import { Prisma } from '@prisma/client';
import { IsString, MaxLength } from 'class-validator';
export class CreateCommentDto implements Prisma.CommentsCreateInput {
  id?: string;

  @IsString()
  @MaxLength(1000)
  comment: string;

  created_at?: string | Date;
  updated_at?: string | Date;
  user: Prisma.UsersCreateNestedOneWithoutCommentsInput;
  thread: Prisma.ThreadsCreateNestedOneWithoutCommentsInput;
}
