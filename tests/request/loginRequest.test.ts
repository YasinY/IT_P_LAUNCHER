import {LoginRequest} from "../../src/net/request/impl/LoginRequest";
import {RequestDestination} from "../../src/net/request/RequestDestination";


let request : LoginRequest = null;

beforeAll(() => {
    request = new LoginRequest();
})
test("Login request has LOGIN_SERVER as destination", () => {
    expect(request.requestDestination).toBe(RequestDestination.LOGIN_SERVER);
})
test("Login request has correct passphrase", () => {
    expect(request.PASS_PHRASE).toBe('pEkEkE')
})