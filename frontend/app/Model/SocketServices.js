/**
    * Name: SocketServices.js
    * Package: FrontEnd::Model
    * Author: Maria Giovanna Chinellato
    * Date: 2015/05/12
    *
    * Changes:
    * Version   Date        Changes         Author
    * {0}.{1}   2015-05-12  Creazione file  Maria Giovanna Chinellato
    *
    * {0}.{2}   2015-05-12  Codifica modulo Maria Giovanna Chinellato
    *
    * ------------------------------------------------------------
    * Copyright (C) 2015 DeltaGraphs
    * 
    * This file is part of Norris.js.
    *
*/

app.factory('SocketServices', function ($rootScope) {
  return {
    on: function (eventName, callback) {
          socket.on(eventName, function () {  
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        }
  };
});