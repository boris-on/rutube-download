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

export function crtFormat(body)
{
    let chldrn = [
        crtElem('div',
            {'class' : 'quality_select_1',
             'id'    : 'quality_select_1'},
            {'wrds'  : ['240px ~MB']}
        ), 
        crtElem('div',
            {'class' : 'quality_select_2',
             'id'    : 'quality_select_2'},
             {'wrds'  : ['480px ~MB']}
        ), 
        crtElem('div',
            {'class' : 'quality_select_3',
             'id'    : 'quality_select_3'},
             {'wrds'  : ['720px ~MB']}
        ), 
        crtElem('div',
            {'class' : 'quality_select_4',
             'id'    : 'quality_select_4'},
             {'wrds'  : ['1024px ~MB']}
        )
    ];

    body.appendChild(crtElem('div',
        {'class'  : 'format_selector',
         'id'     : 'format_selector'},
        {'chldrn' : chldrn,
         'wrds'  : ['Выберете нужный размер']}    
    ));
    
    body.appendChild(crtElem('div', 
        {'class' : 'video_preview',
         'id'    : 'video_preview'},
        {'wrds'  : ['Video pre-view']}
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
