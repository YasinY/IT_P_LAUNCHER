import {RequestResponse} from "./RequestResponse";

export class LoginResponse extends RequestResponse {

    private readonly jwtToken: string;

    private readonly expires: bigint;

    constructor(body : string) {
        super(body);
    }
    public getJwtToken(): string {
        return this.jwtToken;
    }

    public getExpires(): bigint {
        return this.expires;
    }
}
