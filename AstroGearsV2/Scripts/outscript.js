var CommonLibrary;
(function (CommonLibrary) {
    // prototypes
    Array.prototype.contains = function (v) {
        for (var i = 0; i < this.length; i++) {
            //if (this[i] === v) return true;
            if (JSON.stringify(this[i]) === JSON.stringify(v))
                return true;
        }
        return false;
    };
    Array.prototype.unique = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };
    // string literals
    // - error icon
    CommonLibrary.errorIcon = '<span class="fa fa-exclamation-triangle error"></span>';
    // - checkmark for success icon
    CommonLibrary.successIcon = '<span class="fa fa-check-circle action-successful"></span>';
    // - coffee icon, because who doesn't need coffee?
    CommonLibrary.coffeeIcon = '<span class="fa fa-coffee coffee"></span>';
    // - moment string format for date/times.
    CommonLibrary.momentFormat = "MM/DD/YYYY HH:mm";
    // TextLabel class.
    var TextLabel = (function () {
        function TextLabel(name) {
            var self = this;
            self.name = name;
            self.value = name.replace(/\s/g, '');
        }
        return TextLabel;
    }());
    CommonLibrary.TextLabel = TextLabel;
    // creates a list of textlabels
    function CreateTextLabelList(names) {
        return names.map(function (name) { return new TextLabel(name); });
    }
    CommonLibrary.CreateTextLabelList = CreateTextLabelList;
    // Checks whether a value is within a numerical range, inclusive.
    function IsInRange(value, min, max) {
        // If either min or max is null/undefined, or if min is greater than max, or if the value is 
        // not a number, it is not in range.
        if ((IsNullOrUndefined(min) || IsNullOrUndefined(max)) || (min > max) || isNaN(value)) {
            return false;
        }
        // parse the integer value.
        var intVal = parseInt(value);
        // returns true if the value as an integer is within the range, false otherwise.
        return ((intVal >= min) === (intVal <= max));
    }
    CommonLibrary.IsInRange = IsInRange;
    // checks whether a given value is null or undefined.
    function IsNullOrUndefined(val) {
        return (typeof val === 'undefined' || val === null);
    }
    CommonLibrary.IsNullOrUndefined = IsNullOrUndefined;
    function RandomInteger(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
    CommonLibrary.RandomInteger = RandomInteger;
    function ConvertSecondsToHoursMinutesSeconds(inSeconds) {
        var date = new Date(null);
        date.setSeconds(inSeconds);
        return date.toISOString().substr(11, 8);
        //var outSeconds = inSeconds % 60;
        //var outMinutes = Math.floor(inSeconds / 60) % 60;
        //var outHours = Math.floor(inSeconds / 3600)
        //return outHours + ":" + outMinutes + ":" + outSeconds;
    }
    CommonLibrary.ConvertSecondsToHoursMinutesSeconds = ConvertSecondsToHoursMinutesSeconds;
})(CommonLibrary || (CommonLibrary = {}));

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

/*
Created by: Jon Russell (jrussell@nodeomega.com)
*/
var Core;
(function (Core) {
    "use strict";
    // angular app services.
    var Application;
    (function (Application) {
        var Services;
        (function (Services) {
            var EnteredChartsListingService = (function () {
                function EnteredChartsListingService($http, $location) {
                    this.http = $http;
                    this.location = $location;
                }
                EnteredChartsListingService.prototype.getEnteredChartListing = function (pageNumber, entriesPerPage) {
                    return this.http({
                        method: "POST",
                        url: "/api/EnteredChartsApi/GetEnteredChartsListing",
                        data: {
                            PageNumber: pageNumber,
                            EntriesPerPage: entriesPerPage
                        },
                        headers: { 'Content-Type': "application/json" }
                    });
                };
                EnteredChartsListingService.prototype.getEnteredChart = function (id) {
                    return this.http({
                        method: "POST",
                        url: "/api/EnteredChartsApi/GetEnteredChart",
                        data: {
                            Id: id
                        },
                        headers: { 'Content-Type': "application/json" }
                    });
                };
                EnteredChartsListingService.prototype.getChartTypesList = function () {
                    return this.http({
                        method: "POST",
                        url: "/api/ChartTypesApi/GetChartTypesList",
                        headers: { 'Content-Type': "application/json" }
                    });
                };
                EnteredChartsListingService.prototype.addNewChart = function (subjectName, subjectLocation, originDateTime, originDateTimeUnknown, chartTypeId) {
                    return this.http({
                        method: "POST",
                        url: "/api/EnteredChartsApi/AddNewChart",
                        data: {
                            SubjectName: subjectName,
                            SubjectLocation: subjectLocation,
                            OriginDateTime: originDateTime,
                            OriginDateTimeUnknown: originDateTimeUnknown,
                            ChartTypeId: chartTypeId
                        },
                        headers: { 'Content-Type': "application/json" }
                    });
                };
                EnteredChartsListingService.prototype.editChart = function (enteredChartId, subjectName, subjectLocation, originDateTime, originDateTimeUnknown, chartTypeId) {
                    return this.http({
                        method: "POST",
                        url: "/api/EnteredChartsApi/EditChart",
                        data: {
                            EnteredChartId: enteredChartId,
                            SubjectName: subjectName,
                            SubjectLocation: subjectLocation,
                            OriginDateTime: originDateTime,
                            OriginDateTimeUnknown: originDateTimeUnknown,
                            ChartTypeId: chartTypeId
                        },
                        headers: { 'Content-Type': "application/json" }
                    });
                };
                return EnteredChartsListingService;
            }());
            Services.EnteredChartsListingService = EnteredChartsListingService;
        })(Services = Application.Services || (Application.Services = {}));
    })(Application = Core.Application || (Core.Application = {}));
})(Core || (Core = {}));

