import {Expect, Test, TestFixture} from "alsatian";
import {State} from "../../src/state/State";

@TestFixture("Test for parsing response codes")
export class StateParser {

    @Test("Testing states")
    public parser() {
        Expect(State.parseResponse(State.LOGGED_OUT)).toBe(State.LOGGED_OUT)
    }

}
