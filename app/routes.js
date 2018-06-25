//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');

module.exports = function(app){
  
  app.get('/get_all_con', function(req, res){
    tuna.get_all_con(req, res);
  });
}
