/**===========================================================*\
***  SERVER CONFIGURATIONS                                    **
***  @note use > node ../server.js to run server              **
\**===========================================================*/

/**===========================================================*/


/**===========================================================*/
const http = require(   'http'  ),
      rtng = require('./routing');

let argv = process.argv;

let port = (argv[2]) ? argv[2] : 80,
    host = (argv[3]) ? argv[3] : '0.0.0.0';
/**===========================================================*/


/**===========================================================*/
let server = new http.Server(function(req, res, str = '') {

  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  req.on('data', (data) => { rtng.req_proc(data); });

  req.on('end', () => { rtng.define(req, res, str); });

});
/**===========================================================*/


/**===========================================================*/
server.listen(port, host, (srvr = server.address()) => {

  console.log(`Opened on: ${srvr.address}:${srvr.port}`);

});
/**===========================================================*/
