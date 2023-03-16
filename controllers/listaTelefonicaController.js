angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, contatosApi, contatos) {
    $scope.direcaoOrdenacao = false;
    $scope.criterioOrdernacao = 'nome';
    $scope.app = "Lista telefonica"
    $scope.dado = {
        data : new Date().getTime()
    }
    $scope.dados = contatos.data;
    $scope.hasContatoSelecionado = true;
    calcularImposto($scope.dados);

    function calcularImposto(dados) {
        dados.map(contato => {
            contato.operadora.preco *= 1.2;
            return contato;
        });
        console.log(dados)
    }

    let carregarDados = function () {
        contatosApi.getContatos().then(function (response) {
            $scope.dados = response.data;
            calcularImposto($scope.dados);
        }, function (data) {
            $scope.error = "Não foi possivel carregar os dados"
        });
    };

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
            $scope.hasContatoSelecionado = contatos.some(contato => contato.selecionado);
        }
    }
    $scope.orderPor = function (nomeCampo) {
        $scope.criterioOrdernacao = nomeCampo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    }
})