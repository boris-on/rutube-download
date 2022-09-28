/**====================================================================*\
 * index.js                                            (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
\**====================================================================*/
        
/**--------------------------------------------------------------------*/
const fs  = require('fs');
const url = require('url');
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
const req_proc = function(data) { console.log(data); }
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
const define = function(req, res) {


    function set_file(_res, code, cont_type=null) {
        if (cont_type) {
            _res.writeHead(code, {'Content-Type' : cont_type});
        }
        else {
            _res.writeHead(code);
        }
    }


    function close_file(_res, code, ending, cont_type=null) {
        set_file(_res, code, cont_type); res.end(ending);
    }


    function open_utils(_path, _res, _root_path) {
        if(/\./.test(_path)) 
        {
            if(/\.css$/gi.test(_path)) { 
                set_file(_res, 200, 'text/css'); 
            }
            else if(/\.js$/gi.test(_path)) { 
                set_file(_res, 200, 'application/javascript'); 
            }
            
            fs.createReadStream(`${_root_path}${_path}`).pipe(_res);
            return true;   
        }
        return false;
    }


    function read_page(err, html, _res, _root_path) {
        if(err) {
            fs.readFile(`${_root_path}/nopage/index.html`, (err, html) => {
                if(err) {
                    close_file(_res, 404, 'Something went wrong.', 'text/plain');
                }
                else {
                    close_file(_res, 404, html, 'text/html');
                }
            });
        }
        else {
            close_file(_res, 200, html, 'text/html');
        }
    }


    function open_site(_index_html, _res, _req, _root_path, _md='utf-8') {
        fs.readFile(_index_html, _md, (err, html) => { read_page(err, html, _res, _root_path) });
    }

    
    let path = url.parse(req.url, true).pathname;
    
    let root_path = __dirname;

    let index_html = `${root_path}/static${path}/index.html`;

    if (open_utils(path, res, root_path)) { return; }

    open_site(index_html, res, req, root_path)
};
/**--------------------------------------------------------------------*/

/**--------------------------------------------------------------------*/
exports.define = define;
exports.req_proc = req_proc;
/**--------------------------------------------------------------------*/
