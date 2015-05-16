/*jshint node: true, -W106 */
'use strict';

/*
* Name : axisModel.js
* Module : Lib::DataTier::AxisModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Filippo Rampado    Initial code
* =========================================================
*/
var Helper = require('../../helpers/functionHelper.js');

function AxisModel(params) {
	this._name='';
	this._color='#000000';
	this._minIndex=null;
	this._maxIndex=null;
	this._ticks=10;
	this._scale='linear';

	this.updateProperties(params);
}

AxisModel.prototype.updateProperties=function(params){
	if(params!==undefined) {
		if(params.name!==undefined && typeof params.name === 'string'){
			this._name=params.name;
		}
		if(params.color!==undefined && Helper.isHEX(params.color)){
			this._color=params.color;
		}
		if(params.minIndex!==undefined && typeof params.minIndex === 'number'){
			this._minIndex=params.minIndex;
		}
		if(params.maxIndex!==undefined && typeof params.maxIndex === 'number'){
			this._maxIndex=params.maxIndex;
		}
		if(params.ticks!==undefined && (params.ticks <= 98) &&(params.ticks >= 0)){
			this._ticks=params.ticks;
		}
		if(params.scale!==undefined && (params.scale === 'linear' || params.scale === 'logarithmic')){
			this._scale=params.scale;
		}
	}
};

AxisModel.prototype.getProperties=function(){
	return {
		name: this._name,
		color: this._color,
		maxIndex: this._maxIndex,
		minIndex: this._minIndex,
		ticks: this._ticks,
		scale: this._scale
	};
};

module.exports = AxisModel;