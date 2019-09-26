export class LoginValidator {
    private readonly MAX_USERNAME_LENGTH = 32;
    private readonly ASCII_REGEX = /^[\x00-\x7F]*$/;
    private static loginValidator: LoginValidator;


    public canLogin(username: string): boolean {
        return username.length <= this.MAX_USERNAME_LENGTH && this.isASCII(username);
    }

    private isASCII(str: string): boolean {
        return this.ASCII_REGEX.test(str);
    }

    public static getInstance(): LoginValidator {
        return this.loginValidator === null ? this.loginValidator = new LoginValidator() : this.loginValidator;
    }
}
