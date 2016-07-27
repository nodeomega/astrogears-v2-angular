/*
Created by: Jon Russell (v-jorus)
*/

module Core {
    "use strict";

    // angular app directives.
    export module Application.Directives {
        export class AddNewEnteredChartModal {
            constructor($compile: any) {
                return this.createDirective($compile);
            }

            private createDirective($compile: any): any {
                return {
                    restrict: "E",
                    replace: false,
                    scope: {
                        modal: "=modal"
                    },
                    link: (scope: any, element: any) => {
                        scope.$watch('modal', () => {
                            // any time the data changes, rerender with the fresh data.
                            //scope.render(scope.modal);
                            var newstate = scope.modal ? "show" : "hide";
                            element.children().modal(newstate);
                        }, false);
                    },
                    templateUrl: "/DirectiveTemplates/AddNewEnteredChart.html"
                };
            }
        }
    }

    export module Application.Directives {
        export class EditEnteredChartModal {
            constructor($compile: any) {
                return this.createDirective($compile);
            }

            private createDirective($compile: any): any {
                return {
                    restrict: "E",
                    replace: false,
                    scope: {
                        modal: "=modal"
                    },
                    link: (scope: any, element: any) => {
                        scope.$watch('modal', () => {
                            // any time the data changes, rerender with the fresh data.
                            //scope.render(scope.modal);
                            var newstate = scope.modal ? "show" : "hide";
                            element.children().modal(newstate);
                        }, false);
                    },
                    templateUrl: "/DirectiveTemplates/EditEnteredChart.html"
                };
            }
        }
    }
}