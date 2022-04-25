/**=================================================================*\
***                         FRONT PROCESSING                        **
\**=================================================================*/

/**=================================================================*/
          
import { clearCont } from './js/clear.js';

import { crtFirstFrame, crtFormat,
         crtLoadWrn              } from './js/conf_page.js';

import { cnvrt_file } from './js/convert.js'; 

/**=================================================================*/


/**  @param {int} _quality */
function rqstServer(_quality)
{
    fetch(/* back url ---->*/'', 
    {
        method : "post",
        headers: 
        {
            'Accept'      : 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ quality : _quality})
    });
}


(function(body, doc) {

    crtFirstFrame(body);

    let link = doc.getElementById('search_panel');

    addEventListener('click', function(event) {

        if (link.value) switch(event.target.id)
        {
            case 'load_btn':

                
                fetch(/* back url ---->*/'', 
                    {
                        method : "post",
                        headers: 
                        {
                            'Accept'      : 'application/json',
                            'Content-Type': 'application/json'
                        },
                        
                        body: JSON.stringify({ link : link.value }) /* <---- video link here */
                });

                if (/* respose */true)
                {
                    clearCont(body, {'elem' : 'description_panel'});
                    clearCont(body, {'elem' : 'load_btn'});
                    crtFormat(body);
                }
                break;
            
            case 'quality_select_1':

                /* request to back server; 240px*/ //rqstServer(240);

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'});
                crtLoadWrn(body);

                /* get JSON here ----> */
                cnvrt_file('1'); /* '1' ----> file name */
                break;

            case 'quality_select_2':

                /* request to back server; 480px*/ //rqstServer(480);

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'});
                crtLoadWrn(body);

                /* get JSON here ----> */
                cnvrt_file('1'); /* '1' ----> file name */
                break;

            case 'quality_select_3':

                /* request to back server; 720px*/ //rqstServer(720);

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'});
                crtLoadWrn(body);

                /* get JSON here ----> */
                cnvrt_file('1'); /* '1' ----> file name */
                break;

            case 'quality_select_4':

                /* request to back server; 1024px*/ //rqstServer(1024);

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'});
                crtLoadWrn(body);

                /* get JSON here ----> */
                cnvrt_file('1'); /* '1' ----> file name */
                break;
            
            default:
                break;
        }

    })

})(document.querySelector('body'), document);
