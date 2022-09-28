/**====================================================================*\
 * request.js                                          (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
\**====================================================================*/

/**--------------------------------------------------------------------*/
import { ffmpeg_cnvrt, ffmpeg_cnct } from './convert.js'; 
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
export async function get_json(url, procFunc, attr)
{
    let status = await new Promise((resolve, _) => {

        fetch(url).then(res => res.json()).then(out => {

            if (!out.error) 
            { 
                resolve(procFunc(attr, out)); 
            }
            else
            {
                resolve(!out.error);
            }

        }).catch(err => {throw err});
    });

    return status;
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
export async function get_files(ffmpeg, jsn, files = [], id = 0)
{   
    for (; id < jsn.segmentsNumber; id++)
    {
        await new Promise((resolve, _) => {

            fetch(`https://rutubeto.ru/getsegment?uuid=${jsn.uuid}&segment=${id + 1}`)
                .then(res => res.arrayBuffer()).then(buffer => {
            
                    resolve(ffmpeg_cnvrt(ffmpeg, buffer, id + 1).then((res) => {
                        if (res) files.push(res);
                    }));

            }).catch(err => console.error(err));
            
        });
    }

    return await new Promise((resolve) => { resolve(ffmpeg_cnct(ffmpeg, files)); });
}
/**--------------------------------------------------------------------*/
