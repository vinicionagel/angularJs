angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, contatosApi, operadorasApi, serialGenerator) {
    $scope.direcaoOrdenacao = false;
    $scope.criterioOrdernacao = 'nome';
    $scope.app = "Lista telefonica"
    $scope.dado = {
        data : new Date().getTime()
    }
    let carregarDados = function () {
        contatosApi.getContatos().then(function (response) {
            $scope.dados = response.data;
        }, function (data) {
            $scope.error = "Não foi possivel carregar os dados"
        });
    };
    let carregarOperadoras = function () {
        operadorasApi.getOperadoras().then(function (response) {
            $scope.operadoras = response.data;
        });
    }
    console.log(serialGenerator.generate());
    carregarDados();
    carregarOperadoras();

    $scope.adicionarContato = function (dado) {

        dado.serial = serialGenerator.generate();
        console.log(dado.serial)
        contatosApi.saveContatos(dado).then(function (response) {
            delete $scope.dado;
            $scope.contatoForm.$setPristine();
            carregarDados();
        });
    }

    $scope.apagarContato = function (contatos) {
        $scope.dados = contatos.filter(contato => !contato.selecionado)
        $scope.selecionarTodos = false;
    }

    $scope.selecionarTodosContatos = function (contatos, selecionarTodos) {
        contatos.forEach(contato => contato.selecionado = !selecionarTodos)
    }

    $scope.possuiDadoSelecionado = function (contatos) {
        if (contatos) {
            return !contatos.some(contato => contato.selecionado)
        }
    }
    $scope.orderPor = function (nomeCampo) {
        $scope.criterioOrdernacao = nomeCampo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    }
})