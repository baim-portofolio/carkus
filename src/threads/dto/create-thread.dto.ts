import { Prisma } from "@prisma/client";
import { IsString, MaxLength} from "class-validator";

export class CreateThreadDto implements Prisma.ThreadsCreateInput{
    id?: string;

    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(1000)
    thread: string;

    created_at?: string | Date;
    updated_at?: string | Date;
    user: Prisma.UsersCreateNestedOneWithoutThreadsInput;
    campus: Prisma.CampusCreateNestedOneWithoutThreadsInput;
    comments?: Prisma.CommentsCreateNestedManyWithoutThreadInput;
}
