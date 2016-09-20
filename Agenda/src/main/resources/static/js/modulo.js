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
	}).when("/notas", {
		templateUrl : "views/notas.html"
	});
});

/* Diretivas customizadas */
document
		.write('<script type="text/javascript" src="directives/customDirectives.js" ></script>');

document
		.write('<script type="text/javascript" src="controllers/homeController.js" ></script>');
document
		.write('<script type="text/javascript" src="controllers/editarContatoController.js" ></script>');
document
		.write('<script type="text/javascript" src="controllers/listarContatoController.js" ></script>');
document
		.write('<script type="text/javascript" src="controllers/cadastrarContatoController.js" ></script>');
document
		.write('<script type="text/javascript" src="controllers/minhasNotasController.js" ></script>');