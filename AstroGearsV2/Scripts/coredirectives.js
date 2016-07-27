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
//# sourceMappingURL=coredirectives.js.map