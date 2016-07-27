/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/bootstrap/bootstrap.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/angularjs/angular-animate.d.ts" />
/// <reference path="typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="typings/moment/moment.d.ts" />
/// <reference path="typings/moment-timezone/moment-timezone.d.ts" />
/// <reference path="common-library.ts" />
var Core;
(function (Core) {
    "use strict";
    // Angular application setup
    Core.appModule = angular.module("astrogears", ["ngAnimate", "ngSanitize"]);
    // setup: Angular controllers
    Core.appModule.controller("enteredChartsListingController", [
        "$scope", "$filter", "enteredChartsListingService",
        function ($scope, $filter, enteredChartsListingService) { return new Core.Application.Controllers
            .EnteredChartsListingController($scope, $filter, enteredChartsListingService); }
    ]);
    // setup: Angular Services
    Core.appModule.factory("enteredChartsListingService", [
        "$http", "$location", function ($http, $location) { return new Core.Application.Services
            .EnteredChartsListingService($http, $location); }
    ]);
    // setup: Angular Directives
    Core.appModule.directive("addNewEnteredChartModal", ["$compile", function ($compile) { return new Core.Application.Directives.AddNewEnteredChartModal($compile); }]);
    Core.appModule.directive("editEnteredChartModal", ["$compile", function ($compile) { return new Core.Application.Directives.EditEnteredChartModal($compile); }]);
})(Core || (Core = {}));
//# sourceMappingURL=core.js.map