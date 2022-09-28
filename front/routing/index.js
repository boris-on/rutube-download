/**
 *  Server processing
 */

const fs  = require('fs');
const url = require('url');


const req_proc = function(data) { console.log(data); }


const define = function(req, res, post_data) {

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


    function open_utils(_path, _res, root_path) {
        if(/\./.test(_path)) 
        {
            if(/\.css$/gi.test(_path)) { 
                set_file(_res, 200, 'text/css'); 
            }
            else if(/\.js$/gi.test(_path)) { 
                set_file(_res, 200, 'application/javascript'); 
            }
            
            fs.createReadStream(`${root_path}${_path}`).pipe(_res);
            return;   
        }
    }


    function open_site(api_path, _path, _res, _post_data, _req, _root_path) {
        try {
            // Api
            api_path.promise(_res, _post_data, _req).then(
                result => { 
                    close_file(_res, 200, result); 
                    return; 
                },
                error => {
                    _res.end(JSON.stringify({'error' : 1, 'errorName' : error}));
                    return;
                }
            );
            res.end('We have API!');
        }
        catch (err) {
            // Index out.
            let index_path = `${_root_path}/static${_path}/index.html`
            fs.readFile(index_path, 'utf-8', (err, html) => {
                if(err) {
                    nopage_index_path = '/var/www/html/nodejs/routing/nopage/index.html'
                    fs.readFile(nopage_index_path, (err , html) => {
                        if(!err) {
                            close_file(res, 404, html, 'text/html')
                        }
                        else {
                            close_file(res, 404, 'Something went wrong.', 'text/plain');
                        }
                    });
                }
                else {
                    close_file(res, 200, html, 'text/html');
                }
            });
        }
    }

    
    const urlParsed = url.parse(req.url, true);
    let path = urlParsed.pathname; // req_name
    
    prePath = __dirname;

    console.log("\n--------FILEPATH-------\n", prePath, 
                "\n--------URLPARSE-------\n", urlParsed, 
                "\n----------PATH---------\n", path, "\n\n")

    // Utiils open.
    open_utils(path, res, prePath);

    // Site open.
    open_site(require(`./dynamic/${path}`), path, res, post_data, req)
};


exports.define = define;
exports.req_proc = req_proc;