agenda.controller('minhasNotasController', function($scope, $rootScope, $http,
		$route) {

	$scope.app = "Nota";
	$rootScope.app = $scope.app;
	
	/* HTML */
	var iniciaNovaNota = function() {
		$scope.nota = { tlNota:'Dê um título para este lembrete', deNota:'Escreva algo para se lembrar', atvNota:false};
		$('#inputCriarNotaTitulo').css('color', '#c3c3c3');
		$('#criar-nota-group').css('display', 'none');
	};
	
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

	$scope.pesquisarNotas = function(pesquisa) {
		if (pesquisa == '') {
			listarNotas();
		}else{
		$http.get('/nota/' + pesquisa).success(function(data) {
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
	
	$scope.adicionarGrupo = function(grupo) {

		if(grupo.noGrupo){
			
			var res = $http.post('/novoGrupo/', grupo);

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
		$scope.nota.cor = $scope.alteraCor(event);
	}
	
	$scope.criarNota = function(nota) {
		if(nota.atvNota){
			if (!nota.atvDeNota) { 
				nota.deNota = null 
			}
			
			var res = $http.post('/novaNota/', nota);

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
		$scope.nota.tlNota = '';
		$scope.nota.atvNota = true;
		$('#inputCriarNotaTitulo').css('color', 'black');
		$('#inputCriarBody').css('color', '#c3c3c3');
		$('#criar-nota-group').css('display', 'initial');
	}
	
	$scope.habilitarNovaNotaCorpo = function() {
		$scope.nota.deNota = '';
		$scope.nota.atvDeNota = true;
		$('#inputCriarBody').css('color', 'black');
	}
	
	$scope.blurNovaNota= function() {
		if($scope.nota.tlNota == ''){
			iniciaNovaNota();
			$scope.nota.atvDeNota = false;
			$scope.messageErro = "Campo título é obrigatório!";
		}
	}
	
	/* PUT */
	$scope.adicionarGrupoANota = function(grupo, $event) {
		var existe = false;
		var obj = event.target;
		if(!$scope.nota.listaGrupos){
			$scope.nota.listaGrupos = [];
		}
		existe = $scope.nota.listaGrupos.indexOf(grupo) != -1;
		
		if (grupo.idGrupo && !existe){
			$scope.nota.listaGrupos.push(grupo);
			$(obj).find('i').css({'color': '#c9302c'});
		} else {
			var index = $scope.nota.listaGrupos.indexOf(grupo);
			$scope.nota.listaGrupos.splice(index,1);
			$(obj).find('i').css({'color': ''});
		}
	};
	
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
	}

	$scope.init = initNota();

})
