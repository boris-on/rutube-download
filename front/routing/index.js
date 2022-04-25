// /routing/index.js
// Для начала установим зависимости.


//import { LOGS_FILE } from './js/variables.js'

/* import { save_logs } from './logs/logs.js';

    Need to rewrite this shit at logs.js     */

const fs = require('fs');

function save_logs(log, file)
{
    fs.appendFile(file, `\n${log}`, (error) => {
        return error;
    });
    return true;
}



const url = require('url');

const { exec } = require("child_process");


const convert = function(name) {
  exec(`ffmpeg -i buffer/ts/${name}.ts buffer/mp4/${name}.mp4`, (error, stdout, stderr) => {
    if (error) 
    {
        console.log(save_logs(error.message, './front/routing/logs/logs.txt'));
        return;
    }
    if (stderr) 
    {
        save_logs(stderr, './front/routing/logs/logs.txt');
        return;
    }
    if (stdout)
    { 
        console.log(`stdout: ${stdout}`)
        return;
    }
  });
  exec(`rm buffer/ts/${name}.ts`, (msg) => {
    return save_logs(msg, './front/routing/logs/logs.txt');
  });
};

const req_proc = function(data)
{
  if (data.name) convert(data.name);
}


const define = function(req, res, postData) {
    //console.log(req, res, postData);
    // Теперь получаем наш адрес. Если мы переходим на localhost:3000/test, то path будет '/test'
    const urlParsed = url.parse(req.url, true);
    let path = urlParsed.pathname;

    // Теперь записываем полный путь к server.js. Мне это особенно нужно, так как сервер будет
    // висеть в systemd, и путь, о котором он будет думать, будет /etc/systemd/system/...
    prePath = __dirname;

    // До этого мы уже получили path и prePath. Теперь осталось понять, какие запросы
    // мы получаем. Отсеиваем все запросы по точке, так чтобы туда попали только запросы к
    // файлам, например: style.css, test.js, song.mp3
    if(/\./.test(path)) 
    {
      if(path == '/favicon.png') 
        {
            // Если нужна фавиконка - возвращаем её, путь для неё всегда будет 'favicon.ico'
            // Получается, если добавить в начале prePath, будет: '/var/www/html/nodejs/routing/favicon.ico'.
            // Не забываем про return, чтобы сервер даже не пытался искать файлы дальше.
            let readStream = fs.createReadStream(prePath + 'img/' + path);
            readStream.pipe(res);
            return;
        }
        else
        {
            // А вот если у нас не иконка, то нам нужно понять, что это за файл, и сделать нужную
            // запись в res.head, чтобы браузер понял, что он получил именно то, что и ожидал.
            // На данный момент мне нужны css, js и mp3 от сервера, так что я заполнил только
            // эти случаи, но, на самом деле, стоит написать отдельный модуль для этого.
            if(/\.mp3$/gi.test(path)) 
            {
                res.writeHead(200, {
                    'Content-Type': 'audio/mpeg'
                });
            }
            else if(/\.css$/gi.test(path)) 
            {
                res.writeHead(200, {
                    'Content-Type': 'text/css'
                });
            }
            else if(/\.js$/gi.test(path)) 
            {
                res.writeHead(200, {
                    'Content-Type': 'application/javascript'
                });
            }
            // Опять же-таки, отдаём потом серверу и пишем return, чтобы он не шёл дальше.
            let readStream = fs.createReadStream(prePath+path);
            readStream.pipe(res);
            return;
        }
    }
    try {
      // Здесь мы пытаемся подключить модуль по ссылке. Если мы переходим на
      // localhost:8000/api, то скрипт идёт по пути /routing/dynamic/api, и, если находит там
      // index.js, берет его. Я знаю, что использовать тут try/catch не слишком правильно, и потом
      // переделаю через fs.readFile, но пока у вас не загруженный проект, разницу в скорости
      // вы не заметите.
      let dynPath = './dynamic/' + path;
      let routeDestination = require(dynPath);
      routeDestination.promise(res,postData,req).then(
        result => {
          res.writeHead(200);
          res.end(result);
          return;
        },
        error => {
          let endMessage = {};
          endMessage.error = 1;
          endMessage.errorName = error;
          res.end(JSON.stringify(endMessage));
          return;
        }
      );
      res.end('We have API!');
    }
    // /routing/index.js: блок catch
    catch (err) {
        // Находим наш путь к статическому файлу и пытаемся его прочитать.
        // Если вы не знаете, что это за '=>', тогда прочитайте про стрелочные функции в es6,
        // очень крутая штука.
        let filePath = prePath+'/static'+path+'/index.html';
        fs.readFile(filePath, 'utf-8', (err, html) => {
            // Если не находим файл, пытаемся загрузить нашу страницу 404 и отдать её.
            // Если находим — отдаём, народ ликует и устраивает пир во имя царя-батюшки.
            if(err) {
                let nopath = '/var/www/html/nodejs/routing/nopage/index.html';
                fs.readFile(nopath, (err , html) => {
                    if(!err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                    // На всякий случай напишем что-то в этом духе, мало ли, иногда можно случайно
                    // удалить что-нибудь и не заметить, но пользователи обязательно заметят.
                    else{
                        let text = "Something went wrong.";
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end(text);
                    }
                });
            }
            else{
                // Нашли файл, отдали, страница загружается.
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            }
        });
    }
};


exports.define = define;
exports.convert = convert;
exports.req_proc = req_proc;