angular.module("listaTelefonica").factory("contatosApi", function ($http, config) {
    const _getContatos = function () {
        return $http.get(`${config.baseUrl}/contatos`)
    };
    const _salveContatos = function (contato) {
        return $http.post(`${config.baseUrl}/contato`, contato)
    }

    const _deleteContatos = function (seriais) {
        const data = JSON.stringify(seriais);
        console.log(data);
        return $http.delete(`${config.baseUrl}/contato`, {data: data, headers: {'Content-Type': 'application/json;charset=utf-8'}})
    }

    return {
        getContatos: _getContatos,
        saveContatos: _salveContatos,
        deleteContato: _deleteContatos
    };
});