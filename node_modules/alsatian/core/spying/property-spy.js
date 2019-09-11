"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spy_call_1 = require("./spy-call");
var PropertySpy = /** @class */ (function () {
    function PropertySpy(target, propertyName) {
        this._getCalls = [];
        this._setCalls = [];
        // store references to property we are spying on so we can restore it
        this._descriptorTarget = target;
        this._propertyName = propertyName;
        // for TypeScript may need to search target.constructor.prototype for propertyDescriptor
        if (!Object.getOwnPropertyDescriptor(target, this._propertyName)) {
            this._descriptorTarget = target.constructor.prototype;
        }
        // get the current property descriptor
        var propertyDescriptor = Object.getOwnPropertyDescriptor(this._descriptorTarget, this._propertyName);
        // throw an error if we are trying to spy on a non property
        if (propertyDescriptor === undefined) {
            throw new TypeError(propertyName + " is not a property.");
        }
        // store the original setters and getters, which maybe undefined
        this._originialGetter = propertyDescriptor.get;
        this._originialSetter = propertyDescriptor.set;
        this._getter = this._originialGetter;
        this._setter = this._originialSetter;
        // set descriptor target back to original object so the prototype doesn't get modified
        this._descriptorTarget = target;
        // reset the property definition
        Object.defineProperty(this._descriptorTarget, this._propertyName, {
            get: this._get.bind(this),
            set: this._set.bind(this)
        });
    }
    Object.defineProperty(PropertySpy.prototype, "setCalls", {
        get: function () {
            return this._setCalls;
        },
        enumerable: true,
        configurable: true
    });
    PropertySpy.prototype.andReturnValue = function (value) {
        this._value = value;
        this._returnValue = true;
        return this;
    };
    PropertySpy.prototype.andCallGetter = function (getter) {
        this._getter = getter;
        this._returnValue = false;
        return this;
    };
    PropertySpy.prototype.andCallSetter = function (setter) {
        this._setter = setter;
        this._returnValue = false;
        return this;
    };
    PropertySpy.prototype.restore = function () {
        Object.defineProperty(this._descriptorTarget, this._propertyName, {
            get: this._originialGetter,
            set: this._originialSetter
        });
    };
    PropertySpy.prototype._get = function () {
        // log that the property was requested
        this._getCalls.push(new spy_call_1.SpyCall([]));
        // return a given value if this is the spy's behaviour
        if (this._returnValue) {
            return this._value;
        }
        // otherwise call the getter function and return it's return value
        return this._getter.call(this._descriptorTarget);
    };
    PropertySpy.prototype._set = function (value) {
        // log that the proeprty was set and with which value
        this._setCalls.push(new spy_call_1.SpyCall([value]));
        // call the setter function
        this._setter.call(this._descriptorTarget, value);
        // if there is not already a value to return then log this as the current value
        if (!this._returnValue) {
            this._value = value;
        }
    };
    return PropertySpy;
}());
exports.PropertySpy = PropertySpy;
//# sourceMappingURL=property-spy.js.map