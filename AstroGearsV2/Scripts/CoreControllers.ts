/// <reference path="coreservices.ts" />
/// <reference path="coredirectives.ts" />
/// <reference path="core.ts" />

module Core {
    "use strict";

    // controllers for the AngularJS app.
    export module Application.Controllers {
        export class EnteredChartsListingController {
            scope: any;
            filter: any;
            dialog: any;
            enteredChartsListingService: Services.IEnteredChartsListingService;
            data: any;

            constructor($scope: ng.IScope,
                $filter: ng.IFilterService,
                enteredChartListingService: Services.IEnteredChartsListingService) {
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
                }

                this.scope.editChart = {
                    EnteredChartId: 0,
                    SubjectName: "",
                    SubjectLocation: "",
                    OriginDateTime: "",
                    OriginDateTimeUnknown: false,
                    ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                }

                //this.scope.SetUserId = ((id: any) => {
                //    this.scope.userId = id;
                //});

                this.scope.OpenCreateNewChartForm = (() => {
                    var that = this;
                    that.scope.addingNewChart = true;
                    that.scope.GetChartTypesList();
                    if (that.scope.ChartTypeList.length > 0)
                        that.scope.addNewChart.ChartType = that.scope.chartTypeList[0];
                });

                this.scope.CloseCreateNewChartForm = (() => {
                    var that = this;
                    that.scope.addingNewChart = false;
                });

                this.scope.OpenEditChartForm = ((id: number) => {
                    var that = this;
                    that.scope.editingChart = true;
                    that.scope.GetChartTypesList();
                    that.scope.GetEnteredChart(id);
                });

                this.scope.CloseEditChartForm = (() => {
                    var that = this;
                    that.scope.editingChart = false;
                });

                this.scope.GetEnteredChartsListing = ((entriesPerPageChanged: boolean) => {
                    var that = this;
                    that.scope.listingIsLoading = true;
                    if (entriesPerPageChanged)
                        that.scope.currentPageNumber = { value: 1 };

                    that.enteredChartsListingService
                        .getEnteredChartListing(that.scope.currentPageNumber.value,
                            that.scope.currentEntriesPerPage.value)
                        .then((result: any) => {
                            that.scope.enteredChartListing = result.data.Listing;
                            if (entriesPerPageChanged) {
                                that.scope.numberOfPages = [{ value: 1 }];
                                for (let i = 2; i <= result.data.TotalPages; i++) {
                                    that.scope.numberOfPages.push({ value: i });
                                }
                                that.scope.totalPages = result.data.TotalPages;
                            }
                        })
                        .finally(() => {
                            that.scope.listingIsLoading = false;
                            that.scope.entriesPerPageChanged = false;
                        });
                });

                this.scope.GetEnteredChart = ((id: number) => {
                    var that = this;
                    that.enteredChartsListingService.getEnteredChart(id)
                        .then((result: any) => {
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
                            }
                        });
                });

                this.scope.GetChartTypesList = (() => {
                    var that = this;
                    if (that.scope.chartTypeList.length === 0) {
                        that.enteredChartsListingService.getChartTypesList()
                            .then((result: any) => {
                                that.scope.chartTypeList = result.data.ChartTypes;
                            });
                    }
                });

                this.scope.AddNewChart = (() => {
                    var that = this;
                    that.enteredChartsListingService
                        .addNewChart(that.scope.newChart.SubjectName,
                            that.scope.newChart.SubjectLocation,
                            that.scope.newChart.OriginDateTime,
                            that.scope.newChart.OriginDateTimeUnknown,
                            that.scope.newChart.ChartType.ChartTypeId)
                        .then((result: any) => {
                            that.scope.errorMessage = `${CommonLibrary.successIcon} ${result.data.Message}`;
                            that.scope.GetEnteredChartsListing(false);
                        })
                        .catch((result: any) => {
                            that.scope.errorMessage = `${CommonLibrary.errorIcon} ${result.data.ExceptionMessage}`;
                        })
                        .finally(() => {
                            this.scope.newChart = {
                                SubjectName: "",
                                SubjectLocation: "",
                                OriginDateTime: "",
                                OriginDateTimeUnknown: false,
                                ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                            }
                            that.scope.addingNewChart = false;
                        });
                });

                this.scope.ConfirmChartEdit = (() => {
                    var that = this;
                    that.enteredChartsListingService
                        .editChart(that.scope.editChart.EnteredChartId,
                            that.scope.editChart.SubjectName,
                            that.scope.editChart.SubjectLocation,
                            that.scope.editChart.OriginDateTime,
                            that.scope.editChart.OriginDateTimeUnknown,
                            that.scope.editChart.ChartType.ChartTypeId)
                        .then((result: any) => {
                            that.scope.errorMessage = `${CommonLibrary.successIcon} ${result.data.Message}`;
                            that.scope.GetEnteredChartsListing(false);
                        })
                        .catch((result: any) => {
                            that.scope.errorMessage = `${CommonLibrary.errorIcon} ${result.data.ExceptionMessage}`;
                        })
                        .finally(() => {
                            this.scope.editChart = {
                                EnteredChartId: 0,
                                SubjectName: "",
                                SubjectLocation: "",
                                OriginDateTime: "",
                                OriginDateTimeUnknown: false,
                                ChartType: { ChartTypeId: 0, ChartTypeName: "NULL" }
                            }
                            that.scope.editingChart = false;
                        });
                });
            }
        }
    }
}