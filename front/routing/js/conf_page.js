/**====================================================================*\
 * conf_page.js                                        (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
\**====================================================================*/

import { crtElem, typeWriter } from "./utility.js";


export function crtFirstFrame(body)
{
    body.appendChild(crtElem('div', {
        'class' : 'rutubeto_logo', 
        'id'    : 'rutubeto_logo'
    }));
    typeWriter('rutubeto_logo', 'Rutubeto.', 69);


    let search_panel = crtElem('input', {
        'class'       : 'search_panel',
        'id'          : 'search_panel',
        'name'        : 'link',
        'placeholder' : 'Вставьте ссылку на видео'
    });

    let load_btn = crtElem('div', {
        'class' : 'load_btn', 
        'id'    : 'load_btn'
    });

    body.appendChild(crtElem('div', {
            'class'  : 'search_area',
            'id'     : 'search_area'
        }, {'chldrn' : [search_panel, load_btn]}
    ));
    typeWriter('load_btn', 'СКАЧАТЬ', 69);


    body.appendChild(crtElem('div', {
        'class'  : 'description_panel', 
        'id'     : 'description_panel'
    }));

    return true;
}


export function crtFormat(body, videos, chldrn=[])
{
    for (let id = 0; id < videos.length; id++)
    {
        chldrn.push(crtElem('div',
            {'class'  : 'quality_select',
             'id'     :  videos[id].URI},
            {'wrds'   : [videos[id].Resolution]}
        ));
    }

    body.appendChild(crtElem('div',
        {'class'  : 'format_selector',
         'id'     : 'format_selector'},
        {'chldrn' : chldrn,
         'wrds'  : ['ДОСТУПНОЕ КАЧЕСТВО']}    
    ));

    return true;
}

export function crtLoadWrn(body)
{
    body.appendChild(crtElem('div',
            {'class' : 'loader', 
             'id'    : 'loader'}
    ));
}
