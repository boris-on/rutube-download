/**
 * Converting .ts into .mp4
 */

//import { save_logs } from  './logs/logs.js';

//import { LOGS_FILE } from './variables.js';

export function cnvrt_file(file_name)
{
    const { createFFmpeg, fetchFile } = FFmpeg;
    
    const ffmpeg = createFFmpeg( { log: true } );
    
    const trim = async ({ target: { files } }) => {

        const { name } = files[0]; /* name == file_name when response will be add */

        await ffmpeg.load();
        
        ffmpeg.FS('writeFile', name, await fetchFile(files[0]));

        await ffmpeg.run('-i', name, 'output.mp4');

        const data = ffmpeg.FS('readFile', 'output.mp4');

        // Create a new link
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        anchor.download = 'output.mp4';

        // Append to the DOM
        document.body.appendChild(anchor);

        // Trigger `click` event
        anchor.click();

        // Remove element from DOM
        document.body.removeChild(anchor);
    }
    const elm = document.getElementById('uploader');
    elm.addEventListener('change', trim);
}
