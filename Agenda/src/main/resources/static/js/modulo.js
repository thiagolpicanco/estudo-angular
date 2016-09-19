var agenda = angular.module("agenda", [ 'ngRoute', 'ngMessages',
		'angular-growl' ]);


agenda.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "views/home.html",

	}).when("/cadastraContato", {
		templateUrl : "views/cadastrarContato.html"
	}).when("/editaContato", {
		templateUrl : "views/editarContato.html"
	}).when("/listaContato", {
		templateUrl : "views/listarContato.html"
	});
});









document
		.write('<script type="text/javascript" src="controllers/homeController.js" ></scr'
				+ 'ipt>');
document
		.write('<script type="text/javascript" src="controllers/editarContatoController.js" ></scr'
				+ 'ipt>');
document
		.write('<script type="text/javascript" src="controllers/listarContatoController.js" ></scr'
				+ 'ipt>');
document
		.write('<script type="text/javascript" src="controllers/cadastrarContatoController.js" ></scr'
				+ 'ipt>');
