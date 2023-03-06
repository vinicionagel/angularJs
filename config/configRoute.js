angular.module("listaTelefonica").config(
    function ($routeProvider) {
        $routeProvider.when("/contatos", {
            templateUrl: "view/contatos.html",
            controller: "listaTelefonicaController",
            resolve: {
                contatos : function (contatosApi) {
                    return contatosApi.getContatos();
                }
            }
        });
        $routeProvider.when("/novoContato", {
            templateUrl: "view/novoContato.html",
            controller: "novoContatoController",
            resolve: {
                operadoras : function (operadorasApi) {
                    return operadorasApi.getOperadoras();
                }
            }
        });
        $routeProvider.when("/detalhesContato/:id", {
            templateUrl: "view/detalhesContato.html",
            controller: "detalhesContatoController",
            resolve: {
                contato : function (contatosApi, $route) {
                    return contatosApi.getContato($route.current.params.id);
                }
            }
        });
        $routeProvider.otherwise({redirectTo : "/contatos"});

});