agenda.controller("listarContatoController", function listaContatos($scope,
		$http) {
	$scope.app = "Home";

	$scope.latLng = null;

	function listarContatos() {
		$http.get('/contatos').success(function(data) {
			$scope.contatos = data;
			$("#loader").hide();
			$("#lista").show();
		});
	}
	;

	$scope.initMap = function initMap(contato) {
		var enderecoLink = '';
		$scope.map = null;
		if (contato.logradouro != null) {
			enderecoLink += contato.logradouro + ' ';
		}

		if (contato.bairro != null) {
			enderecoLink += contato.bairro + ' ';
		}

		if (contato.cidade != null) {
			enderecoLink += contato.cidade + ' ';
		}

		if (contato.uf != null) {
			enderecoLink += contato.uf + ' ';
		}

		$http.get(
				'http://maps.googleapis.com/maps/api/geocode/json?address='
						+ enderecoLink + '&sensor=false').success(
				function(data) {

					if (data.results[0] != null) {
						$scope.mostraMapa = true;
						$scope.latLng = data.results[0].geometry.location

						$scope.map = new google.maps.Map(document
								.getElementById(contato.idContato), {
							center : new google.maps.LatLng($scope.latLng),
							scrollwheel : false,
							zoom : 15,
						});

						$scope.icone = {
							url : "img/1474396795_go-home.png", // url
							scaledSize : new google.maps.Size(30, 30), // scaled
							origin : new google.maps.Point(0, 0), // origin
							anchor : new google.maps.Point(0, 0)
						};

						$scope.marker = new google.maps.Marker({
							position : $scope.latLng,
							map : $scope.map,
							title : 'Residencia',
							icon : $scope.icone
						});
					}
				});
	}

	$scope.detalhar = function(contato) {
		$scope.mostraMapa = false;
		if ($scope.active != contato.idContato) {
			$scope.active = contato.idContato;
			$scope.initMap(contato);
		} else {
			$scope.active = null;
			$scope.map = null;

		}
	};

	listarContatos();

})