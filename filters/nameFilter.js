angular.module("listaTelefonica").filter("name", function () {
    return function (input) {
        const listaNomes = input.split(" ");
        return listaNomes.map(function (value) {
            if (/(da|de)/.test(value)) {
                return value.toLowerCase();
            }
            return value.charAt(0).toUpperCase() + value.substring(1, value.length).toLowerCase();
        }).join(" ");
    }
})