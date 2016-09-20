agenda.controller("cadastrarContatoController", function listaProprietarios(
		$scope, $http) {
	$scope.app = "Cadastro de contato";

	$scope.mostraMapa = false;

	function initMap() {
		var latitude;
		var longigute;

		$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='
				+ $scope.contato.endereco + '&sensor=false', null, function(
				data) {
			var p = data.results[0].geometry.location
			latitude = p.lat;
			longigute = p.lng;
		});

		var myLatLng = {
			lat : latitude,
			lng : longigute
		};

		var map = new google.maps.Map(document.getElementById('map'), {
			center : new google.maps.LatLng(0,0),
			scrollwheel : false,
			zoom : 14
		});

		var marker = new google.maps.Marker({
			position : myLatLng,
			map : map,
			title : 'Hello World!'
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
				if (endereco.length > 0) {
					endereco += ', ';
				}
				endereco += data.logradouro;
			}

			if (data.bairro) {
				if (endereco.length > 0) {
					endereco += ', ';
				}
				endereco += data.bairro;
			}

			if (data.localidade) {
				if (endereco.length > 0) {
					endereco += ', ';
				}
				endereco += data.localidade;
			}

			if (data.uf) {
				if (endereco.length > 0) {
					endereco += ', ';
					endereco += data.uf;
				}
			}

			$scope.contato.endereco = endereco;
			initMap();
			$scope.mostraMapa = true;
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
