import {isExist,
        crtElem} from './utility.js';


/**  Set of start page ids  */ const START_BLOCK = [
    "user_main_field_card" ,
    "main_page_info_logo"   ,
    "news"                   ,      
    "user_main_field_card"
];

/** Set of profile page ids */ const PRFL_BLOCK = [
    "user_data"    , 
    "inventory"     ,
    "profile_deck"   , 
    "user_hat_logo"
];

/**  Set of deck page ids  */ const DECK_BLOCK = [
    "deck_cont"    , 
    "atk_deck_btn"  ,
    "def_deck_btn"   ,
    "sep_atk_def"
];


export const arena_rmv = {
    "start"    : true,
    "profile"  : true,
    "quest"    : true,
    "shop"     : true,
    "deck"     : true,
    "mining"   : true
};

export const deck_rmv = {
    "start"    : true,
    "profile"  : true,
    "shop"     : true,
    "quest"    : true,
    "mining"   : true
};

export const prfl_rmv = {
    "start"    : true,
    "deck"     : true,
    "shop"     : true,
    "quest"    : true,
    "mining"   : true
};

export const quest_rmv = {
    "start"    : true,
    "profile"  : true,
    "quest"    : true,
    "shop"     : true,
    "deck"     : true,
    "mining"   : true
};

export const shop_rmv = {
    "start"    : true,
    "profile"  : true,
    "quest"    : true,
    "deck"     : true,
    "mining"   : true
}

export const mining_rmv = {
    "start"    : true,
    "profile"  : true,
    "quest"    : true,
    "shop"     : true,
    "deck"     : true
}

export const all_rmv = {
    "all"      : true
}


function removeStatus(elem)
{
    try   { elem.remove(); } 
    catch { return false ; }
    return true;
}

function removeIfExist(id, doc)
{
    return removeStatus(isExist(id), doc);
}

function removeListElems(elms, num, doc, ind = 0)
{
    for (; ind < num; ind++) if (!removeIfExist(elms[ind], doc)) return false;
}

function removeHTMLListElems(children, num, ind = 0)
{
    for (; ind < num; ind++) children[0].remove();
}


export function clearCont(body, kwargs)
{
    if (kwargs.elem  ) removeIfExist  (kwargs.elem, document);
    
    if (kwargs.all   ) removeHTMLListElems(body.children, body.children.length);

    if (kwargs.start ) removeListElems(START_BLOCK, 4, document);

    if (kwargs.deck  ) removeListElems(DECK_BLOCK , 4, document);

    if (kwargs.shop  ) removeIfExist  ("shop_panel"    , document);

    if (kwargs.quest ) removeIfExist  ("quest_panel_0" , document);

    if (kwargs.mining) removeIfExist  ("mining_panel_0", document);

    if (kwargs.profile && isExist("user_data")) 
    {
        removeListElems(PRFL_BLOCK, 4, document);
         
        document.getElementById("hat").appendChild(
              crtElem("div"       ,  
                {"class" : "user_hat_logo"   ,
                 "id"    : "user_hat_logo"}   , 
                {"imgs"  : kwargs.img     }
        ));
    }

    return true;
}
