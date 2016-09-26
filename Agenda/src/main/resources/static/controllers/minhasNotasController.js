agenda.controller('minhasNotasController', function(NOTA, $scope, $rootScope, $http,
		$route) {

	$scope.app = "Nota";
	$rootScope.app = $scope.app;

	/* Utilidades */

	var iniciaNovaNota = function() {
		$scope.nota = {
				tlNota : '',
				deNota : '',
				atvNota : false,
				atvDeNota : false
		};
		$('#inputCriarNotaTitulo').css('color', '#c3c3c3');
		$('#inputCriarBody').css('color', '#c3c3c3');
	};

	$scope.limparMessages = function() {
		$scope.messageSucesso = "";
		$scope.messageErro = "";
	}

	$scope.alteraCor = function($event) {
		var obj = event.target;
		$scope.activePaletaNotaNovo = null;
		$scope.activePaletaNota = null;
		return $(obj).css('background-color');
	}
 
	$scope.novaCor = function($event) {
		$scope.nota.cor = $scope.alteraCor(event);
	}

	$scope.editaCor = function(nota, $event) {
		nota.cor = $scope.alteraCor(event);
		$scope.editarNota(nota);
	}

	$scope.manipularGrupoNota = function(grupo, $event, nota) {
		var element = event.target;

		// Criar
		if (nota === undefined) {
			nota = $scope.nota;
			$scope.nota = $scope.adicionarGrupoANota(grupo, element, nota);

			// Editar
		} else {
			nota = $scope.adicionarGrupoANota(grupo, element, nota);
			$scope.editarNota(nota);
		}
	}

	$scope.adicionarGrupoANota = function(grupo, element, nota) {
		var existe = false;
		var index;

		if (!nota.listaGrupos) {
			nota.listaGrupos = [];
		}

		for (i = 0; i < nota.listaGrupos.length; i++) {
			existe = nota.listaGrupos[i].idGrupo == grupo.idGrupo;	
			if(existe) {
				index = i;
				break;
			}
		}

		if (grupo.idGrupo && !existe) {
			nota.listaGrupos.push(grupo);
			$(element).find('i').css({
				'color' : '#c9302c'
			});
		} else {
			nota.listaGrupos.splice(index, 1);
			$(element).find('i').css({
				'color' : ''
			});
		}

		return nota;
	};

	$scope.possuiGrupo = function(nota, grupo) {
		var existe;
		if (!nota.listaGrupos) {
			nota.listaGrupos = [];
		}

		for (var i = 0; i < nota.listaGrupos.length; i++) {
			existe = nota.listaGrupos[i].idGrupo == grupo.idGrupo;	
			if(existe) {
				break;
			}
		}

		return existe ? '#c9302c' : '';
	};

	$scope.possuiListaDeGrupo = function(nota) {
		var existe;
		if (nota.listaGrupos.length != 0) {
			existe = true;
		}
		return existe ? '#c9302c' : '';
	}

	$scope.blurNovaNota = function() {
		if($('#criar-nota-modal-group').css('display') == 'none')
			$('#criar-nota-modal').css('display', 'block');
	}

	$scope.habilitarNovaNota = function() {
		iniciaNovaNota();
		$scope.message = '';
		$('#criar-nota-modal').css('display', 'none');
	}

	$scope.habilitarNovaNotaTitulo = function() {
		$scope.nota.tlNota = '';
		$('#inputCriarNotaTitulo').css('color', 'black');

	};

	$scope.blurNovaNotaTitulo = function() {
		if ($scope.nota.tlNota == '') {
			$scope.nota.atvNota = false;
			$('#inputCriarNotaTitulo').css('color', '#c3c3c3');
		}		
	};

	$scope.habilitarNovaNotaCorpo = function() {
		$scope.nota.deNota = '';
		$('#inputCriarBody').css('color', 'black');
	};

	$scope.blurNovaNotaCorpo = function() {
		if ($scope.nota.deNota == '') {
			$scope.nota.atvDeNota = false;
			$('#inputCriarBody').css('color', '#c3c3c3');
		}	
	};

	$scope.habilitaConcluir = function() {
		if ($scope.nota.tlNota.length != 0) {
			$scope.nota.atvNota = true;
		}

		if ($scope.nota.deNota.length != 0) {
			$scope.nota.atvDeNota = true;
		}
	};

//	$scope.habilitarExcluirGrupo = function(grupo) {
//		if (grupo.idGrupo) {
//			if ($scope.activeMenuGrupo != grupo.idGrupo) {
//				$scope.activeMenuGrupo = grupo.idGrupo;
//			} else {
//				$scope.activeMenuGrupo = '';
//			}
//		}
//	}

	$scope.habilitarPaletaNota = function(nota) {
		if (nota.idNota) {
			if ($scope.activePaletaNota != nota.idNota) {
				$scope.activePaletaNota = nota.idNota;
			} else {
				$scope.activePaletaNota = '';
			}
		} else {
			if ($scope.activePaletaNotaNovo) {
				$scope.activePaletaNotaNovo = false;
			} else {
				$scope.activePaletaNotaNovo = true;
			}
		}
	}

	$scope.habilitarListaDeGrupos = function(nota) {
		if (nota.idNota) {
			if ($scope.activeListaGrupos != nota.idNota) {
				$scope.activeListaGrupos = nota.idNota;
			} else {
				$scope.activeListaGrupos = '';
			}
		} else {
			if ($scope.activeListaGruposNovos) {
				$scope.activeListaGruposNovos = false;
			} else {
				$scope.activeListaGruposNovos = true;
			}
		}
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
	
	$scope.pesquisarListasPorGrupo = function(id) {
		$http.get('/grupo/' + id).success(function(data) {
			$rootScope.notas = data;
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

	$scope.criarNota = function(nota) {
		if(nota.atvNota || nota.atvDeNota){
			if (!nota.atvDeNota) { 
				nota.deNota = null; 
			}

			if (!nota.atvNota) { 
				nota.deNota = null;
			}

			var res = $http.post('/novaNota/', nota);

			res.success(function(data, status, headers, config) {
				console.log("Nota cadastrada com sucesso!")
				$scope.messageSucesso = "Nota cadastrada com sucesso!";
				$('#criar-nota-modal-group').modal('hide');
			});

			res.error(function(data, status, headers, config) {
				console.log("failure message: " + JSON.stringify({
					data : data
				}));
			});
		}
		$route.reload();
	};

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
