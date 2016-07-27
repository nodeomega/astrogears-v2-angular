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
//# sourceMappingURL=coreservices.js.map