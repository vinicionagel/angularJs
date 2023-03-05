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
    carregarDados();
    carregarOperadoras();

    $scope.adicionarContato = function (dado) {

        dado.serial = serialGenerator.generate();
        contatosApi.saveContatos(dado).then(function (response) {
            delete $scope.dado;
            $scope.contatoForm.$setPristine();
            carregarDados();
        });
    }

    $scope.apagarContato = function (contatos) {
        const seriaisSelecionados = contatos.filter(contato => contato.selecionado).map(contatos => contatos.serial);
        contatosApi.deleteContato(seriaisSelecionados).then(function (response) {
            $scope.selecionarTodos = false;
            carregarDados();
        });
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