/*
Created by: Jon Russell (v-jorus)
*/
var Core;
(function (Core) {
    "use strict";
    // angular app directives.
    var Application;
    (function (Application) {
        var Directives;
        (function (Directives) {
            var AddNewEnteredChartModal = (function () {
                function AddNewEnteredChartModal($compile) {
                    return this.createDirective($compile);
                }
                AddNewEnteredChartModal.prototype.createDirective = function ($compile) {
                    return {
                        restrict: "E",
                        replace: false,
                        scope: {
                            modal: "=modal"
                        },
                        link: function (scope, element) {
                            scope.$watch('modal', function () {
                                // any time the data changes, rerender with the fresh data.
                                //scope.render(scope.modal);
                                var newstate = scope.modal ? "show" : "hide";
                                element.children().modal(newstate);
                            }, false);
                        },
                        templateUrl: "/DirectiveTemplates/AddNewEnteredChart.html"
                    };
                };
                return AddNewEnteredChartModal;
            }());
            Directives.AddNewEnteredChartModal = AddNewEnteredChartModal;
        })(Directives = Application.Directives || (Application.Directives = {}));
    })(Application = Core.Application || (Core.Application = {}));
    var Application;
    (function (Application) {
        var Directives;
        (function (Directives) {
            var EditEnteredChartModal = (function () {
                function EditEnteredChartModal($compile) {
                    return this.createDirective($compile);
                }
                EditEnteredChartModal.prototype.createDirective = function ($compile) {
                    return {
                        restrict: "E",
                        replace: false,
                        scope: {
                            modal: "=modal"
                        },
                        link: function (scope, element) {
                            scope.$watch('modal', function () {
                                // any time the data changes, rerender with the fresh data.
                                //scope.render(scope.modal);
                                var newstate = scope.modal ? "show" : "hide";
                                element.children().modal(newstate);
                            }, false);
                        },
                        templateUrl: "/DirectiveTemplates/EditEnteredChart.html"
                    };
                };
                return EditEnteredChartModal;
            }());
            Directives.EditEnteredChartModal = EditEnteredChartModal;
        })(Directives = Application.Directives || (Application.Directives = {}));
    })(Application = Core.Application || (Core.Application = {}));
})(Core || (Core = {}));

