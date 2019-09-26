import {Expect, Test, TestFixture} from "alsatian";
import {Request} from "../../src/net/request/Request";
import {RequestDestination} from "../../src/net/request/RequestDestination";
import {SpyOn} from "alsatian";
import {Paths} from "../../src/Paths";

@TestFixture("Test for checking SSL-validity")
export class SslSpec {

    @Test("Testing request class")
    public parser() {
            let request = new (class TestRequest extends Request {
                constructor() {
                    super(new RequestDestination("", 2020), null);
                }

                protected callBack(res: any): void {

                }
            });
            Expect(request.serverFingerprint).toBe("62:84:D5:13:10:9A:15:F0:D7:8E:61:BE:68:92:86:97:74:25:19:44");
    }

}
