/**
 * Converting .ts into .mp4
 */

//import { save_logs } from  './logs/logs.js';

const BUFFER_NULL_SIZE = 500;

export async function cnvrt_file(ffmpeg, buffer, num = 1)
{
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    let explicit_buffer = new Uint8Array(buffer);

    if (explicit_buffer.byteLength > BUFFER_NULL_SIZE)
    {
        ffmpeg.FS('writeFile', `${num}.ts`, new Uint8Array(buffer));

        await ffmpeg.run('-i', `${num}.ts`, '-codec', 'copy', `${num}.mp4`);

        return `file ${num}.mp4`;
    }

    return null;
}

export async function cnct_file(ffmpeg, files = [], num = 1)
{
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    ffmpeg.FS('writeFile', 'concat_list.txt', files.join('\n'));
    await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'concat_list.txt', '-codec', 'copy', 'out.mp4');

    const data = ffmpeg.FS('readFile', 'out.mp4');

    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    anchor.download = 'out.mp4';

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
}
