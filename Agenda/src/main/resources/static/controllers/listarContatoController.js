agenda.controller("listarContatoController", function listaContatos($scope,
		$http) {
	$scope.app = "Home";

	var map;

	function listarContatos() {
		$http.get('/contatos').success(function(data) {
			$scope.contatos = data;
			$("#loader").hide();
			$("#lista").show();
		});
	}
	;

	function initMap(contato) {
		var latLng;
		var enderecoLink = '';

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
						latLng = data.results[0].geometry.location

						if (map == null) {

							map = new google.maps.Map(document
									.getElementById('map'), {
								center : new google.maps.LatLng(latLng),
								scrollwheel : false,
								zoom : 14,
							});
						} else {
							map.setCenter(LatLng);
						}
						var icone = {
							url : "img/1474396795_go-home.png", // url
							scaledSize : new google.maps.Size(30, 30), // scaled
							origin : new google.maps.Point(0, 0), // origin
							anchor : new google.maps.Point(0, 0)
						};

						var marker = new google.maps.Marker({
							position : latLng,
							map : map,
							title : 'Residencia',
							icon : icone
						});
					}
				});
	}

	$scope.detalhar = function(contato) {
		$scope.mostraMapa = false;
		if ($scope.active != contato.idContato) {
			$scope.active = contato.idContato;
			initMap(contato);
		} else {
			$scope.active = null;

		}
	};

	listarContatos();

})