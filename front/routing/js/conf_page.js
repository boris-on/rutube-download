/**
 * Configurate html objects
 */

import { crtElem } from "./utility.js";

export function crtFirstFrame(body)
{
    body.appendChild(crtElem('div',
        {'class' : 'bottom_line', 
         'id'    : 'bottom_line'}
    ));

    body.appendChild(crtElem('div',
        {'class' : 'count_loads_panel', 
         'id'    : 'count_loads_panel'},
        {'wrds'  : ['Downloads : 10000']}
    ));

    body.appendChild(crtElem('div',
        {'class' : 'rutubeto_logo', 
         'id'    : 'rutubeto_logo'},
        {'wrds'  : ['RUTUBETO.ru']}
    ));

    body.appendChild(crtElem('input', 
        {'class'       : 'search_panel',
         'id'          : 'search_panel',
         'name'        : 'link',
         'placeholder' : 'Вставьте ссылку'}
    ));

    body.appendChild(crtElem('div',
            {'class' : 'load_btn', 
             'id'    : 'load_btn'},
            {'wrds'  : ['Скачать']}    
    ));
    
    body.appendChild(crtElem('div',
        {'class'  : 'description_panel', 
         'id'     : 'description_panel'},
        {'wrds'   : ['Вставьте ссылку и нажмите скачать, после можно будет выбрать качество скачиваемого изображения']}
    ));

    return true;
}

export function crtFormat(body, videos, chldrn = [])
{
    for (let id = 0; id < videos.length; id++ )
    {
        chldrn.push(crtElem('div',
            {'class' : `quality_select_${id}`,
             'id'    :  videos[id].URI},
            {'wrds'  : [videos[id].Resolution]}
        ));
    }

    body.appendChild(crtElem('div',
        {'class'  : 'format_selector',
         'id'     : 'format_selector'},
        {'chldrn' : chldrn,
         'wrds'  : ['Выберете нужный размер']}    
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
}
