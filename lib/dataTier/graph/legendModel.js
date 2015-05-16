/*jshint node: true, -W106 */
'use strict';

/*
* Name : legendModel.js
* Module : Lib::DataTier::LegendModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Filippo Rampado    Initial code
* =========================================================
*/
function LegendModel(params) {
	this._position='NE';
	this._fontColor='#000000';
	this._backgroundColor='#FFFFFF';

	this.updateProperties(params);
}

LegendModel.prototype.updateProperties=function(params){
	if(params!==undefined) {
		if(params.position!==undefined && (
			(params.position === 'N') ||
			(params.position === 'E') ||
			(params.position === 'W') ||
			(params.position === 'S') ||
			(params.position === 'NE') ||
			(params.position === 'NW') ||
			(params.position === 'SE') ||
			(params.position === 'SW'))){
			this._position=params.position;
		}
		if(params.fontColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.fontColor))){
			this._fontColor=params.fontColor;
		}
		if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
			this._backgroundColor=params.backgroundColor;
		}
	}
};

LegendModel.prototype.getProperties=function(){
	return {
		position: this._position,
		fontColor: this._fontColor,
		backgroundColor: this._backgroundColor
	};
};

module.exports = LegendModel;