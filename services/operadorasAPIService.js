angular.module("listaTelefonica").service("operadorasApi", function ($http, config) {
    this.getOperadoras = function () {
        return $http.get(`${config.baseUrl}/operadoras`);
    }
})