angular.module("uiAccordions", []);

angular.module("uiAccordions").run(function ($templateCache) {
    console.log($templateCache)
    $templateCache.put("view/accordion.html", `
     <div class="ui-accordion-title" ng-click="open()">{{title}}</div> 
     <div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>`)
})
angular.module("uiAccordions").directive("uiAccordions", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            const accordions = []

            this.registerAccordion = function (accordion) {
                accordions.push(accordion);
            }
            this.closeAll = function () {
                accordions.forEach(value => value.isOpened = false);
            }
        }   
    };
});

angular.module("uiAccordions").directive("uiAccordion", function () {
    return {
        templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl) {
            ctrl.registerAccordion(scope);
            scope.open = function () {
                if (scope.isOpened) {
                    scope.isOpened = false;
                    return;
                }
                ctrl.closeAll();
                scope.isOpened = !scope.isOpened;
            };
        }
    };
});