import { Prisma } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";
export class CreateCampusDto implements Prisma.CampusCreateInput  {
    id?: string;

    @IsString()
    campus_name: string;

    @IsString()
    address: string;

    @IsString()
    description: string;
    
    created_at?: string | Date;
    updated_at?: string | Date;
    threads?: Prisma.ThreadsCreateNestedManyWithoutCampusInput;
    admins?: Prisma.AdminsCreateNestedManyWithoutCampusInput;
}
