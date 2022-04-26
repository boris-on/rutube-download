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
        const message = document.getElementById('message');
        const { name } = files[0];
        message.innerHTML = 'Loading ffmpeg-core.js';
        await ffmpeg.load();
        message.innerHTML = 'Start trimming';
        ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
        await ffmpeg.run('-i', name, '-ss', '0', '-to', '1', 'output.mp4');
        message.innerHTML = 'Complete trimming';
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const video = document.getElementById('output-video');
        video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }
    const elm = document.getElementById('uploader');
    elm.addEventListener('change', trim);
}
