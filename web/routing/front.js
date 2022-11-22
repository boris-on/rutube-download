/**====================================================================*\
 * front.js                                            (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy
\**====================================================================*/
        
/**--------------------------------------------------------------------*/
import { crtFirstFrame, crtFormat, crtLoadWrn } from './js/conf_page.js';

import { get_json, get_mp4, download_video } from './js/request.js'; 

import { isExist } from './js/utility.js';

import { clearCont } from './js/clear.js';
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
async function proc_blocks(doc, body, procFunc, prms)
{
    let status = await new Promise((resolve) => {
        console.log(prms.url, prms.attr);
        resolve(procFunc(prms.url, prms.procFunc, prms.attr)); 
    })

    console.log(status);

    if (status) {
        for (let id = 0; id < prms.rmv_elems.length; id++) {
            clearCont({'elem' : prms.rmv_elems[id]});
        }
        if (prms.init) crtFirstFrame(body);
    } else {
        doc.getElementById('description_panel').innerHTML = "Видео по ссылке не найдено. Пример ссылки: https://rutube.ru/video/";
        doc.getElementById('clicked_load_btn' ).id        = 'load_btn';
    }
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
const PRELOAD_FRAME_CLEAR = [
    'loader',
    'load_btn',
    'search_area',
    'search_panel',
    'rutubeto_logo',
    'description_panel'
];

const PROT = "http://",
      HOST = "rutubeto.ru",
      PORT = "";   // empty "" for default port

const LINK = `${PROT}${HOST}${PORT}`

const VQL = `${LINK}/video-quality-list?url=`, // VQL - video quality link
      DL  = `${LINK}/download?url=`;           // DL  - download link
/**--------------------------------------------------------------------*/

/**--------------------------------------------------------------------*/
(function(body, doc) {

    crtFirstFrame(body);

    addEventListener('click', function(event) {
        
        let link = doc.getElementById('search_panel');

        if (link.value && isExist('format_selector')) switch(event.target.className)
        {
            case 'quality_select':
                clearCont({'elem' : 'format_selector'});
                clearCont({'elem' : 'video_preview'  });
                
                crtLoadWrn(body);

                proc_blocks(doc, body, get_mp4, {
                    'rmv_elems' : PRELOAD_FRAME_CLEAR,
                    'url'       : `${DL}${event.target.id}`,
                    'procFunc'  : download_video
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
                    'rmv_elems' : ['description_panel'],
                    'url'       :  `${VQL}${link.value}`,
                    'procFunc'  :   crtFormat,
                    'attr'      :   body
                });
                break;
            
            default:
                break;
        }

    })

})(document.querySelector('body'), document);
/**--------------------------------------------------------------------*/
 