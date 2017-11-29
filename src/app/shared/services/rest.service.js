"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var RestService = (function () {
    function RestService(http) {
        this.http = http;
    }
    RestService.prototype.call = function (table) {
        return this.http.get('/api/' + table, { observe: 'response' });
    };
    RestService.prototype.put = function (url, values) {
        return this.http.put('/api/' + url, values).map(function (data) { return data.json(); });
    };
    RestService.prototype.get = function (url) {
        return this.call(url).map(function (data) { return data.body; });
    };
    ;
    RestService.prototype.getWithParams = function (table, values) {
        var params = [];
        for (var key in values)
            if (values.hasOwnProperty(key))
                params.push(key + '=' + values[key]);
        return this.call(table + '?' + params.join('&')).map(function (data) { return data.json(); });
    };
    RestService.prototype.delete = function (url, id) {
        return this.http.delete('/api/' + url + '/' + id, { observe: 'response' });
    };
    RestService.prototype.post = function (url, values) {
        return this.http.post('/api/' + url, values, { observe: 'response' });
    };
    RestService = __decorate([
        core_1.Injectable()
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
