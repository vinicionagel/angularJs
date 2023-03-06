angular.module("listaTelefonica").controller("novoContatoController", function ($scope, contatosApi, serialGenerator, $location, operadoras) {
    $scope.operadoras = operadoras.data;
    $scope.adicionarContato = function (dado) {
        dado.serial = serialGenerator.generate();
        contatosApi.saveContatos(dado).then(function (response) {
            delete $scope.dado;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos")
        });
    };
})