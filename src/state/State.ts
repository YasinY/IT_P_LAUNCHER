export enum State {
    LOGGED_OUT = 200, //OK!
    LOGGED_IN = 227, //custom, so we can differ between logged_out and logged_in
    EXPIRED_SESSION_TOKEN = 453,
    DISCONNECTED_CLIENT_NO_INTERNET = -1,
    DISCONNECTED_SERVER_NOT_REACHABLE = -1,
    INVALID_CREDENTIALS = 454,
    INVALID_SESSION_TOKEN = 455,
    INVALID_HARDWARE = 456,
    BANNED_UUID = 457,
    UNSUPPORTED_COUNTRY = 501, //not implemented response code
    UNIDENTIFIED_RESPONSE = 0
}

export namespace State {
    export function parseResponse(statusCode: number) : State  {
        return Object.keys(State).map(Number).find(k => !isNaN(k) && k === statusCode)
    }
}
