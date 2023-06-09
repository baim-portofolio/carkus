import { Campus } from "@prisma/client";

export class ResultCreate {
    success: boolean;
    message: string;
    result: Campus ;

    constructor(success: boolean, message: string, result: Campus) {
        this.success = success;
        this.message = message;
        this.result = result;
    }
}