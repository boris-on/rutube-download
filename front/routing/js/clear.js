/**
 * 
 */

import {isExist} from './utility.js';


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


export function clearCont(body, kwargs)
{
    if (kwargs.elem) removeIfExist(kwargs.elem, document);

    return true;
}
