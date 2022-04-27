/**=================================================================*\
***                         FRONT PROCESSING                        **
\**=================================================================*/

/**=================================================================*/
          
import { crtFirstFrame, crtFormat,
         crtLoadWrn              } from './js/conf_page.js';
    
import { clearCont               } from './js/clear.js';

import { cnvrt_file              } from './js/convert.js'; 

/**=================================================================*/


(function(body, doc) {

    cnvrt_file();

    crtFirstFrame(body);

    let link = doc.getElementById('search_panel');

    addEventListener('click', function(event) {

        if (link.value) switch(event.target.id)
        {
            case 'load_btn':

                fetch(`http://localhost:8000/`).then((response) => {

                    console.log(response);

                    clearCont(body, {'elem' : 'description_panel'});
                    clearCont(body, {'elem' : 'load_btn'});
                    crtFormat(body);
                
                });

                break;
            
            case 'quality_select_1':

                /* request to back server; 240px*/ //rqstServer(240);

                fetch(`http://localhost:8000/`).then((response) => {

                    console.log(response);

                    clearCont(body, {'elem' : 'format_selector'});
                    clearCont(body, {'elem' : 'video_preview'});
                    crtLoadWrn(body);
                
                });

                /* get JSON here ----> */

                /* 30 requests here */ cnvrt_file(/* name -> iter num */ '1');
                
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
