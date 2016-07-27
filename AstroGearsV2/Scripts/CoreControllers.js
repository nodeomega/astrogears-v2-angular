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
//# sourceMappingURL=CoreControllers.js.map