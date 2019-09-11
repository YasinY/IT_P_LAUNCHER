"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function createSetupTeardownDecorator(metadataDescription, isAsync) {
    return function (target, decoratedPropertyKey, descriptor) {
        var functions = Reflect.getMetadata(metadataDescription, target) || [];
        functions.push({
            isAsync: isAsync,
            propertyKey: decoratedPropertyKey
        });
        Reflect.defineMetadata(metadataDescription, functions, target);
    };
}
exports.createSetupTeardownDecorator = createSetupTeardownDecorator;
//# sourceMappingURL=create-setup-teardown-decorator.js.map