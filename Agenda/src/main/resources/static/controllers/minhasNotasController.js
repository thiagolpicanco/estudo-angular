agenda.controller('minhasNotasController', function($scope, $rootScope, $http,
		$route) {

	$scope.app = "Nota";
	$rootScope.app = $scope.app;
	
	/* HTML */
	$scope.limparMessages = function() {
			$scope.messageSucesso = "";
			$scope.messageErro = "";
	}
	
	$scope.alteraCor = function($event){
		var obj = event.target;
		$scope.activePaletaNotaNovo = null;
		$scope.activePaletaNota = null;
		return $(obj).css( 'background-color' );
	}
	
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
		if (nota.tlNota == '') {
			listarNotas();
		}else{
		$http.get('/nota/' + nota.tlNota).success(function(data) {
			$rootScope.notas = data;
			$("#loader").hide();
			$(".nota").show();
		});
		}
	};
	
	var listarGrupos = function() {
		$http.get('/grupos').success(function(data) {
			$rootScope.grupos = data;
			$("#loader").hide();
			$("#lista").show();
		});
	}

	/* POST */
	var iniciaNovaNota = function() {
		$scope.criaNota = { tlNota:'Dê um título para este lembrete', deNota:'Escreva algo para se lembrar', atvNota:false };
		$('#inputCriarNotaTitulo').css('color', '#c3c3c3');
		$('#inputCriarBody').css('color', '#c3c3c3');
		$('#criar-nota-group').css('display', 'none');
	};
	
	$scope.adicionarGrupo = function(criaGrupo) {

		if($scope.criaGrupo.noGrupo){
			
			var res = $http.post('/novoGrupo/', criaGrupo);

			res.success(function(data, status, headers, config) {
				console.log("Grupo cadastrado com sucesso!")
				$scope.messageSucesso = "Grupo cadastrado com sucesso!";
				$route.reload();
			});
			
			res.error(function(data, status, headers, config) {
				console.log("failure message: " + JSON.stringify({
					data : data
				}));
			});
		}
	};

	$scope.novaCor = function($event) {
		$scope.criaNota.cor = $scope.alteraCor(event);
	}
	
	$scope.criarNota = function(criaNota) {
		if($scope.criaNota.atvNota){
			
			var res = $http.post('/novaNota/', criaNota);

			res.success(function(data, status, headers, config) {
				console.log("Nota cadastrada com sucesso!")
				$scope.messageSucesso = "Nota cadastrada com sucesso!";
				$route.reload();
			});
			
			res.error(function(data, status, headers, config) {
				console.log("failure message: " + JSON.stringify({
					data : data
				}));
			});
		}
	};
	
	$scope.habilitarNovaNota= function() {
		$scope.message = '';
		$scope.criaNota.tlNota = '';
		$scope.criaNota.atvNota = true;
		$('#inputCriarNotaTitulo').css('color', 'black');
		$('#criar-nota-group').css('display', 'initial');
	}
	
	$scope.habilitarNovaNotaCorpo = function() {
		$scope.criaNota.deNota = '';
		$scope.criaNota.atvDeNota = true;
		$('#inputCriarBody').css('color', 'black');
	}
	
	$scope.blurNovaNota= function() {
		if($scope.criaNota.tlNota == ''){
			iniciaNovaNota();
			$scope.messageErro = "Campo título é obrigatório!";
		}
	}
	
	/* PUT */
	$scope.editarNota = function(nota) {
		var res = $http.put('/editarNota/', nota);

		res.success(function(data, status, headers, config) {
			console.log("Nota editada com sucesso!")
			$scope.messageSucesso = "Nota editada com sucesso!";
		});

		res.error(function(data, status, headers, config) {
			console.log("failure message: " + JSON.stringify({
				data : data
			}));
		});
	};

	$scope.habilitarExcluirGrupo = function(grupo) {
		if(grupo.idGrupo) {
			if ($scope.activeMenuGrupo != grupo.idGrupo) {
				$scope.activeMenuGrupo = grupo.idGrupo;
			} else {
				$scope.activeMenuGrupo = '';
			}
		}
	} 
	
	$scope.habilitarPaletaNota = function(nota) {
		if(nota.idNota) {
			if ($scope.activePaletaNota != nota.idNota) {
				$scope.activePaletaNota = nota.idNota;
			} else {
				$scope.activePaletaNota = '';
			}
		}else {
			if($scope.activePaletaNotaNovo) { 
				$scope.activePaletaNotaNovo = false;
			} else {
				$scope.activePaletaNotaNovo = true;
			}
		}
	}
	
	$scope.habilitarListaDeGrupos = function(nota) {
		if(nota.idNota) {
			if ($scope.activeListaGrupos != nota.idNota) {
				$scope.activeListaGrupos = nota.idNota;
			} else {
				$scope.activeListaGrupos = '';
			}
		}else {
			if($scope.activeListaGrupos) { 
				$scope.activeListaGrupos = false;
			} else {
				$scope.activeListaGrupos = true;
			}
		}
	}
	
	$scope.editaCor = function(nota, $event) {
		nota.cor = $scope.alteraCor(event);
		$scope.editarNota(nota);
	}

	/* DELETE */
	$scope.habilitarMenuNota = function(nota) {
		if ($scope.activeMenuNota != nota.idNota){
			$scope.activeMenuNota = nota.idNota;
		} else {
			$scope.activeMenuNota = '';
		}
	}
	
	$scope.deleteNota = function(nota) {
		var res = $http.delete('/deleteNota/' + nota.idNota);
	
		res.success(function(data, status, headers, config) {
			console.log("Nota removida com sucesso!")
			$scope.messageSucesso = "Nota removida com sucesso!";
			$route.reload();
		});
	
		res.error(function(data, status, headers, config) {
			console.log("failure message: " + JSON.stringify({
				data : data
			}));
		});
		
	}
	
	$scope.deleteGrupo = function(grupo) {
		var res = $http.delete('/deleteGrupo/' + grupo.idGrupo);
	
		res.success(function(data, status, headers, config) {
			console.log("Grupo removido com sucesso!")
			$scope.messageSucesso = "Grupo removido com sucesso!";
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
		listarGrupos();
		$scope.nota = {};
		iniciaNovaNota();
		$scope.display = false;
	}

	$scope.init = initNota();

})
