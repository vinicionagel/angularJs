angular.module("listaTelefonica").directive("uiTelefone", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            const _formatDate = function (telefone) {
                telefone = telefone.replace(/[^0-9]+/g,"");
                if (telefone.length > 5) {
                    telefone = telefone.substring(0,5) + "-" + telefone.substring(5);
                }
                if (telefone.length > 9) {
                    telefone = telefone.substring(0,10);
                }
                return telefone;
            }
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
            });
            ctrl.$parsers.push(function (value) {
                if (value.length === 10) {
                    return value;
                }
            });
        }
    };
});