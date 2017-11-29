"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var errors_list_1 = require("../../../shared/utils/errors.list");
var TypeFormComponent = (function () {
    function TypeFormComponent(dialogRef, data, restService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.restService = restService;
        this.suggested_by = 'Admin';
        this.is_killer = false;
        this.has_killer = false;
        this.is_active = false;
        this.cats = [];
    }
    TypeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restService.get('type/getCats').subscribe(function (res) {
            _this.cats = res;
        });
    };
    TypeFormComponent.prototype.onSubmit = function (form) {
        this.restService.post('type/suggest', form.value).subscribe(function (res) {
            console.log('-> ', res);
        }, function (err) {
            if (err.error === errors_list_1.illegalTypeName.error.message && err.status === errors_list_1.illegalTypeName.code)
                snackBar.open('Message archived');
        });
    };
    TypeFormComponent.prototype.onChange = function (cat) {
        this.has_killer = cat === 'lce';
    };
    TypeFormComponent.prototype.ngOnDestroy = function () {
    };
    TypeFormComponent = __decorate([
        core_1.Component({
            selector: 'ii-type-form',
            templateUrl: './type-form.component.html',
            styleUrls: ['./type-form.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], TypeFormComponent);
    return TypeFormComponent;
}());
exports.TypeFormComponent = TypeFormComponent;
