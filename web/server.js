/**====================================================================*\
 * server.js                                           (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
 * @note use > node ./server.js to run server              
\**====================================================================*/
        
/**--------------------------------------------------------------------*/
const http = require(   'http'  ), 
      rtng = require('./routing'),
      cnfg = require('./config.js');

let argv = process.argv;

let port = (argv[2]) ? argv[2] : cnfg.PORT, 
    host = (argv[3]) ? argv[3] : cnfg.SHOST;
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
let server = new http.Server(function(req, res) 
{
    res.setHeader('Content-Type'                , 'application/json');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy'  , 'same-origin');

    req.on('data', (data) => { rtng.req_proc(data); });
    req.on('end', () => { rtng.define(req, res); });
});
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
server.listen(port, host, (srvr = server.address()) => {
    console.log(`Opened on: ${srvr.address}:${srvr.port}`);
});
/**--------------------------------------------------------------------*/
