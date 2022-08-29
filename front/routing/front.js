/**=================================================================*\
***                         FRONT PROCESSING                        **
\**=================================================================*/

/**=================================================================*/
          
import { crtFirstFrame, crtFormat,
         crtLoadWrn              } from './js/conf_page.js';

import { get_files, get_json     } from './js/request.js';

import { init_ffmpeg             } from './js/convert.js'; 

import { isExist                 } from './js/utility.js';

import { clearCont               } from './js/clear.js';

/**=================================================================*/
// https://rutube.ru/video/2317e1d4d3d6ac748a3ffa9edb8742a1/
/**=================================================================*/
async function proc_blocks(doc, body, procFunc, prms)
{
    if (!await procFunc(prms.url, prms.procFunc, prms.attr))
    {
        for (let id = 0; id < prms.rmv_elems.length; id++)
        {
            clearCont(body, {'elem' : prms.rmv_elems[id]});
        }
        if (prms.init) crtFirstFrame(body);
    }
    else 
    {
        doc.getElementById('description_panel').innerHTML = "Ссылка не найдена!";
        doc.getElementById('clicked_load_btn' ).id        = 'load_btn';
    }

}
/**=================================================================*/


/**=================================================================*/
(function(body, doc, ffmpeg) {

    crtFirstFrame(body);

    addEventListener('click', function(event) {
        
        let link = doc.getElementById('search_panel');

        if (link.value && isExist('format_selector')) switch(event.target.className)
        {
            case 'quality_select':

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'  });
                
                crtLoadWrn(body);

                proc_blocks(doc, body, get_json, {

                    'rmv_elems' : [
                        'loader'            ,
                        'load_btn'           ,
                        'bottom_line'         ,
                        'search_panel'         ,
                        'rutubeto_logo'         ,
                        //'count_loads_panel'      ,
                        'description_panel'
                    ],
                    
                    'url'       : `https://rutubeto.ru/getmp4?resolution_url=${event.target.id}`  ,
                    'procFunc'  :  get_files                                                       ,
                    'attr'      :  ffmpeg                                                           ,
                    'init'      :  true

                });

                break;

            default:
                break;
        }
        
        if (link.value) switch(event.target.id)
        {
            case 'load_btn':

                doc.getElementById('load_btn').id = 'clicked_load_btn';
                
                proc_blocks(doc, body, get_json, {

                    'rmv_elems' : ['description_panel']                              ,
                    'url'       :  `https://rutubeto.ru/download?url=${link.value}`  ,
                    'procFunc'  :   crtFormat                                            ,
                    'attr'      :   body

                });
                
                break;
            
            default:
                break;
        }

    })

})(document.querySelector('body'), document, init_ffmpeg(true));
/**=================================================================*/
 