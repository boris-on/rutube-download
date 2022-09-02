/**
 * Configurate html objects
 */

import { crtElem } from "./utility.js";

export function crtFirstFrame(body)
{
    /*body.appendChild(crtElem('div',
        {'class' : 'bottom_line', 
         'id'    : 'bottom_line'}
    ));*/

    /*body.appendChild(crtElem('div',
        {'class' : 'count_loads_panel', 
         'id'    : 'count_loads_panel'},
        {'wrds'  : ['Downloads : 10000']}
    ));*/

    body.appendChild(crtElem('div',
        {'class' : 'rutubeto_logo', 
         'id'    : 'rutubeto_logo'},
        {'imgs'  : ['url(\"img/rutube.png\"']}
    ));

    body.appendChild(crtElem('input', 
        {'class'       : 'search_panel',
         'id'          : 'search_panel',
         'name'        : 'link',
         'placeholder' : 'Вставьте ссылку на видео'}
    ));

    body.appendChild(crtElem('div',
            {'class' : 'load_btn', 
             'id'    : 'load_btn'},
            {'wrds'  : ['СКАЧАТЬ']}    
    ));

    body.appendChild(crtElem('div',
        {'class'  : 'description_panel', 
         'id'     : 'description_panel'},
        {'wrds'   : ['']}
    ));

    return true;
}

export function crtFormat(body, videos, chldrn = [])
{
    for (let id = 0; id < videos.length; id++ )
    {
        chldrn.push(crtElem('div',
            {'class'  : 'quality_select',
             'id'     :  videos[id].URI,
             'style'  : `top    : ${15.62 + id * 16}%; ` +
                        `bottom : ${71.18 - id * 16}%;`},
            {'wrds'   : [videos[id].Resolution]}
        ));
        /*
    left: 26.41%;
    right: 26.41%;
    top: 36.81%;
    bottom: 50%;
    left: 26.52%;
    right: 26.3%;
    top: 57.99%;
    bottom: 28.82%;
    left: 26.62%;
    right: 26.19%;
    top: 79.17%;
    bottom: 7.64%;
        */
    }

    body.appendChild(crtElem('div',
        {'class'  : 'format_selector',
         'id'     : 'format_selector'},
        {'chldrn' : chldrn,
         'wrds'  : ['Доступные размеры:']}    
    ));
    
    body.appendChild(crtElem('div', 
        {'class'  : 'video_preview',
         'id'     : 'video_preview'},
        {'wrds'   : ['Video pre-view'],
         'chldrn' : [crtElem('video',
                  {'class' : 'output-video',
                   'id'    : 'output-video'})
        ]}
    ));

    return true;
}

export function crtLoadWrn(body)
{
    body.appendChild(crtElem('div',
        {'class'  : 'description_panel', 
         'id'     : 'description_panel'},
        {'wrds'   : ['Скачивание...']}
    ));

    body.appendChild(crtElem('div',
            {'class' : 'loader', 
             'id'    : 'loader'}
    ));
}
