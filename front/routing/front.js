/**=================================================================*\
***                         FRONT PROCESSING                        **
\**=================================================================*/

/**=================================================================*/
          
import { crtFirstFrame, crtFormat,
         crtLoadWrn              } from './js/conf_page.js';
    
import { clearCont               } from './js/clear.js';

import { cnvrt_file, cnct_file   } from './js/convert.js'; 

import { isExist                 } from './js/utility.js';

/**=================================================================*/

function getJson(url, data = null)
{
    fetch(url)
        .then(res => res.json())
            .then(out => data = out)
                .catch(err => {throw err}
    );

    return data;
}

async function get_files(ffmpeg, jsn, files = [])
{
    //https://rutube.ru/video/b92259d1394b7fe744a7d01234631a23/
    
    for (let id = 0; id < jsn.segmentsNumber; id++)
    {
        await new Promise((resolve, reject) => {
                fetch(`http://localhost:3001/getsegment?uuid=${jsn.uuid}&segment=${id + 1}`)
                        .then(res => res.arrayBuffer())
                            .then(buffer => {
                                
                                resolve(cnvrt_file(ffmpeg, buffer, id + 1).then((res) => {
                                    if (res) files.push(res);
                                }));

                }).catch(err => console.error(err));
        });
    }
    console.log('___________!!!__________', files);
    cnct_file(ffmpeg, files);
}

(function(body, doc, data = null) {

    const { createFFmpeg} = FFmpeg;
    
    const ffmpeg = createFFmpeg( { log: true } );

    crtFirstFrame(body);

    let link = doc.getElementById('search_panel');

    addEventListener('click', function(event) {

        if (link.value && isExist('format_selector')) switch(event.target.className)
        {
            case 'quality_select_1':
                console.log('entered');
                fetch(`http://localhost:3001/getmp4?url=${event.target.id}`)
                    .then(res => res.json())
                        .then(out => {

                            clearCont(body, {'elem' : 'format_selector'});
                            clearCont(body, {'elem' : 'video_preview'});
                            crtLoadWrn(body);

                            get_files(ffmpeg, out);

                        }).catch(err => {throw err}
                );
                //cnct_file(['1.ts', '2.ts']);

            default:
                break;
        }
        if (link.value) switch(event.target.id)
        {
            case 'load_btn':

                fetch(`http://localhost:3001/download?url=${link.value}`)
                    .then(res => res.json())
                        .then(out => {

                            console.log(out)

                            clearCont(body, {'elem' : 'description_panel'});
                            clearCont(body, {'elem' : 'load_btn'});
                            crtFormat(body, out);

                        }).catch(err => {throw err}
                );    

                break;
            
            default:
                break;
        }

    })

})(document.querySelector('body'), document);
