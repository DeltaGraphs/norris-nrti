/*
* Name :  Axis.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================*
* 0.1.1         2015-05-15  Francesco Rossetto          Fix attributes and methods
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

app.factory('Axis', function(){
    var name;
    var color = "#FFF";
    var minValue;
    var maxValue;
    var ticks = 10;
    var scale = "linear";

    return {
        Axis : function(info){
            if (info.name)
                name = info.name;
            if (info.color)
                color = info.color;
            if (info.range)
                range = info.range;
            if (info.ticks)
                ticks = info.ticks;
            if (info.scale)
                scale = info.scale;
        };

        updateParameters : function(info){
            if (info.name)
                name = info.name;
            if (info.color)
                color = info.color;
            if (info.range)
                range = info.range;
            if (info.ticks)
                ticks = info.ticks;
            if (info.scale)
                scale = info.scale;
        };

        getName : function(){
            return name;
        }
        getColor : function(){
            return color;
        }
        getMinValue : function(){
            return minValue;
        }
        getMaxValue : function(){
            return maxValue;
        }
        getTicks : function(){
            return ticks;
        }
        getScale : function(){
            return scale;
        }


    };
});