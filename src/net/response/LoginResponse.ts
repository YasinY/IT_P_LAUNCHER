export class LoginResponse {

    private readonly jwtToken: string;

    private readonly expires: bigint;

    public getJwtToken(): string {
        return this.jwtToken;
    }

    public getExpires(): bigint {
        return this.expires;
    }
}