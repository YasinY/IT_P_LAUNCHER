export class State {
    static readonly LOGGED_OUT = 200; //OK!
    static readonly LOGGED_IN = 227; //custom, so we can differ between logged_out and logged_in
    static readonly EXPIRED_SESSION_TOKEN = 453;
    static readonly DISCONNECTED_CLIENT_NO_INTERNET = -1;
    static readonly DISCONNECTED_SERVER_NOT_REACHABLE = -1;
    static readonly INVALID_CREDENTIALS = 454;
    static readonly INVALID_SESSION_TOKEN = 455;
    static readonly INVALID_HARDWARE = 456;
    static readonly BANNED_UUID = 457;
    static readonly UNSUPPORTED_COUNTRY = 501; //not implemented response code
    static readonly UNIDENTIFIED_RESPONSE = 0

    public static parseResponse(statusCode: number): State {
        return Object.values(State).find((element) => !isNaN(element) && element === statusCode);
    }
}

