/**=================================================================*\
***                       VIDEO CONVERTING                          **
***-----------------------------------------------------------------**
*** @note .ts into .mp4                                             **
\**=================================================================*/

const BUFFER_NULL_SIZE = 500,
      DEFAULT_NUMBER   = 1;

/**=================================================================*/


export function init_ffmpeg(_log = false)
{
    const { createFFmpeg } = FFmpeg;
    
    const ffmpeg = createFFmpeg( { log: _log } );

    return ffmpeg;
}

export async function ffmpeg_cnvrt(ffmpeg, buffer, num = DEFAULT_NUMBER)
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

export async function ffmpeg_cnct(ffmpeg, files = [])
{
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    ffmpeg.FS('writeFile', 'concat_list.txt', files.join('\n'));
    
    await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'concat_list.txt', '-codec', 'copy', 'out.mp4');

    const data = ffmpeg.FS('readFile', 'out.mp4');

    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    anchor.download = 'out.mp4';

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}
