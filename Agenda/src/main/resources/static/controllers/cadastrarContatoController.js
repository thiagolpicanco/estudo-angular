agenda.controller("cadastrarContatoController", function listaProprietarios(
		$scope, $http) {
	$scope.app = "Cadastro de contato";

	$scope.mostraMapa = false;

	$scope.mudaMapa = function initMap() {
		var latLng;
		var enderecoLink = '';
		if ($scope.contato.logradouro != null) {
			enderecoLink += $scope.contato.logradouro + ' ';
		}

		if ($scope.contato.bairro != null) {
			enderecoLink += $scope.contato.bairro + ' ';
		}

		if ($scope.contato.cidade != null) {
			enderecoLink += $scope.contato.cidade + ' ';
		}

		if ($scope.contato.uf != null) {
			enderecoLink += $scope.contato.uf + ' ';
		}

		$http.get(
				'http://maps.googleapis.com/maps/api/geocode/json?address='
						+ enderecoLink + '&sensor=false').success(
				function(data) {

					latLng = data.results[0].geometry.location
					var map = new google.maps.Map(document
							.getElementById('map'), {
						center : new google.maps.LatLng(latLng),
						scrollwheel : false,
						zoom : 18,
						mapTypeId : google.maps.MapTypeId.HYBRID
					});

					var icone = {
						url : "img/1474396795_go-home.png", // url
						scaledSize : new google.maps.Size(30, 30), // scaled
						// size
						origin : new google.maps.Point(0, 0), // origin
						anchor : new google.maps.Point(0, 0)
					// anchor
					};

					var marker = new google.maps.Marker({
						position : latLng,
						map : map,
						title : 'Residencia',
						icon : icone
					});

					$scope.mostraMapa = true;
				});
	}

	function initContato() {
		$scope.contato = {};
		$scope.contato.listaTelefones = [ {
			idTelefone : null,
			nuTelefone : "",
			tipoTelefone : ""
		} ];
	}

	$scope.buscarCep = function(contato) {
		var link = 'https://viacep.com.br/ws/';
		var complemento = '/json/';
		var linkCompleto = link + contato.cep + complemento;
		$http.get(linkCompleto).success(function(data) {
			var endereco = "";

			if (data.logradouro) {
				$scope.contato.logradouro = data.logradouro;
			} else {
				$scope.contato.logradouro = null;
			}

			if (data.bairro) {
				$scope.contato.bairro = data.bairro;
			} else {
				$scope.contato.bairro = null;
			}

			if (data.localidade) {
				$scope.contato.cidade = data.localidade;
			} else {
				$scope.contato.cidade = null;
			}

			if (data.uf) {
				$scope.contato.uf = data.uf;
			} else {
				$scope.contato.uf = null;
			}

			$scope.mudaMapa();

		}).error(function(data) {
			initMap();
			alert(data);
			console.log('Error: ' + data);
		});
		;

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
