agenda.controller('minhasNotasController', function($scope, $rootScope, $http,
		$route) {

	$scope.app = "Nota";
	$rootScope.app = $scope.app;

	/* GET */
	/**
	 * Inicializa todas as notas armazenadas.
	 */
	var listarNotas = function() {
		$http.get('/notas').success(function(data) {
			$rootScope.notas = data;
			$("#loader").hide();
			$("#lista").show();
		});
	};

	$scope.pesquisarNotas = function(nota) {
		$http.get('/nota/' + nota.tlNota).success(function(data) {
			$rootScope.notas = data;
			$("#loader").hide();
			$(".nota").show();
		});
	};

	/* POST */
	$scope.addGrupo = function() {
		$scope.nota.listaGrupos.push({
			idGrupo : null,
			noGrupo : "",
			deGrupo : ""
		});
	};

	$scope.criarNota = function(criaNota) {
		if(criaNota && criaNota.tlNota){
			var res = $http.post('/novaNota/', criaNota);

			res.success(function(data, status, headers, config) {
				console.log("Nota cadastrada com sucesso!")
				$scope.message = "Nota cadastrada com sucesso!";
				$route.reload();
			});
			
			res.error(function(data, status, headers, config) {
				console.log("failure message: " + JSON.stringify({
					data : data
				}));
			});
		} else {
			$scope.message = "Campo título é obrigatório!";
		}

	};

	/* PUT */
	$scope.editarNota = function(nota) {
		var res = $http.put('/editarNota/', nota);

		res.success(function(data, status, headers, config) {
			console.log("Nota editada com sucesso!")
			$scope.message = "Nota editada com sucesso!";
		});

		res.error(function(data, status, headers, config) {
			console.log("failure message: " + JSON.stringify({
				data : data
			}));
		});
	};

	/* DELETE */
	$scope.deleteNota = function(nota) {
		var res = $http.delete('/deleteNota/' + nota.idNota);
	
		res.success(function(data, status, headers, config) {
			console.log("Nota removida com sucesso!")
			$scope.message = "Nota removida com sucesso!";
			$route.reload();
		});
	
		res.error(function(data, status, headers, config) {
			console.log("failure message: " + JSON.stringify({
				data : data
			}));
		});
		
	
	}
	
	/* Inicializacao base */
	function initNota() {
		listarNotas();
		$scope.nota = {};
	}

	$scope.init = initNota();

})
