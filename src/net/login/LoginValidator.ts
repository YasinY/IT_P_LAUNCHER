class LoginHandler {

    private static loginHandler: LoginHandler;


    public canLogin(username: string): boolean {
        return username.length <= 32 && this.isASCII(username);
    }

    private isASCII(str: string) : boolean {
        return /^[\x00-\x7F]*$/.test(str);
    }

    public static getInstance() : LoginHandler {
        return this.loginHandler === null ? this.loginHandler = new LoginHandler() : this.loginHandler;
    }


}
