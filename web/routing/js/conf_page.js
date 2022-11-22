/**====================================================================*\
 * conf_page.js                                        (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy
\**====================================================================*/

/**--------------------------------------------------------------------*/
import { crtElem, typeWriter } from "./utility.js";
/**--------------------------------------------------------------------*/

const SRCH_PNL = {
    'class'       : 'search_panel',
    'id'          : 'search_panel',
    'name'        : 'link',
    'placeholder' : 'Вставьте ссылку на видео'
};

const LOGO       = {'class' : 'rutubeto_logo'    , 'id' : 'rutubeto_logo'},
      SRCH_AREA  = {'class' : 'search_area'      , 'id' : 'search_area'},
      LOAD_BTN   = {'class' : 'load_btn'         , 'id' : 'load_btn'},
      DSCR_PNL   = {'class' : 'description_panel', 'id' : 'description_panel'},
      FRM_SELECT = {'class' : 'format_selector'  , 'id' : 'format_selector'};

/**--------------------------------------------------------------------*/
export function crtFirstFrame(body) {
    body.appendChild(crtElem('div', LOGO)); 
    typeWriter('rutubeto_logo', 'Rutubeto.', 69);

    let srch_pnl = crtElem('input', SRCH_PNL),
        load_btn = crtElem('div', LOAD_BTN);

    body.appendChild(crtElem('div', SRCH_AREA, {'chldrn' : [srch_pnl, load_btn]}));
    typeWriter('load_btn', 'СКАЧАТЬ', 69);

    body.appendChild(crtElem('div', DSCR_PNL));

    return true;
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
export function crtFormat(body, videos, chldrn=[]) {
    for (let id = 0; id < videos.length; id++) {
        chldrn.push(crtElem('div',
            {'class'  : 'quality_select', 'id' : videos[id].URI},
            {'wrds'   : [videos[id].Resolution]}
        ));
    }
    body.appendChild(crtElem('div', FRM_SELECT,
        {'chldrn' : chldrn, 'wrds' : ['ДОСТУПНОЕ КАЧЕСТВО']}    
    ));
    return true;
}
/**--------------------------------------------------------------------*/

const LOADER = {'class' : 'loader', 'id' : 'loader'};

/**--------------------------------------------------------------------*/
export function crtLoadWrn(body) {
    body.appendChild(crtElem('div', LOADER));
}
/**--------------------------------------------------------------------*/
