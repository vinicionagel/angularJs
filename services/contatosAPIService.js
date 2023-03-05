angular.module("listaTelefonica").factory("contatosApi", function ($http, config) {
    const _getContatos = function () {
        return $http.get(`${config.baseUrl}/contatos`)
    };
    const _salveContatos = function (contato) {
        return $http.post(`${config.baseUrl}/contato`, contato)
    }
    return {
        getContatos: _getContatos,
        saveContatos: _salveContatos
    };
});