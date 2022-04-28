/**=================================================================*\
***                         FRONT PROCESSING                        **
\**=================================================================*/

/**=================================================================*/
          
import { crtFirstFrame, crtFormat,
         crtLoadWrn } from './js/conf_page.js';

import { init_ffmpeg, ffmpeg_cnvrt, 
         ffmpeg_cnct } from './js/convert.js'; 

import { isExist } from './js/utility.js';

import { clearCont } from './js/clear.js';

/**=================================================================*/


async function get_files(ffmpeg, jsn, files = [], id = 0)
{   
    for (; id < jsn.segmentsNumber; id++)
    {
        await new Promise((resolve, _) => {

            fetch(`http://localhost:3001/getsegment?uuid=${jsn.uuid}&segment=${id + 1}`)
                .then(res => res.arrayBuffer()).then(buffer => {
            
                    resolve(ffmpeg_cnvrt(ffmpeg, buffer, id + 1).then((res) => {
                        if (res) files.push(res);
                    }));

            }).catch(err => console.error(err));
            
        });
    }

    ffmpeg_cnct(ffmpeg, files);
}


(function(body, doc) {
    
    const ffmpeg = init_ffmpeg(true);

    crtFirstFrame(body);

    let link = doc.getElementById('search_panel');

    addEventListener('click', function(event) {

        if (link.value && isExist('format_selector')) switch(event.target.className.slice(0, -1))
        {
            case 'quality_select_':

                clearCont(body, {'elem' : 'format_selector'});
                clearCont(body, {'elem' : 'video_preview'  });

                crtLoadWrn(body);

                fetch(`http://localhost:3001/getmp4?url=${event.target.id}`)
                    .then(res => res.json())
                        .then(out => {

                            get_files(ffmpeg, out);

                        }).catch(err => {throw err}
                );

                break;

            default:
                break;
        }
        if (link.value) switch(event.target.id)
        {
            case 'load_btn':

                fetch(`http://localhost:3001/download?url=${link.value}`)
                    .then(res => res.json())
                        .then(out => {

                            clearCont(body, {'elem' : 'description_panel'});
                            clearCont(body, {'elem' : 'load_btn'         });

                            crtFormat(body, out);

                        }).catch(err => {throw err}
                );    

                break;
            
            default:
                break;
        }

    })

})(document.querySelector('body'), document);