/// <reference path="coreservices.ts" />
/// <reference path="coredirectives.ts" />
/// <reference path="core.ts" />
var Core;
(function (Core) {
    "use strict";
    // controllers for the AngularJS app.
    var Application;
    (function (Application) {
        var Controllers;
        (function (Controllers) {
            var EnteredChartsListingController = (function () {
                function EnteredChartsListingController($scope, $filter, enteredChartListingService) {
                    var _this = this;
                    this.scope = $scope;
                    this.filter = $filter;
                    this.enteredChartsListingService = enteredChartListingService;
                    this.data = [];
                    this.scope.errorMessage = "";
                    this.scope.entriesPerPage = [
                        { value: 10 },
                        { value: 25 },
                        { value: 50 },
                        { value: 100 },
                        { value: 250 }
                    ];
                    this.scope.numberOfPages = [{ value: 1 }];
                    this.scope.totalPages = 1;
                    this.scope.currentEntriesPerPage = this.scope.entriesPerPage[0];
                    this.scope.currentPageNumber = this.scope.numberOfPages[0];
                    this.scope.enteredChartListing = [];
                    this.scope.chartTypeList = [];
                    this.scope.listingIsLoading = false;
                    this.scope.addingNewChart = false;
                    this.scope.editingChart = false;
                    this.scope.addNewChartChartType = "";
                    this.scope.newChart = {
                        SubjectName: "",
                        SubjectLocation: "",
                        OriginDateTime: "",
                        OriginDateTimeUnknown: false,
                        ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                    };
                    this.scope.editChart = {
                        EnteredChartId: 0,
                        SubjectName: "",
                        SubjectLocation: "",
                        OriginDateTime: "",
                        OriginDateTimeUnknown: false,
                        ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                    };
                    //this.scope.SetUserId = ((id: any) => {
                    //    this.scope.userId = id;
                    //});
                    this.scope.OpenCreateNewChartForm = (function () {
                        var that = _this;
                        that.scope.addingNewChart = true;
                        that.scope.GetChartTypesList();
                        if (that.scope.ChartTypeList.length > 0)
                            that.scope.addNewChart.ChartType = that.scope.chartTypeList[0];
                    });
                    this.scope.CloseCreateNewChartForm = (function () {
                        var that = _this;
                        that.scope.addingNewChart = false;
                    });
                    this.scope.OpenEditChartForm = (function (id) {
                        var that = _this;
                        that.scope.editingChart = true;
                        that.scope.GetChartTypesList();
                        that.scope.GetEnteredChart(id);
                    });
                    this.scope.CloseEditChartForm = (function () {
                        var that = _this;
                        that.scope.editingChart = false;
                    });
                    this.scope.GetEnteredChartsListing = (function (entriesPerPageChanged) {
                        var that = _this;
                        that.scope.listingIsLoading = true;
                        if (entriesPerPageChanged)
                            that.scope.currentPageNumber = { value: 1 };
                        that.enteredChartsListingService
                            .getEnteredChartListing(that.scope.currentPageNumber.value, that.scope.currentEntriesPerPage.value)
                            .then(function (result) {
                            that.scope.enteredChartListing = result.data.Listing;
                            if (entriesPerPageChanged) {
                                that.scope.numberOfPages = [{ value: 1 }];
                                for (var i = 2; i <= result.data.TotalPages; i++) {
                                    that.scope.numberOfPages.push({ value: i });
                                }
                                that.scope.totalPages = result.data.TotalPages;
                            }
                        })
                            .finally(function () {
                            that.scope.listingIsLoading = false;
                            that.scope.entriesPerPageChanged = false;
                        });
                    });
                    this.scope.GetEnteredChart = (function (id) {
                        var that = _this;
                        that.enteredChartsListingService.getEnteredChart(id)
                            .then(function (result) {
                            that.scope.editChart = {
                                EnteredChartId: result.data.Chart.EnteredChartId,
                                SubjectName: result.data.Chart.SubjectName,
                                SubjectLocation: result.data.Chart.SubjectLocation,
                                OriginDateTime: result.data.Chart.OriginDateTimeString,
                                OriginDateTimeUnknown: result.data.Chart.OriginDateTimeUnknown,
                                ChartType: {
                                    ChartTypeId: result.data.Chart.ChartTypeId,
                                    ChartTypeName: result.data.Chart.ChartTypeName
                                }
                            };
                        });
                    });
                    this.scope.GetChartTypesList = (function () {
                        var that = _this;
                        if (that.scope.chartTypeList.length === 0) {
                            that.enteredChartsListingService.getChartTypesList()
                                .then(function (result) {
                                that.scope.chartTypeList = result.data.ChartTypes;
                            });
                        }
                    });
                    this.scope.AddNewChart = (function () {
                        var that = _this;
                        that.enteredChartsListingService
                            .addNewChart(that.scope.newChart.SubjectName, that.scope.newChart.SubjectLocation, that.scope.newChart.OriginDateTime, that.scope.newChart.OriginDateTimeUnknown, that.scope.newChart.ChartType.ChartTypeId)
                            .then(function (result) {
                            that.scope.errorMessage = CommonLibrary.successIcon + " " + result.data.Message;
                            that.scope.GetEnteredChartsListing(false);
                        })
                            .catch(function (result) {
                            that.scope.errorMessage = CommonLibrary.errorIcon + " " + result.data.ExceptionMessage;
                        })
                            .finally(function () {
                            _this.scope.newChart = {
                                SubjectName: "",
                                SubjectLocation: "",
                                OriginDateTime: "",
                                OriginDateTimeUnknown: false,
                                ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                            };
                            that.scope.addingNewChart = false;
                        });
                    });
                    this.scope.ConfirmChartEdit = (function () {
                        var that = _this;
                        that.enteredChartsListingService
                            .editChart(that.scope.editChart.EnteredChartId, that.scope.editChart.SubjectName, that.scope.editChart.SubjectLocation, that.scope.editChart.OriginDateTime, that.scope.editChart.OriginDateTimeUnknown, that.scope.editChart.ChartType.ChartTypeId)
                            .then(function (result) {
                            that.scope.errorMessage = CommonLibrary.successIcon + " " + result.data.Message;
                            that.scope.GetEnteredChartsListing(false);
                        })
                            .catch(function (result) {
                            that.scope.errorMessage = CommonLibrary.errorIcon + " " + result.data.ExceptionMessage;
                        })
                            .finally(function () {
                            _this.scope.editChart = {
                                EnteredChartId: 0,
                                SubjectName: "",
                                SubjectLocation: "",
                                OriginDateTime: "",
                                OriginDateTimeUnknown: false,
                                ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                            };
                            that.scope.editingChart = false;
                        });
                    });
                }
                return EnteredChartsListingController;
            }());
            Controllers.EnteredChartsListingController = EnteredChartsListingController;
        })(Controllers = Application.Controllers || (Application.Controllers = {}));
    })(Application = Core.Application || (Core.Application = {}));
})(Core || (Core = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi1saWJyYXJ5LnRzIiwiY29yZS50cyIsIkNvcmVTZXJ2aWNlcy50cyIsIkNvcmVEaXJlY3RpdmVzLnRzIiwiQ29yZUNvbnRyb2xsZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLElBQU8sYUFBYSxDQW1GbkI7QUFuRkQsV0FBTyxhQUFhLEVBQUMsQ0FBQztJQUNsQixhQUFhO0lBQ2IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLGlDQUFpQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNuRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUM7SUFFRixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztRQUNyQixJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDLENBQUE7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LEVBQUUsQ0FBQztnQ0FDakIsV0FBVyxFQUFFLEVBQUU7Z0NBQ2YsZUFBZSxFQUFFLEVBQUU7Z0NBQ25CLGNBQWMsRUFBRSxFQUFFO2dDQUNsQixxQkFBcUIsRUFBRSxLQUFLO2dDQUM1QixTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUU7NkJBQ3ZELENBQUE7NEJBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3dCQUNwQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNMLHFDQUFDO1lBQUQsQ0FsTUEsQUFrTUMsSUFBQTtZQWxNWSwwQ0FBOEIsaUNBa00xQyxDQUFBO1FBQ0wsQ0FBQyxFQXBNeUIsV0FBVyxHQUFYLHVCQUFXLEtBQVgsdUJBQVcsUUFvTXBDO0lBQUQsQ0FBQyxFQXBNYSxXQUFXLEdBQVgsZ0JBQVcsS0FBWCxnQkFBVyxRQW9NeEI7QUFDTCxDQUFDLEVBek1NLElBQUksS0FBSixJQUFJLFFBeU1WIiwiZmlsZSI6Im91dHNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBBcnJheTxUPiB7XHJcbiAgICBjb250YWlucyh2OiBhbnkpOiBhbnk7XHJcbiAgICB1bmlxdWUoKTogYW55O1xyXG59XHJcblxyXG5tb2R1bGUgQ29tbW9uTGlicmFyeSB7XHJcbiAgICAvLyBwcm90b3R5cGVzXHJcbiAgICBBcnJheS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzW2ldID09PSB2KSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXNbaV0pID09PSBKU09OLnN0cmluZ2lmeSh2KSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgQXJyYXkucHJvdG90eXBlLnVuaXF1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyOiBhbnkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFhcnIuY29udGFpbnModGhpc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RyaW5nIGxpdGVyYWxzXHJcbiAgICAvLyAtIGVycm9yIGljb25cclxuICAgIGV4cG9ydCB2YXIgZXJyb3JJY29uOiBzdHJpbmcgPSAnPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBlcnJvclwiPjwvc3Bhbj4nO1xyXG5cclxuICAgIC8vIC0gY2hlY2ttYXJrIGZvciBzdWNjZXNzIGljb25cclxuICAgIGV4cG9ydCB2YXIgc3VjY2Vzc0ljb246IHN0cmluZyA9ICc8c3BhbiBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZSBhY3Rpb24tc3VjY2Vzc2Z1bFwiPjwvc3Bhbj4nO1xyXG5cclxuICAgIC8vIC0gY29mZmVlIGljb24sIGJlY2F1c2Ugd2hvIGRvZXNuJ3QgbmVlZCBjb2ZmZWU/XHJcbiAgICBleHBvcnQgdmFyIGNvZmZlZUljb246IHN0cmluZyA9ICc8c3BhbiBjbGFzcz1cImZhIGZhLWNvZmZlZSBjb2ZmZWVcIj48L3NwYW4+JztcclxuXHJcbiAgICAvLyAtIG1vbWVudCBzdHJpbmcgZm9ybWF0IGZvciBkYXRlL3RpbWVzLlxyXG4gICAgZXhwb3J0IHZhciBtb21lbnRGb3JtYXQ6IHN0cmluZyA9IFwiTU0vREQvWVlZWSBISDptbVwiO1xyXG5cclxuICAgIC8vIFRleHRMYWJlbCBjbGFzcy5cclxuICAgIGV4cG9ydCBjbGFzcyBUZXh0TGFiZWwge1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHNlbGYudmFsdWUgPSBuYW1lLnJlcGxhY2UoL1xccy9nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZXMgYSBsaXN0IG9mIHRleHRsYWJlbHNcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDcmVhdGVUZXh0TGFiZWxMaXN0KG5hbWVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHJldHVybiBuYW1lcy5tYXAoKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBUZXh0TGFiZWwobmFtZSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgaXMgd2l0aGluIGEgbnVtZXJpY2FsIHJhbmdlLCBpbmNsdXNpdmUuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXNJblJhbmdlKHZhbHVlOiBhbnksIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgICAgIC8vIElmIGVpdGhlciBtaW4gb3IgbWF4IGlzIG51bGwvdW5kZWZpbmVkLCBvciBpZiBtaW4gaXMgZ3JlYXRlciB0aGFuIG1heCwgb3IgaWYgdGhlIHZhbHVlIGlzIFxyXG4gICAgICAgIC8vIG5vdCBhIG51bWJlciwgaXQgaXMgbm90IGluIHJhbmdlLlxyXG4gICAgICAgIGlmICgoSXNOdWxsT3JVbmRlZmluZWQobWluKSB8fCBJc051bGxPclVuZGVmaW5lZChtYXgpKSB8fCAobWluID4gbWF4KSB8fCBpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcGFyc2UgdGhlIGludGVnZXIgdmFsdWUuXHJcbiAgICAgICAgdmFyIGludFZhbDogYW55ID0gcGFyc2VJbnQodmFsdWUpO1xyXG5cclxuICAgICAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIGFzIGFuIGludGVnZXIgaXMgd2l0aGluIHRoZSByYW5nZSwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICAgIHJldHVybiAoKGludFZhbCA+PSBtaW4pID09PSAoaW50VmFsIDw9IG1heCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrcyB3aGV0aGVyIGEgZ2l2ZW4gdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXNOdWxsT3JVbmRlZmluZWQodmFsOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIHx8IHZhbCA9PT0gbnVsbCk7XHJcbiAgICB9IFxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSYW5kb21JbnRlZ2VyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pbik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvbnZlcnRTZWNvbmRzVG9Ib3Vyc01pbnV0ZXNTZWNvbmRzKGluU2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShudWxsKTtcclxuICAgICAgICBkYXRlLnNldFNlY29uZHMoaW5TZWNvbmRzKTtcclxuICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XHJcblxyXG4gICAgICAgIC8vdmFyIG91dFNlY29uZHMgPSBpblNlY29uZHMgJSA2MDtcclxuICAgICAgICAvL3ZhciBvdXRNaW51dGVzID0gTWF0aC5mbG9vcihpblNlY29uZHMgLyA2MCkgJSA2MDtcclxuICAgICAgICAvL3ZhciBvdXRIb3VycyA9IE1hdGguZmxvb3IoaW5TZWNvbmRzIC8gMzYwMClcclxuICAgICAgICAvL3JldHVybiBvdXRIb3VycyArIFwiOlwiICsgb3V0TWludXRlcyArIFwiOlwiICsgb3V0U2Vjb25kcztcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2pxdWVyeS9qcXVlcnkuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL2pxdWVyeXVpL2pxdWVyeXVpLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9ib290c3RyYXAvYm9vdHN0cmFwLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9hbmd1bGFyanMvYW5ndWxhci5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvYW5ndWxhcmpzL2FuZ3VsYXItYW5pbWF0ZS5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGluZ3MvYW5ndWxhci11aS1ib290c3RyYXAvYW5ndWxhci11aS1ib290c3RyYXAuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL21vbWVudC9tb21lbnQuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBpbmdzL21vbWVudC10aW1lem9uZS9tb21lbnQtdGltZXpvbmUuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24tbGlicmFyeS50c1wiIC8+XHJcblxyXG5tb2R1bGUgQ29yZSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvLyBBbmd1bGFyIGFwcGxpY2F0aW9uIHNldHVwXHJcbiAgICBleHBvcnQgdmFyIGFwcE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiYXN0cm9nZWFyc1wiLCBbXCJuZ0FuaW1hdGVcIiwgXCJuZ1Nhbml0aXplXCJdKTtcclxuXHJcbiAgICAvLyBzZXR1cDogQW5ndWxhciBjb250cm9sbGVyc1xyXG4gICAgYXBwTW9kdWxlLmNvbnRyb2xsZXIoXCJlbnRlcmVkQ2hhcnRzTGlzdGluZ0NvbnRyb2xsZXJcIixcclxuICAgIFtcclxuICAgICAgICBcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIiwgXCJlbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2VcIixcclxuICAgICAgICAoJHNjb3BlOiBhbnksICRmaWx0ZXI6IGFueSwgZW50ZXJlZENoYXJ0c0xpc3RpbmdTZXJ2aWNlOiBhbnkpID0+IG5ldyBBcHBsaWNhdGlvbi5Db250cm9sbGVyc1xyXG4gICAgICAgIC5FbnRlcmVkQ2hhcnRzTGlzdGluZ0NvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBlbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2UpXHJcbiAgICBdKTtcclxuXHJcbiAgICAvLyBzZXR1cDogQW5ndWxhciBTZXJ2aWNlc1xyXG4gICAgYXBwTW9kdWxlLmZhY3RvcnkoXCJlbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2VcIixcclxuICAgIFtcclxuICAgICAgICBcIiRodHRwXCIsIFwiJGxvY2F0aW9uXCIsICgkaHR0cDogYW55LCAkbG9jYXRpb246IGFueSkgPT4gbmV3IEFwcGxpY2F0aW9uLlNlcnZpY2VzXHJcbiAgICAgICAgLkVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZSgkaHR0cCwgJGxvY2F0aW9uKVxyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gc2V0dXA6IEFuZ3VsYXIgRGlyZWN0aXZlc1xyXG4gICAgYXBwTW9kdWxlLmRpcmVjdGl2ZShcImFkZE5ld0VudGVyZWRDaGFydE1vZGFsXCIsIFtcIiRjb21waWxlXCIsICgkY29tcGlsZTogYW55KSA9PiBuZXcgQXBwbGljYXRpb24uRGlyZWN0aXZlcy5BZGROZXdFbnRlcmVkQ2hhcnRNb2RhbCgkY29tcGlsZSldKTtcclxuXHJcbiAgICBhcHBNb2R1bGUuZGlyZWN0aXZlKFwiZWRpdEVudGVyZWRDaGFydE1vZGFsXCIsIFtcIiRjb21waWxlXCIsICgkY29tcGlsZTogYW55KSA9PiBuZXcgQXBwbGljYXRpb24uRGlyZWN0aXZlcy5FZGl0RW50ZXJlZENoYXJ0TW9kYWwoJGNvbXBpbGUpXSk7XHJcblxyXG59IiwiLypcclxuQ3JlYXRlZCBieTogSm9uIFJ1c3NlbGwgKGpydXNzZWxsQG5vZGVvbWVnYS5jb20pXHJcbiovXHJcblxyXG5tb2R1bGUgQ29yZSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvLyBhbmd1bGFyIGFwcCBzZXJ2aWNlcy5cclxuICAgIGV4cG9ydCBtb2R1bGUgQXBwbGljYXRpb24uU2VydmljZXMge1xyXG4gICAgICAgIGV4cG9ydCBpbnRlcmZhY2UgSUVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZSB7XHJcbiAgICAgICAgICAgIGdldEVudGVyZWRDaGFydExpc3RpbmcocGFnZU51bWJlcjogbnVtYmVyLCBlbnRyaWVzUGVyUGFnZTogbnVtYmVyKTogYW55O1xyXG4gICAgICAgICAgICBnZXRFbnRlcmVkQ2hhcnQoaWQ6IG51bWJlcik6IGFueTtcclxuICAgICAgICAgICAgZ2V0Q2hhcnRUeXBlc0xpc3QoKTogYW55O1xyXG4gICAgICAgICAgICBhZGROZXdDaGFydChzdWJqZWN0TmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgc3ViamVjdExvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5EYXRlVGltZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luRGF0ZVRpbWVVbmtub3duOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgY2hhcnRUeXBlSWQ6IG51bWJlcik6IGFueTtcclxuICAgICAgICAgICAgZWRpdENoYXJ0KGVudGVyZWRDaGFydElkOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0TmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgc3ViamVjdExvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5EYXRlVGltZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luRGF0ZVRpbWVVbmtub3duOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgY2hhcnRUeXBlSWQ6IG51bWJlcik6IGFueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBFbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2Uge1xyXG4gICAgICAgICAgICBodHRwOiBuZy5JSHR0cFNlcnZpY2U7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlO1xyXG5cclxuICAgICAgICAgICAgY29uc3RydWN0b3IoJGh0dHA6IG5nLklIdHRwU2VydmljZSwgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHAgPSAkaHR0cDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSAkbG9jYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEVudGVyZWRDaGFydExpc3RpbmcocGFnZU51bWJlcjogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZW50cmllc1BlclBhZ2U6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvYXBpL0VudGVyZWRDaGFydHNBcGkvR2V0RW50ZXJlZENoYXJ0c0xpc3RpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhZ2VOdW1iZXI6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVudHJpZXNQZXJQYWdlOiBlbnRyaWVzUGVyUGFnZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEVudGVyZWRDaGFydChpZDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9hcGkvRW50ZXJlZENoYXJ0c0FwaS9HZXRFbnRlcmVkQ2hhcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElkOiBpZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0Q2hhcnRUeXBlc0xpc3QoKTogYW55IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9hcGkvQ2hhcnRUeXBlc0FwaS9HZXRDaGFydFR5cGVzTGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGROZXdDaGFydChzdWJqZWN0TmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgc3ViamVjdExvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvcmlnaW5EYXRlVGltZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luRGF0ZVRpbWVVbmtub3duOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgY2hhcnRUeXBlSWQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvYXBpL0VudGVyZWRDaGFydHNBcGkvQWRkTmV3Q2hhcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1YmplY3ROYW1lOiBzdWJqZWN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3ViamVjdExvY2F0aW9uOiBzdWJqZWN0TG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9yaWdpbkRhdGVUaW1lOiBvcmlnaW5EYXRlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiBvcmlnaW5EYXRlVGltZVVua25vd24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYXJ0VHlwZUlkOiBjaGFydFR5cGVJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVkaXRDaGFydChlbnRlcmVkQ2hhcnRJZDogbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgc3ViamVjdE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHN1YmplY3RMb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luRGF0ZVRpbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbkRhdGVUaW1lVW5rbm93bjogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIGNoYXJ0VHlwZUlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2FwaS9FbnRlcmVkQ2hhcnRzQXBpL0VkaXRDaGFydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXJlZENoYXJ0SWQ6IGVudGVyZWRDaGFydElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TmFtZTogc3ViamVjdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1YmplY3RMb2NhdGlvbjogc3ViamVjdExvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPcmlnaW5EYXRlVGltZTogb3JpZ2luRGF0ZVRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9yaWdpbkRhdGVUaW1lVW5rbm93bjogb3JpZ2luRGF0ZVRpbWVVbmtub3duLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFydFR5cGVJZDogY2hhcnRUeXBlSWRcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLypcclxuQ3JlYXRlZCBieTogSm9uIFJ1c3NlbGwgKHYtam9ydXMpXHJcbiovXHJcblxyXG5tb2R1bGUgQ29yZSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvLyBhbmd1bGFyIGFwcCBkaXJlY3RpdmVzLlxyXG4gICAgZXhwb3J0IG1vZHVsZSBBcHBsaWNhdGlvbi5EaXJlY3RpdmVzIHtcclxuICAgICAgICBleHBvcnQgY2xhc3MgQWRkTmV3RW50ZXJlZENoYXJ0TW9kYWwge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcigkY29tcGlsZTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEaXJlY3RpdmUoJGNvbXBpbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIGNyZWF0ZURpcmVjdGl2ZSgkY29tcGlsZTogYW55KTogYW55IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsOiBcIj1tb2RhbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAoc2NvcGU6IGFueSwgZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnbW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbnkgdGltZSB0aGUgZGF0YSBjaGFuZ2VzLCByZXJlbmRlciB3aXRoIHRoZSBmcmVzaCBkYXRhLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY29wZS5yZW5kZXIoc2NvcGUubW9kYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld3N0YXRlID0gc2NvcGUubW9kYWwgPyBcInNob3dcIiA6IFwiaGlkZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlbigpLm1vZGFsKG5ld3N0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL0RpcmVjdGl2ZVRlbXBsYXRlcy9BZGROZXdFbnRlcmVkQ2hhcnQuaHRtbFwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBtb2R1bGUgQXBwbGljYXRpb24uRGlyZWN0aXZlcyB7XHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIEVkaXRFbnRlcmVkQ2hhcnRNb2RhbCB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKCRjb21waWxlOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURpcmVjdGl2ZSgkY29tcGlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0aXZlKCRjb21waWxlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0cmljdDogXCJFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWw6IFwiPW1vZGFsXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IChzY29wZTogYW55LCBlbGVtZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdtb2RhbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFueSB0aW1lIHRoZSBkYXRhIGNoYW5nZXMsIHJlcmVuZGVyIHdpdGggdGhlIGZyZXNoIGRhdGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Njb3BlLnJlbmRlcihzY29wZS5tb2RhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3c3RhdGUgPSBzY29wZS5tb2RhbCA/IFwic2hvd1wiIDogXCJoaWRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkcmVuKCkubW9kYWwobmV3c3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvRGlyZWN0aXZlVGVtcGxhdGVzL0VkaXRFbnRlcmVkQ2hhcnQuaHRtbFwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvcmVzZXJ2aWNlcy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb3JlZGlyZWN0aXZlcy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb3JlLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8vIGNvbnRyb2xsZXJzIGZvciB0aGUgQW5ndWxhckpTIGFwcC5cclxuICAgIGV4cG9ydCBtb2R1bGUgQXBwbGljYXRpb24uQ29udHJvbGxlcnMge1xyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBFbnRlcmVkQ2hhcnRzTGlzdGluZ0NvbnRyb2xsZXIge1xyXG4gICAgICAgICAgICBzY29wZTogYW55O1xyXG4gICAgICAgICAgICBmaWx0ZXI6IGFueTtcclxuICAgICAgICAgICAgZGlhbG9nOiBhbnk7XHJcbiAgICAgICAgICAgIGVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZTogU2VydmljZXMuSUVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZTtcclxuICAgICAgICAgICAgZGF0YTogYW55O1xyXG5cclxuICAgICAgICAgICAgY29uc3RydWN0b3IoJHNjb3BlOiBuZy5JU2NvcGUsXHJcbiAgICAgICAgICAgICAgICAkZmlsdGVyOiBuZy5JRmlsdGVyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIGVudGVyZWRDaGFydExpc3RpbmdTZXJ2aWNlOiBTZXJ2aWNlcy5JRW50ZXJlZENoYXJ0c0xpc3RpbmdTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSAkZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2UgPSBlbnRlcmVkQ2hhcnRMaXN0aW5nU2VydmljZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuZXJyb3JNZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmVudHJpZXNQZXJQYWdlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMjUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiA1MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDI1MCB9XHJcbiAgICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUubnVtYmVyT2ZQYWdlcyA9IFt7IHZhbHVlOiAxIH1dO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS50b3RhbFBhZ2VzID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuY3VycmVudEVudHJpZXNQZXJQYWdlID0gdGhpcy5zY29wZS5lbnRyaWVzUGVyUGFnZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuY3VycmVudFBhZ2VOdW1iZXIgPSB0aGlzLnNjb3BlLm51bWJlck9mUGFnZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5lbnRlcmVkQ2hhcnRMaXN0aW5nID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmNoYXJ0VHlwZUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmxpc3RpbmdJc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmFkZGluZ05ld0NoYXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmVkaXRpbmdDaGFydCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuYWRkTmV3Q2hhcnRDaGFydFR5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5uZXdDaGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TG9jYXRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBDaGFydFR5cGU6IHsgQ2hhcnRUeXBlSWQ6IDAsIENoYXJ0VHlwZU5hbWU6IFwiTlVMTFwiIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmVkaXRDaGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBFbnRlcmVkQ2hhcnRJZDogMCxcclxuICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TG9jYXRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBDaGFydFR5cGU6IHsgQ2hhcnRUeXBlSWQ6IDAsIENoYXJ0VHlwZU5hbWU6IFwiTlVMTFwiIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2NvcGUuU2V0VXNlcklkID0gKChpZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLnNjb3BlLnVzZXJJZCA9IGlkO1xyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLk9wZW5DcmVhdGVOZXdDaGFydEZvcm0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmFkZGluZ05ld0NoYXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLkdldENoYXJ0VHlwZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc2NvcGUuQ2hhcnRUeXBlTGlzdC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmFkZE5ld0NoYXJ0LkNoYXJ0VHlwZSA9IHRoYXQuc2NvcGUuY2hhcnRUeXBlTGlzdFswXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuQ2xvc2VDcmVhdGVOZXdDaGFydEZvcm0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmFkZGluZ05ld0NoYXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLk9wZW5FZGl0Q2hhcnRGb3JtID0gKChpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZWRpdGluZ0NoYXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLkdldENoYXJ0VHlwZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5HZXRFbnRlcmVkQ2hhcnQoaWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5DbG9zZUVkaXRDaGFydEZvcm0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmVkaXRpbmdDaGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29wZS5HZXRFbnRlcmVkQ2hhcnRzTGlzdGluZyA9ICgoZW50cmllc1BlclBhZ2VDaGFuZ2VkOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUubGlzdGluZ0lzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXNQZXJQYWdlQ2hhbmdlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5jdXJyZW50UGFnZU51bWJlciA9IHsgdmFsdWU6IDEgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVudGVyZWRDaGFydExpc3RpbmcodGhhdC5zY29wZS5jdXJyZW50UGFnZU51bWJlci52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuY3VycmVudEVudHJpZXNQZXJQYWdlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZW50ZXJlZENoYXJ0TGlzdGluZyA9IHJlc3VsdC5kYXRhLkxpc3Rpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllc1BlclBhZ2VDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5udW1iZXJPZlBhZ2VzID0gW3sgdmFsdWU6IDEgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPD0gcmVzdWx0LmRhdGEuVG90YWxQYWdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUubnVtYmVyT2ZQYWdlcy5wdXNoKHsgdmFsdWU6IGkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUudG90YWxQYWdlcyA9IHJlc3VsdC5kYXRhLlRvdGFsUGFnZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUubGlzdGluZ0lzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5lbnRyaWVzUGVyUGFnZUNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLkdldEVudGVyZWRDaGFydCA9ICgoaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZS5nZXRFbnRlcmVkQ2hhcnQoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5lZGl0Q2hhcnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW50ZXJlZENoYXJ0SWQ6IHJlc3VsdC5kYXRhLkNoYXJ0LkVudGVyZWRDaGFydElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1YmplY3ROYW1lOiByZXN1bHQuZGF0YS5DaGFydC5TdWJqZWN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TG9jYXRpb246IHJlc3VsdC5kYXRhLkNoYXJ0LlN1YmplY3RMb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcmlnaW5EYXRlVGltZTogcmVzdWx0LmRhdGEuQ2hhcnQuT3JpZ2luRGF0ZVRpbWVTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiByZXN1bHQuZGF0YS5DaGFydC5PcmlnaW5EYXRlVGltZVVua25vd24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhcnRUeXBlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYXJ0VHlwZUlkOiByZXN1bHQuZGF0YS5DaGFydC5DaGFydFR5cGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhcnRUeXBlTmFtZTogcmVzdWx0LmRhdGEuQ2hhcnQuQ2hhcnRUeXBlTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLkdldENoYXJ0VHlwZXNMaXN0ID0gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc2NvcGUuY2hhcnRUeXBlTGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbnRlcmVkQ2hhcnRzTGlzdGluZ1NlcnZpY2UuZ2V0Q2hhcnRUeXBlc0xpc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5jaGFydFR5cGVMaXN0ID0gcmVzdWx0LmRhdGEuQ2hhcnRUeXBlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGUuQWRkTmV3Q2hhcnQgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTmV3Q2hhcnQodGhhdC5zY29wZS5uZXdDaGFydC5TdWJqZWN0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUubmV3Q2hhcnQuU3ViamVjdExvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5uZXdDaGFydC5PcmlnaW5EYXRlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUubmV3Q2hhcnQuT3JpZ2luRGF0ZVRpbWVVbmtub3duLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5uZXdDaGFydC5DaGFydFR5cGUuQ2hhcnRUeXBlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5lcnJvck1lc3NhZ2UgPSBgJHtDb21tb25MaWJyYXJ5LnN1Y2Nlc3NJY29ufSAke3Jlc3VsdC5kYXRhLk1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuR2V0RW50ZXJlZENoYXJ0c0xpc3RpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmVycm9yTWVzc2FnZSA9IGAke0NvbW1vbkxpYnJhcnkuZXJyb3JJY29ufSAke3Jlc3VsdC5kYXRhLkV4Y2VwdGlvbk1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29wZS5uZXdDaGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TG9jYXRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFydFR5cGU6IHsgQ2hhcnRUeXBlSWQ6IDAsIENoYXJ0VHlwZU5hbWU6IFwiTlVMTFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuYWRkaW5nTmV3Q2hhcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLkNvbmZpcm1DaGFydEVkaXQgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVudGVyZWRDaGFydHNMaXN0aW5nU2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZWRpdENoYXJ0KHRoYXQuc2NvcGUuZWRpdENoYXJ0LkVudGVyZWRDaGFydElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5lZGl0Q2hhcnQuU3ViamVjdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmVkaXRDaGFydC5TdWJqZWN0TG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmVkaXRDaGFydC5PcmlnaW5EYXRlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZWRpdENoYXJ0Lk9yaWdpbkRhdGVUaW1lVW5rbm93bixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZWRpdENoYXJ0LkNoYXJ0VHlwZS5DaGFydFR5cGVJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjb3BlLmVycm9yTWVzc2FnZSA9IGAke0NvbW1vbkxpYnJhcnkuc3VjY2Vzc0ljb259ICR7cmVzdWx0LmRhdGEuTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY29wZS5HZXRFbnRlcmVkQ2hhcnRzTGlzdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZXJyb3JNZXNzYWdlID0gYCR7Q29tbW9uTGlicmFyeS5lcnJvckljb259ICR7cmVzdWx0LmRhdGEuRXhjZXB0aW9uTWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3BlLmVkaXRDaGFydCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlcmVkQ2hhcnRJZDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TmFtZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdWJqZWN0TG9jYXRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3JpZ2luRGF0ZVRpbWVVbmtub3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFydFR5cGU6IHsgQ2hhcnRUeXBlSWQ6IDAsIENoYXJ0VHlwZU5hbWU6IFwiTlVMTFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NvcGUuZWRpdGluZ0NoYXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
