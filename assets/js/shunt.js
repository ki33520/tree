seajs.config({
	site: 	'/tree/',
	base: 	'/tree/assets/',
	jsRoute: 	'/tree/assets/js/',
	cssRoute: 	'/tree/assets/css/',
	jsonRoute: 	'/tree/assets/json/',
	tplRoute: 	'/tree/assets/tpl/',
	alias: {
		//lib
		jquery : 		'js/lib/jquery.min',
		jqueryCookie: 	'js/lib/jquery.cookie',
		jqueryUI: 		'js/lib/jquery-ui',
		jqueryTouch: 	'js/lib/jquery.ui.touch-punch.min',

		//src
		config : 		'js/src/config',
		module : 		'js/src/module',
		basic : 		'js/src/basic',
		siteNav: 		'js/src/site_nav',

		//apps
		index: 			'js/apps/index'
		
	}
});
define(function(require, exports, module) {
	require('jquery');
	require('jqueryCookie');
	require('basic');
});