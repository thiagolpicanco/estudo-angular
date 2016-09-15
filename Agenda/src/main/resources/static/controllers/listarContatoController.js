agenda.controller("listarContatoController", function listaContatos($scope,
		$http) {
	$scope.app = "Home";

	function listarContatos() {
		$http.get('/contatos').success(function(data) {
			$scope.contatos = data;
			$("#loader").hide();
			$("#lista").show();
		});
	}
	;

	$scope.detalhar = function(contato) {
		if ($scope.active != contato.noContato) {
			$scope.active = contato.noContato;
		} else {
			$scope.active = null;
		}
	};

	listarContatos();

})