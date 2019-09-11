"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["LOGGED_OUT"] = 200] = "LOGGED_OUT";
    State[State["LOGGED_IN"] = 227] = "LOGGED_IN";
    State[State["EXPIRED_SESSION_TOKEN"] = 453] = "EXPIRED_SESSION_TOKEN";
    State[State["DISCONNECTED_CLIENT_NO_INTERNET"] = -1] = "DISCONNECTED_CLIENT_NO_INTERNET";
    State[State["DISCONNECTED_SERVER_NOT_REACHABLE"] = -1] = "DISCONNECTED_SERVER_NOT_REACHABLE";
    State[State["INVALID_CREDENTIALS"] = 454] = "INVALID_CREDENTIALS";
    State[State["INVALID_SESSION_TOKEN"] = 455] = "INVALID_SESSION_TOKEN";
    State[State["INVALID_HARDWARE"] = 456] = "INVALID_HARDWARE";
    State[State["BANNED_UUID"] = 457] = "BANNED_UUID";
    State[State["UNSUPPORTED_COUNTRY"] = 501] = "UNSUPPORTED_COUNTRY";
    State[State["UNIDENTIFIED_RESPONSE"] = 0] = "UNIDENTIFIED_RESPONSE";
})(State = exports.State || (exports.State = {}));
(function (State) {
    function parseResponse(statusCode) {
        return Object.keys(State).map(Number).find(function (k) { return !isNaN(k) && k === statusCode; });
    }
    State.parseResponse = parseResponse;
})(State = exports.State || (exports.State = {}));
//# sourceMappingURL=State.js.map