"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件总线
 * @author Justin Song, Aka AnCo
 */
var MyEventEmitter = /** @class */ (function () {
    /**
     * 初始化事件总线
     */
    function MyEventEmitter() {
        this.et = new Map();
    }
    /**
     * 监听事件
     * @param event 事件名
     * @param cbs 回调函数
     */
    MyEventEmitter.prototype.on = function (event) {
        var cbs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cbs[_i - 1] = arguments[_i];
        }
        if (!this.et.has(event)) {
            this.et.set(event, cbs);
        }
        else {
            throw new Error("Do not allow multiple on operation，please use `addListener` to push new Callback.");
        }
    };
    /**
     * 取消监听
     * @param event 事件名
     */
    MyEventEmitter.prototype.off = function (event) {
        if (this.et.has(event)) {
            this.et.delete(event);
        }
        else {
            throw new Error("Unbind Event, please use on to bind event first.");
        }
    };
    /**
     * 触发事件
     * @param event 事件名
     */
    MyEventEmitter.prototype.emit = function (event) {
        var _a, _b;
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        args.shift(); //去掉event参数，保留剩余参数
        if (this.et.has(event)) {
            (_a = this.et.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(function (func) {
                func.call(self, args);
            });
        }
        else if (this.et.has("--once--" + event + "--once--")) {
            var args_1 = Array.prototype.slice.call(arguments);
            args_1.shift(); //去掉event
            (_b = this.et.get("--once--" + event + "--once--")) === null || _b === void 0 ? void 0 : _b.forEach(function (func) {
                func.call(self, args_1);
            });
            this.et.delete("--once--" + event + "--once--");
        }
        else {
            // console.log("ERROR");
            throw new Error("No matched event, use on first.");
        }
    };
    /**
     * 单次监听
     * @param event 事件名
     * @param cbs 回调
     */
    MyEventEmitter.prototype.once = function (event) {
        var cbs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cbs[_i - 1] = arguments[_i];
        }
        if (!this.et.has("--once--" + event + "--once--")) {
            this.et.set("--once--" + event + "--once--", cbs);
        }
        else {
            throw new Error("Do not allowed mutilple once");
        }
    };
    /**
     * 对已绑定的事件添加回调
     * @param event 事件名
     * @param cbs 待添加的回调数组
     */
    MyEventEmitter.prototype.addListeners = function (event) {
        var _a;
        var cbs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cbs[_i - 1] = arguments[_i];
        }
        if (this.et.has(event)) {
            (_a = this.et.get(event)) === null || _a === void 0 ? void 0 : _a.push.apply(_a, cbs);
        }
        else {
            throw new Error("Unbind event, please use on first.");
        }
    };
    /**
     * 移除全部绑定
     */
    MyEventEmitter.prototype.removeAllListeners = function () {
        this.et.clear();
    };
    return MyEventEmitter;
}());
exports.default = MyEventEmitter;
