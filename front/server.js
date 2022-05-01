/**===============================================*\
***  SERVER CONFIGURATIONS                        **
***  @note use > node ../server.js to run server  **
\**===============================================*/

/**===============================================*/


const http = require(   'http'  ),
      rtng = require('./routing');

let server = new http.Server(function(req, res, str = '') {

  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  req.on('data', (data) => { rtng.req_proc(data); });

  req.on('end', () => { rtng.define(req, res, str); });

});

server.listen(80, '0.0.0.0', (srvr = server.address()) => {

  console.log(`Opened on: ${srvr.address}:${srvr.port}`);

});
