/**
 * Converting .ts into .mp4
 */

//import { save_logs } from  './logs/logs.js';

//import { LOGS_FILE } from './variables.js';

export function cnvrt_file(file_name)
{
    console.log(fetch('http://localhost:8000/',
        {   
            method : "post",
            headers: 
            {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name : file_name })
        }
    ));
}
