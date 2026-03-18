export class LoginRequest{
    code: string;
    password: string;

    constructor(code: string, password: string) {
        this.code = code;
        this.password = password;
    }
}