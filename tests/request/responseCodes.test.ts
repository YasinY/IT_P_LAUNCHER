import {State} from "../../src/state/State";

test('response codes are all valid', () => {
    expect(State.LOGGED_OUT).toBe(200);
    expect(State.LOGGED_IN).toBe(227);
    expect(State.DISCONNECTED_CLIENT_NO_INTERNET).toBe(-1);
    expect(State.DISCONNECTED_SERVER_NOT_REACHABLE).toBe(-1);
    expect(State.EXPIRED_SESSION_TOKEN).toBe(453);
    expect(State.INVALID_CREDENTIALS).toBe(454);
    expect(State.INVALID_SESSION_TOKEN).toBe(455);
    expect(State.INVALID_HARDWARE).toBe(456);
    expect(State.BANNED_UUID).toBe(457);
    expect(State.UNSUPPORTED_COUNTRY).toBe(501);
    expect(State.UNIDENTIFIED_RESPONSE).toBe(0);
})

test('response codes return states on parse', () => {
    expect(State.parseResponse(200)).toBe(State.LOGGED_OUT);
    expect(State.parseResponse(227)).toBe(State.LOGGED_IN);
    expect(State.parseResponse(-1)).toBe(State.DISCONNECTED_CLIENT_NO_INTERNET);
    expect(State.parseResponse(-1)).toBe(State.DISCONNECTED_SERVER_NOT_REACHABLE);
    expect(State.parseResponse(453)).toBe(State.EXPIRED_SESSION_TOKEN);
    expect(State.parseResponse(454)).toBe(State.INVALID_CREDENTIALS);
    expect(State.parseResponse(455)).toBe(State.INVALID_SESSION_TOKEN);
    expect(State.parseResponse(456)).toBe(State.INVALID_HARDWARE);
    expect(State.parseResponse(457)).toBe(State.BANNED_UUID);
    expect(State.parseResponse(501)).toBe(State.UNSUPPORTED_COUNTRY);
    expect(State.parseResponse(0)).toBe(State.UNIDENTIFIED_RESPONSE);

})