/**====================================================================*\
 * front.js                                            (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
\**====================================================================*/
        
/**--------------------------------------------------------------------*/
import { crtFirstFrame, crtFormat, crtLoadWrn } from './js/conf_page.js';

import { get_files, get_json } from './js/request.js';

import { init_ffmpeg } from './js/convert.js'; 

import { isExist } from './js/utility.js';

import { clearCont } from './js/clear.js';
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
async function proc_blocks(doc, body, procFunc, prms)
{
    let status = await new Promise((resolve) => { resolve(procFunc(prms.url, prms.procFunc, prms.attr)); })
    console.log(status);
    if (status)
    {
        for (let id = 0; id < prms.rmv_elems.length; id++)
        {
            clearCont({'elem' : prms.rmv_elems[id]});
        }
        if (prms.init) crtFirstFrame(body);
    }
    else 
    {
        doc.getElementById('description_panel').innerHTML = "Видео по ссылке не найдено. Пример ссылки: https://rutube.ru/video/";
        doc.getElementById('clicked_load_btn' ).id        = 'load_btn';
        
    }
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
(function(body, doc, ffmpeg) {

    crtFirstFrame(body);

    addEventListener('click', function(event) {
        
        let link = doc.getElementById('search_panel');

        if (link.value && isExist('format_selector')) switch(event.target.className)
        {
            case 'quality_select':

                clearCont({'elem' : 'format_selector'});
                clearCont({'elem' : 'video_preview'  });
                
                crtLoadWrn(body);

                proc_blocks(doc, body, get_json, {

                    'rmv_elems' : [
                        'loader',
                        'load_btn',
                        'search_area',
                        'search_panel',
                        'rutubeto_logo',
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
/**--------------------------------------------------------------------*/
 