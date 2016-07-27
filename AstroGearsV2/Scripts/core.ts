/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/bootstrap/bootstrap.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-animate.d.ts" />
/// <reference path="typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />
/// <reference path="typings/moment-timezone/moment-timezone.d.ts" />
/// <reference path="common-library.ts" />

module Core {
    "use strict";

    // Angular application setup
    export var appModule = angular.module("astrogears", ["ngAnimate", "ngSanitize"]);

    // setup: Angular controllers
    appModule.controller("enteredChartsListingController",
    [
        "$scope", "$filter", "enteredChartsListingService",
        ($scope: any, $filter: any, enteredChartsListingService: any) => new Application.Controllers
        .EnteredChartsListingController($scope, $filter, enteredChartsListingService)
    ]);

    // setup: Angular Services
    appModule.factory("enteredChartsListingService",
    [
        "$http", "$location", ($http: any, $location: any) => new Application.Services
        .EnteredChartsListingService($http, $location)
    ]);

    // setup: Angular Directives
    appModule.directive("addNewEnteredChartModal", ["$compile", ($compile: any) => new Application.Directives.AddNewEnteredChartModal($compile)]);

    appModule.directive("editEnteredChartModal", ["$compile", ($compile: any) => new Application.Directives.EditEnteredChartModal($compile)]);

}