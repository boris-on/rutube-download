/**====================================================================*\
 * request.js                                          (c) Mtvy, 2022
 * Copyright (c) 2022. Mtvy (Matvei Prudnikov, m.d.prudnik@gmail.com)
\**====================================================================*/


/**--------------------------------------------------------------------*/
export async function download_video(attr, out) {

    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([out], { type: 'video/mp4' }));
    anchor.download = 'rutubeto_downloads.mp4';

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
    
    return await new Promise((resolve) => { resolve(true); });
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
export async function get_json(url, procFunc, attr)
{
    let status = await new Promise((resolve, _) => {

        fetch(url).then(res => res.json()).then(out => {

            if (!out.error) { 
                resolve(procFunc(attr, out)); 
            } else {
                resolve(!out.error);
            }

        }).catch(err => {throw err});
    });

    return status;
}
/**--------------------------------------------------------------------*/


/**--------------------------------------------------------------------*/
export async function get_mp4(url, procFunc, attr=[])
{
    let status = await new Promise((resolve, _) => {

        fetch(url).then(res => res.arrayBuffer()).then(out => {

            if (!out.error) { 
                resolve(procFunc(attr, out)); 
            }
            else {
                resolve(!out.error);
            }

        }).catch(err => {throw err});
    });

    return status;
}
/**--------------------------------------------------------------------*/
