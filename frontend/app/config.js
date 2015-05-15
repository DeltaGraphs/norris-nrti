/*
* Name :  config.js
* Module : FrontEnd
* Location : /frontend/app
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.0         2015-05-15  Maria Giovanna Chinellato   Add config module
*
* 0.0.1         2015-05-15  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

"use strict";

angular.module('config')
	// Show details in error messages?
	.constant('debug', false)
	// How many collections in the navbar?
	.constant('navBarCollections', 4)
	// Show signup button? Remember to disable signup also in the backend configuration file!
	.constant('showSignup', true)
	// Link used in the "Report a Problem" button
	.constant('reportLink', "https://github.com/DeltaGraphs/norris-nrti/issue/new");