/*
Created by: Jon Russell (jrussell@nodeomega.com)
*/

module Core {
    "use strict";

    // angular app services.
    export module Application.Services {
        export interface IEnteredChartsListingService {
            getEnteredChartListing(pageNumber: number, entriesPerPage: number): any;
            getEnteredChart(id: number): any;
            getChartTypesList(): any;
            addNewChart(subjectName: string,
                subjectLocation: string,
                originDateTime: string,
                originDateTimeUnknown: boolean,
                chartTypeId: number): any;
            editChart(enteredChartId: number,
                subjectName: string,
                subjectLocation: string,
                originDateTime: string,
                originDateTimeUnknown: boolean,
                chartTypeId: number): any;
        }

        export class EnteredChartsListingService {
            http: ng.IHttpService;
            location: ng.ILocationService;

            constructor($http: ng.IHttpService, $location: ng.ILocationService) {
                this.http = $http;
                this.location = $location;
            }

            getEnteredChartListing(pageNumber: number,
                entriesPerPage: number): any {
                return this.http({
                    method: "POST",
                    url: "/api/EnteredChartsApi/GetEnteredChartsListing",
                    data: {
                        PageNumber: pageNumber,
                        EntriesPerPage: entriesPerPage
                    },
                    headers: { 'Content-Type': "application/json" }
                });
            }

            getEnteredChart(id: number): any {
                return this.http({
                    method: "POST",
                    url: "/api/EnteredChartsApi/GetEnteredChart",
                    data: {
                        Id: id
                    },
                    headers: { 'Content-Type': "application/json" }
                });
            }
            getChartTypesList(): any {
                return this.http({
                    method: "POST",
                    url: "/api/ChartTypesApi/GetChartTypesList",
                    headers: { 'Content-Type': "application/json" }
                });
            }

            addNewChart(subjectName: string,
                subjectLocation: string,
                originDateTime: string,
                originDateTimeUnknown: boolean,
                chartTypeId: number): any {
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
            }

            editChart(enteredChartId: number,
                subjectName: string,
                subjectLocation: string,
                originDateTime: string,
                originDateTimeUnknown: boolean,
                chartTypeId: number): any {
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
            }
        }
    }
}