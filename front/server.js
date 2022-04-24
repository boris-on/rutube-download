/**===============================================*\
***  SERVER CONFIGURATIONS                        **
***  @note use > node ../server.js to run server  **
\**===============================================*/

/**===============================================*/


const http = require(   'http'  ),
      rtng = require('./routing');

let server = new http.Server(function(req, res, str = '') {

  res.setHeader('Content-Type', 'application/json');

  req.on('data', (data) => { str += data; });

  req.on('end', () => { rtng.define(req, res, str); });

});

server.listen(8000, 'localhost');
