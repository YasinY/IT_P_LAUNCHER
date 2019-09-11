"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _metadata_keys_1 = require("./_metadata-keys");
var unused_1 = require("../unused");
function Timeout(timeoutInMs) {
    if (timeoutInMs <= 0) {
        throw new RangeError("Timeout period must be greater than 0.");
    }
    return function (target, propertyKey, descriptor) {
        unused_1.Unused(descriptor);
        Reflect.defineMetadata(_metadata_keys_1.TIMEOUT, timeoutInMs, target, propertyKey);
    };
}
exports.Timeout = Timeout;
//# sourceMappingURL=timeout-decorator.js.map