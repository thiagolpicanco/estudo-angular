agenda.controller("cadastrarContatoController", function listaProprietarios(
		$scope, $http) {
	$scope.app = "Cadastro de contato";

	function initContato() {
		$scope.contato = {};
		$scope.contato.listaTelefones = [ {
			idTelefone : null,
			nuTelefone : "",
			tipoTelefone : ""
		} ];
	}

	$scope.init = initContato();

	$scope.addTelefone = function() {
		$scope.contato.listaTelefones.push({
			idTelefone : null,
			nuTelefone : "",
			tipoTelefone : ""
		});
	};

	$scope.criarContato = function(contato) {
		var res = $http.post('/novoContato/', contato);

		res.success(function(data, status, headers, config) {
			initContato();
			alert("Contato cadastrado com sucesso!")
			$scope.message = "Contato cadastrado com sucesso!";
		});

		res.error(function(data, status, headers, config) {
			alert("failure message: " + JSON.stringify({
				data : data
			}));
		});
	};

})
