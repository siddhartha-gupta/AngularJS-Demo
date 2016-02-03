System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Utils;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                Utils.prototype.getDataType = function (obj) {
                    return ({}).toString.call(obj).toLowerCase();
                };
                Utils.prototype.isNullUndefined = function (val, validateZeroNaN) {
                    var isNull = false, type = this.getDataType(val);
                    switch (type) {
                        case '[object array]':
                            if (val.length === 0) {
                                isNull = true;
                            }
                            break;
                        case '[object object]':
                            if (Object.keys(val).length === 0) {
                                isNull = true;
                            }
                            break;
                        default:
                            if (typeof (val) === "undefined" || val === null || val === "" || val === "null" || val === "undefined") {
                                isNull = true;
                            }
                            else if (validateZeroNaN && (val === 0 || isNaN(val))) {
                                isNull = true;
                            }
                    }
                    return isNull;
                };
                Utils.prototype.getObject = function (obj, key) {
                    key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                    key = key.replace(/^\./, ''); // strip a leading dot
                    var a = key.split('.');
                    for (var i = 0, n = a.length; i < n; ++i) {
                        var k = a[i];
                        if (k in obj) {
                            obj = obj[k];
                        }
                        else {
                            return;
                        }
                    }
                    return obj;
                };
                Utils.prototype.sortArrayObject = function (key, data, direction) {
                    var _this = this;
                    console.log(key);
                    console.log(data);
                    console.log(direction);
                    data.sort(function (a, b) {
                        var aData = _this.getObject(a, key), bData = _this.getObject(b, key);
                        console.log(aData);
                        if (aData === bData) {
                            return 0;
                        }
                        else if (aData > bData) {
                            return direction;
                        }
                        else {
                            return -direction;
                        }
                    });
                };
                Utils.prototype.log = function () {
                    console.log.apply(console, arguments);
                };
                Utils = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Utils);
                return Utils;
            })();
            exports_1("Utils", Utils);
        }
    }
});

//# sourceMappingURL=utils.service.js.map
