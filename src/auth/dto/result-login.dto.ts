import { Users } from "@prisma/client";
export class ResultLogin {
    success: boolean;
    message: string;
    access_token: string;
    user: {username: string, sub: string, role: string};

    constructor(success: boolean, message: string, access_token: string, user: Users) {
        this.success = success;
        this.message = message;
        this.access_token = access_token;
        this.user = {username: user.username, sub: user.id, role: user.role};
    }
}